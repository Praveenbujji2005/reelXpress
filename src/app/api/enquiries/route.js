import { NextResponse } from 'next/server';
import {
  createEnquiry,
  getEnquiriesFromFirestore,
  updateEnquiryStatusInFirestore,
  deleteEnquiryFromFirestore,
  validateEnquiryData,
  normalizeEnquiry,
} from '@/lib/enquiries';
import {
  readServerEnquiries,
  writeServerEnquiries,
  saveServerEnquiry,
  updateServerEnquiryStatus,
  deleteServerEnquiry,
} from '@/lib/serverEnquiriesStore';

// In-memory rate limiter: max 6 submissions per IP per 5 minutes
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000;
  const maxRequests = 6;

  const records = rateLimitMap.get(ip) || [];
  const validRecords = records.filter((timestamp) => now - timestamp < windowMs);

  if (validRecords.length >= maxRequests) {
    return true;
  }

  validRecords.push(now);
  rateLimitMap.set(ip, validRecords);
  return false;
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous_ip';

    // Anti-Spam: Rate Limit Check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many enquiries submitted. Please wait 5 minutes before submitting again.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Anti-Spam: Honeypot trap
    if (body.website_trap || body.bot_honey) {
      return NextResponse.json({
        success: true,
        message: 'Enquiry received successfully.',
      });
    }

    // Backend validation
    const validation = validateEnquiryData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.errors.join(' '),
        },
        { status: 400 }
      );
    }

    const customerName = body.customerName || body.fullName || body.name || '';
    const email = body.email || '';
    const phone = body.phone || '';
    const companyName = body.companyName || body.company || '';
    const selectedService = body.selectedService || body.serviceType || body.type || 'General Shoot';
    const enquiryMessage = body.enquiryMessage || body.message || body.notes || '';
    const city = body.city || 'Bengaluru';
    const eventDate = body.eventDate || body.date || '';
    const sourcePage = body.sourcePage || body.source || 'Website Booking Form';
    const createdAt = new Date().toISOString();

    const enquiryPayload = {
      customerName,
      fullName: customerName,
      email,
      phone,
      companyName,
      selectedService,
      serviceType: selectedService,
      enquiryMessage,
      message: enquiryMessage,
      city,
      eventDate,
      status: 'New',
      sourcePage,
      createdAt,
    };

    let savedEnquiry = null;
    let cloudSynced = false;
    let syncErrorNotice = null;

    // 1. Attempt write to Cloud Firestore
    try {
      savedEnquiry = await createEnquiry(enquiryPayload);
      cloudSynced = true;
      console.log('[API /api/enquiries] Saved to Cloud Firestore:', savedEnquiry.id);
    } catch (firestoreErr) {
      console.warn('[API /api/enquiries] Cloud Firestore notice:', firestoreErr.message);
      syncErrorNotice = firestoreErr.message;
    }

    // 2. Resilient Server Persistence: Store on server so leads are never lost
    const serverRecord = saveServerEnquiry({
      ...(savedEnquiry || enquiryPayload),
      cloudSynced,
    });

    const responseEnquiry = savedEnquiry || serverRecord;

    return NextResponse.json(
      {
        success: true,
        message:
          'Your shoot slot has been locked! Our Bengaluru coordinator will connect via WhatsApp / Call within minutes.',
        enquiry: responseEnquiry,
        cloudSynced,
        warning: syncErrorNotice ? 'Enquiry stored securely on server. Cloud Firestore sync pending.' : undefined,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API /api/enquiries] General error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An error occurred while processing your enquiry. Please try again.',
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const sortBy = searchParams.get('sortBy') || 'newest';

    // 1. Fetch from Cloud Firestore
    let firestoreList = [];
    let firestoreError = null;
    try {
      firestoreList = await getEnquiriesFromFirestore({ search: '', status: 'all', sortBy: 'newest' });
    } catch (err) {
      firestoreError = err.message;
    }

    // 2. Fetch from local server storage
    const serverList = readServerEnquiries().map((item) => normalizeEnquiry(item.id, item));

    // 3. Merge: de-duplicate by ID or email+createdAt
    const map = new Map();
    // Prioritize firestore list
    for (const item of firestoreList) {
      map.set(item.id, { ...item, cloudSynced: true });
    }
    // Add server items not yet in map
    for (const item of serverList) {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    }

    let combined = Array.from(map.values());

    // Filter by search
    if (search.trim()) {
      const term = search.toLowerCase().trim();
      combined = combined.filter(
        (inq) =>
          (inq.customerName && inq.customerName.toLowerCase().includes(term)) ||
          (inq.fullName && inq.fullName.toLowerCase().includes(term)) ||
          (inq.email && inq.email.toLowerCase().includes(term)) ||
          (inq.phone && inq.phone.toLowerCase().includes(term)) ||
          (inq.companyName && inq.companyName.toLowerCase().includes(term)) ||
          (inq.selectedService && inq.selectedService.toLowerCase().includes(term)) ||
          (inq.city && inq.city.toLowerCase().includes(term)) ||
          (inq.enquiryMessage && inq.enquiryMessage.toLowerCase().includes(term))
      );
    }

    // Filter by status
    if (status !== 'all') {
      const target = status.toLowerCase();
      combined = combined.filter((inq) => (inq.status || '').toLowerCase() === target);
    }

    // Sort
    combined.sort((a, b) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      return sortBy === 'oldest' ? timeA - timeB : timeB - timeA;
    });

    return NextResponse.json({
      success: true,
      enquiries: combined,
      inquiries: combined,
      firestoreError,
    });
  } catch (error) {
    console.error('[API /api/enquiries] Fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve enquiries.' },
      { status: 500 }
    );
  }
}

export async function PUT() {
  try {
    const list = readServerEnquiries();
    const unsynced = list.filter((item) => !item.cloudSynced);
    let syncedCount = 0;
    const errors = [];

    for (const item of unsynced) {
      try {
        await createEnquiry(item);
        item.cloudSynced = true;
        syncedCount++;
      } catch (err) {
        errors.push({ id: item.id, error: err.message });
      }
    }

    writeServerEnquiries(list);

    return NextResponse.json({
      success: true,
      syncedCount,
      totalUnsynced: unsynced.length,
      errors,
    });
  } catch (err) {
    console.error('[API /api/enquiries] Sync error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status, adminEmail } = body;
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing enquiry ID or status.' },
        { status: 400 }
      );
    }

    // Update in local server store
    updateServerEnquiryStatus(id, status, adminEmail);

    // Try update in Firestore
    try {
      await updateEnquiryStatusInFirestore(id, status, adminEmail);
    } catch {}

    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    console.error('[API /api/enquiries] Update error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update enquiry status.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing enquiry ID.' },
        { status: 400 }
      );
    }

    // Delete in local server store
    deleteServerEnquiry(id);

    // Try delete in Firestore
    try {
      await deleteEnquiryFromFirestore(id);
    } catch {}

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('[API /api/enquiries] Delete error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete enquiry.' },
      { status: 500 }
    );
  }
}
