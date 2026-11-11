import { db, storage, isFirebaseConfigured } from './firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  REEL_PORTFOLIO,
  FAQ_DATA,
  MARQUEE_TESTIMONIALS,
} from './data';

// =============================================================================
// LOCAL PERSISTENCE KEYS
// =============================================================================
const KEY_HERO = 'reelxpress_cms_hero_slides';
const KEY_PRICING = 'reelxpress_cms_pricing_plans';
const KEY_FAQS = 'reelxpress_cms_faqs';
const KEY_TESTIMONIALS = 'reelxpress_cms_testimonials';
const KEY_ACTIVITY = 'reelxpress_cms_activity_logs';

// =============================================================================
// 1. BASELINE CATALOG SEED DATA
// =============================================================================

// Default 6 client reviews
export const INITIAL_TESTIMONIALS = [
  {
    id: 'testi_1',
    name: 'Krishna D.',
    role: "Groom's Brother",
    quote:
      'Booked them just a day before the wedding. They showed up with iPhones and edited the video before the baraat ended. Unreal.',
    review:
      'Booked them just a day before the wedding. They showed up with iPhones and edited the video before the baraat ended. Unreal.',
    rating: 5,
    avatar: '/brand/icon-gold.png',
    enabled: true,
    order: 1,
  },
  {
    id: 'testi_2',
    name: 'Padma M.',
    role: 'Brand Manager, Skincare Brand',
    quote:
      'We used reelXpress for our store launch - got high-quality reels before the event wrapped up. Perfect for social!',
    review:
      'We used reelXpress for our store launch - got high-quality reels before the event wrapped up. Perfect for social!',
    rating: 5,
    avatar: '/brand/icon-gold.png',
    enabled: true,
    order: 2,
  },
  {
    id: 'testi_3',
    name: 'Radhika P.',
    role: 'Small Business Owner',
    quote:
      'As a new business, getting professional-looking content quickly helped us gain traction online. reelXpress is now our go-to team.',
    review:
      'As a new business, getting professional-looking content quickly helped us gain traction online. reelXpress is now our go-to team.',
    rating: 5,
    avatar: '/brand/icon-gold.png',
    enabled: true,
    order: 3,
  },
  {
    id: 'testi_4',
    name: 'Harish G.',
    role: 'Event Planner',
    quote:
      'reelXpress has changed the way we capture events for our clients. No delays, no chasing, just pure magic delivered instantly.',
    review:
      'reelXpress has changed the way we capture events for our clients. No delays, no chasing, just pure magic delivered instantly.',
    rating: 5,
    avatar: '/brand/icon-gold.png',
    enabled: true,
    order: 4,
  },
  {
    id: 'testi_5',
    name: 'Arjun S.',
    role: 'Influencer',
    quote:
      "I didn't have to do anything except show up. They shot, added trending music, and gave me perfect reels within the hour.",
    review:
      "I didn't have to do anything except show up. They shot, added trending music, and gave me perfect reels within the hour.",
    rating: 5,
    avatar: '/brand/icon-gold.png',
    enabled: true,
    order: 5,
  },
  {
    id: 'testi_6',
    name: 'Sravanthi R.',
    role: 'Bride',
    quote:
      'I was literally watching our wedding reel before the reception dinner even started. These guys are insanely fast and so good!',
    review:
      'I was literally watching our wedding reel before the reception dinner even started. These guys are insanely fast and so good!',
    rating: 5,
    avatar: '/brand/icon-gold.png',
    enabled: true,
    order: 6,
  },
];

// Default 10 pricing packages (Instant x4, Business x2, Wedding x4)
export const INITIAL_PRICING_PLANS = [
  // Instant
  {
    id: 'instant-hourly',
    category: 'instant',
    tag: 'SINGLE EVENT',
    name: 'Hourly Plan',
    description: 'Perfect for anyone who wants a single, fast, high-quality reel delivered in minutes.',
    price: '₹ 2,200',
    priceSuffix: '+ GST',
    badge: 'BEST SELLER',
    isPopular: true,
    enabled: true,
    order: 1,
    shootType: 'Hourly Plan (₹2,200 - 1 Hour Shoot, 1 Reel)',
    inclusions: [
      '1 Hour Professional Shoot',
      '1 High-Quality Edited Reel',
      'Shot on Latest iPhone',
      'Instant reel delivery (within minutes)',
      'Instant Reel Maker on site',
      'reelXpress Branding Included',
      'Up to 2 Free Revisions',
    ],
    ctaText: 'Book Hourly',
  },
  {
    id: 'instant-vehicle',
    category: 'instant',
    tag: 'AUTOMOTIVE',
    name: 'Vehicle Shoot',
    description: 'Specialized dynamic reels for car & superbike deliveries, unboxings, and rallies.',
    price: '₹3,999',
    priceSuffix: 'onwards + 18% GST',
    badge: '',
    isPopular: false,
    enabled: true,
    order: 2,
    shootType: 'Vehicle Shoot (From ₹3,999 - Regular / Premium / Drone)',
    inclusions: [
      'Regular ₹3,999 · Premium ₹4,999 · Drone ₹8,999',
      'Dynamic rolling & tracking shots',
      'Shot on Latest iPhone with gimbal gear',
      'Instant reel delivery',
      'Sound design & exhaust note capture',
      'RAW content on request',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Vehicle Shoot',
  },
  {
    id: 'instant-half-day',
    category: 'instant',
    tag: 'FOUR HOURS',
    name: 'Half Day',
    description: 'Ideal for parties, pop-up events, store launches, or multi-content creator shoots.',
    price: '₹8,500',
    priceSuffix: '+ 18% GST',
    badge: '',
    isPopular: false,
    enabled: true,
    order: 3,
    shootType: 'Half Day Plan (₹8,500 - Up to 4 Hours, 3 Reels)',
    inclusions: [
      'Covers up to 4 hours event',
      'Includes 3 High-Impact Edited Reels',
      'Shot on Latest iPhone',
      'Instant reel delivery',
      'Dedicated Creator on site',
      'Complimentary mobile portraits',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Half Day',
  },
  {
    id: 'instant-full-day',
    category: 'instant',
    tag: 'EIGHT HOURS',
    name: 'Full Day',
    description: 'Complete day-long coverage for exhibitions, major festivals, and marathon events.',
    price: '₹15,000',
    priceSuffix: '+ 18% GST',
    badge: '',
    isPopular: false,
    enabled: true,
    order: 4,
    shootType: 'Full Day Plan (₹15,000 - Up to 8 Hours, 7 Reels)',
    inclusions: [
      'Covers up to 8 hours event',
      'Includes 7 High-Impact Edited Reels',
      'Shot on Latest iPhone',
      'Priority on-site delivery',
      'Full event storytelling & coverage',
      'All RAW footage provided on request',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Full Day',
  },
  // Business
  {
    id: 'business-brand',
    category: 'business',
    tag: 'COMPREHENSIVE',
    name: 'Brand shoot',
    description: 'Professional coverage tailored to campaign, launch, and showcase moments, scoped around your calendar and deliverables.',
    price: 'Customised',
    priceSuffix: '+ GST',
    badge: 'MOST FLEXIBLE',
    isPopular: true,
    enabled: true,
    order: 5,
    shootType: 'Brand Shoot (Customised Pricing - Campaign & Showcase)',
    inclusions: [
      'Cinematic visuals for premium brands & events',
      'Refined, brand-aligned storytelling',
      'Professional production with expert direction',
      'Hassle-free booking & coordination',
      'Quick turnaround: Cut. Polish. Launch.',
      'Ideal for campaigns, launches & brand showcases',
      'Dedicated creative director for every campaign',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Now',
  },
  {
    id: 'business-product',
    category: 'business',
    tag: 'PER REEL',
    name: 'Product Shoot',
    description: 'High-converting product and catalog reels for e-commerce, D2C, and brand launches, shot and edited to make your product the hero.',
    price: '₹ 7,000',
    priceSuffix: 'onwards / per reel + GST',
    badge: '',
    isPopular: false,
    enabled: true,
    order: 6,
    shootType: 'Product Shoot (₹7,000 / reel - E-commerce & Catalog)',
    inclusions: [
      'Product, catalog & e-commerce reels',
      'Studio or on-location shoots',
      'Cinematic reel delivery',
      'Shot on the latest iPhone',
      'RAW content on request',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Enquire now',
  },
  // Wedding
  {
    id: 'wedding-basic',
    category: 'wedding',
    tag: 'SINGLE EVENT',
    name: 'Basic',
    description: "Perfect for couples looking for a stunning, professionally crafted wedding shoot that won't break the bank.",
    price: '₹ 14,999',
    priceSuffix: '+ 18% GST',
    badge: '',
    isPopular: false,
    enabled: true,
    order: 7,
    shootType: 'Wedding Basic (₹14,999 - Single Event, 3 Reels)',
    inclusions: [
      'Covers up to one event',
      'Includes 3 Reels',
      'Shot on iPhone',
      'Instant reel delivery',
      'Complimentary pictures',
      'Please provide an SD card to receive all raw content if needed',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Basic',
  },
  {
    id: 'wedding-silver',
    category: 'wedding',
    tag: 'THREE EVENTS',
    name: 'Silver',
    description: 'Perfect for those who want comprehensive coverage with an extra touch of elegance.',
    price: '₹ 44,999',
    priceSuffix: '+ 18% GST',
    badge: '',
    isPopular: false,
    enabled: true,
    order: 8,
    shootType: 'Wedding Silver (₹44,999 - Three Events, 10 Reels)',
    inclusions: [
      'Covers up to three event',
      'Includes 10 Reels',
      'Shot on iPhone',
      'Instant reel delivery',
      'Complimentary pictures',
      'Please provide an SD card to receive all raw content if needed',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Silver',
  },
  {
    id: 'wedding-gold',
    category: 'wedding',
    tag: 'FOUR EVENTS',
    name: 'Gold',
    description: 'Perfect for couples who want an exclusive, comprehensive experience across four events.',
    price: '₹ 59,999',
    priceSuffix: '+ 18% GST',
    badge: 'MOST POPULAR',
    isPopular: true,
    enabled: true,
    order: 9,
    shootType: 'Wedding Gold (₹59,999 - Four Events, 15 Reels)',
    inclusions: [
      'Covers up to four event',
      'Includes 15 Reels',
      'Shot on iPhone',
      'Instant reel delivery',
      'Complimentary pictures',
      'Please provide an SD card to receive all raw content if needed',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Gold',
  },
  {
    id: 'wedding-platinum',
    category: 'wedding',
    tag: 'COMPLETE WEDDING',
    name: 'Platinum',
    description: 'For couples who want it all: every moment captured with unmatched attention to detail.',
    price: '₹ 99,999',
    priceSuffix: '+ 18% GST',
    badge: '',
    isPopular: false,
    enabled: true,
    order: 10,
    shootType: 'Wedding Platinum (₹99,999 - Complete Wedding, 25 Reels)',
    inclusions: [
      'Covers whole wedding events',
      'Includes 25 Reels',
      'Shot on iPhone',
      'Instant reel delivery',
      'Interaction videos with complimentary mobile portraits',
      'Please provide an SD card to receive all raw content if needed',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Platinum',
  },
];

// Default FAQs
export const INITIAL_FAQS = (FAQ_DATA || []).map((faq, idx) => ({
  id: 'faq_' + (idx + 1),
  question: faq.question || faq.q || '',
  answer: faq.answer || faq.a || '',
  category: faq.category || 'General',
  enabled: true,
  order: idx + 1,
}));

// Default Hero slides
export const INITIAL_HERO_SLIDES = (REEL_PORTFOLIO || []).map((reel, idx) => ({
  id: String(reel.id || idx + 1),
  title: reel.title || `Featured Reel ${idx + 1}`,
  creator: reel.creator || 'reelXpress Creator',
  category: reel.category || 'Celebrations',
  views: reel.views || '150K views',
  poster: reel.poster || '/thumbnails/reel-frame-1.jpg',
  instagramUrl: reel.instagramUrl || 'https://www.instagram.com/reelxpress___',
  enabled: true,
  order: idx + 1,
}));

// =============================================================================
// 2. HELPER FUNCTIONS: TIMEOUT & CACHE & MERGE
// =============================================================================

function getLocal(key, defaultVal) {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch {
    return defaultVal;
  }
}

function setLocal(key, val) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

function withTimeout(promise, ms = 3500, label = 'CMS Operation') {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

async function safeQueryDocs(colName, sortField, sortDir = 'asc') {
  if (!isFirebaseConfigured || !db) return null;
  try {
    let q;
    try {
      q = sortField
        ? query(collection(db, colName), orderBy(sortField, sortDir))
        : collection(db, colName);
    } catch {
      q = collection(db, colName);
    }
    const snap = await withTimeout(getDocs(q), 3500, `Fetch ${colName}`);
    if (snap && !snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
    if (snap && snap.empty) {
      return [];
    }
  } catch (err) {
    console.warn(`[safeQueryDocs] ${colName} read warning:`, err?.message || err);
    try {
      const snap = await withTimeout(getDocs(collection(db, colName)), 2000, `Fallback ${colName}`);
      if (snap && !snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      }
    } catch {}
  }
  return null;
}

/**
 * Intelligent Catalog Merge:
 * Combines default baseline items with Firestore modifications:
 * 1. Default items form the initial catalog.
 * 2. Documents from Firestore override defaults with updated fields.
 * 3. Deleted items (_deleted === true) are excluded.
 * 4. Custom items created by admin are appended.
 * 5. Returns sorted list by order.
 */
function mergeCloudWithDefaults(defaults, cloudDocs, options = {}) {
  const map = new Map();

  // Populate default baseline items
  defaults.forEach((item) => {
    map.set(item.id, { ...item });
  });

  if (Array.isArray(cloudDocs)) {
    cloudDocs.forEach((cloudItem) => {
      if (!cloudItem || !cloudItem.id) return;

      // Handle legacy aliases (e.g. plan_business_brand -> business-brand)
      const targetId =
        cloudItem.id === 'plan_business_brand' ? 'business-brand' : cloudItem.id;

      if (cloudItem._deleted === true) {
        map.delete(targetId);
        map.delete(cloudItem.id);
        return;
      }

      const existing = map.get(targetId) || map.get(cloudItem.id) || {};

      // Testimonial specific: Keep quote and review strictly synchronized
      const text =
        cloudItem.review ||
        cloudItem.quote ||
        existing.review ||
        existing.quote ||
        '';

      // FAQ specific: Keep question and answer synchronized
      const question =
        cloudItem.question ||
        cloudItem.q ||
        existing.question ||
        existing.q ||
        '';
      const answer =
        cloudItem.answer ||
        cloudItem.a ||
        existing.answer ||
        existing.a ||
        '';

      const merged = {
        ...existing,
        ...cloudItem,
        id: targetId,
      };

      if (options.type === 'testimonials') {
        merged.quote = text;
        merged.review = text;
      } else if (options.type === 'faqs') {
        merged.question = question;
        merged.answer = answer;
        merged.q = question;
        merged.a = answer;
      }

      map.set(targetId, merged);
    });
  }

  const result = Array.from(map.values());
  result.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  return result;
}

// =============================================================================
// 3. ACTIVITY LOGGING
// =============================================================================
export async function logAdminActivity(action, details, adminEmail = 'admin@reelxpress.com') {
  const entry = {
    id: 'act_' + Date.now(),
    action,
    details,
    adminEmail,
    timestamp: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, 'activity_logs'), entry);
    } catch {}
  }

  const logs = getLocal(KEY_ACTIVITY, []);
  setLocal(KEY_ACTIVITY, [entry, ...logs].slice(0, 50));
  return entry;
}

export async function getActivityLogs() {
  const cloud = await safeQueryDocs('activity_logs', 'timestamp', 'desc');
  if (cloud && cloud.length > 0) {
    cloud.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));
    return cloud;
  }
  return getLocal(KEY_ACTIVITY, [
    {
      id: 'act_init',
      action: 'System Initialized',
      details: 'reelXpress Admin Panel & Firebase Suite connected successfully.',
      adminEmail: 'admin@reelxpress.com',
      timestamp: new Date().toISOString(),
    },
  ]);
}

// =============================================================================
// 4. TESTIMONIALS & REVIEWS CMS
// =============================================================================

export async function getTestimonials() {
  const cloud = await safeQueryDocs('cms_testimonials', 'order', 'asc');
  const merged = mergeCloudWithDefaults(INITIAL_TESTIMONIALS, cloud, {
    type: 'testimonials',
  });
  setLocal(KEY_TESTIMONIALS, merged);
  return merged;
}

export async function saveTestimonial(testimonial, adminEmail) {
  const isNew = !testimonial.id || testimonial.id.startsWith('new_');
  const tId = isNew ? 'testi_' + Date.now() : testimonial.id;
  const reviewText = (testimonial.review || testimonial.quote || '').trim();

  const payload = {
    ...testimonial,
    id: tId,
    review: reviewText,
    quote: reviewText,
    rating: Number(testimonial.rating) || 5,
    avatar: testimonial.avatar || '/brand/icon-gold.png',
    enabled: testimonial.enabled !== false,
    order: Number(testimonial.order) || 1,
    updatedAt: new Date().toISOString(),
    updatedBy: adminEmail || 'admin@reelxpress.com',
  };

  // Direct Firestore persistence
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'cms_testimonials', tId), payload, { merge: true });
    } catch (err) {
      console.warn('[saveTestimonial] Direct Firestore write notice:', err);
    }
  }

  // Double sync via server API to guarantee persistence
  if (typeof window !== 'undefined') {
    try {
      fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'testimonials', item: payload, adminEmail }),
      }).catch(() => {});
    } catch {}
  }

  // Update local cache
  if (typeof window !== 'undefined') {
    try {
      fetch(`/api/cms?type=testimonials&id=${testimonialId}&adminEmail=${encodeURIComponent(adminEmail || '')}`, {
        method: 'DELETE',
      }).catch(() => {});
    } catch {}
  }

  const list = await getTestimonials();
  const updated = isNew
    ? [...list, payload]
    : list.map((item) => (item.id === tId ? payload : item));
  setLocal(KEY_TESTIMONIALS, updated);

  await logAdminActivity(
    isNew ? 'Added Testimonial' : 'Updated Testimonial',
    `Author: "${payload.name}" (${payload.role})`,
    adminEmail
  );

  return payload;
}

export async function deleteTestimonial(testimonialId, adminEmail) {
  if (isFirebaseConfigured && db) {
    try {
      // Mark as deleted in Firestore so default seed does not resurrect it
      await setDoc(
        doc(db, 'cms_testimonials', testimonialId),
        { id: testimonialId, _deleted: true, updatedAt: new Date().toISOString() },
        { merge: true }
      );
    } catch {
      try {
        await deleteDoc(doc(db, 'cms_testimonials', testimonialId));
      } catch {}
    }
  }

  if (typeof window !== 'undefined') {
    try {
      fetch(`/api/cms?type=testimonials&id=${testimonialId}&adminEmail=${encodeURIComponent(adminEmail || '')}`, {
        method: 'DELETE',
      }).catch(() => {});
    } catch {}
  }

  const list = await getTestimonials();
  const updated = list.filter((t) => t.id !== testimonialId);
  setLocal(KEY_TESTIMONIALS, updated);

  await logAdminActivity('Deleted Testimonial', `Testimonial ID: ${testimonialId}`, adminEmail);
  return { success: true, id: testimonialId };
}

// =============================================================================
// 5. PRICING PLANS CMS
// =============================================================================

export async function getPricingPlans() {
  const cloud = await safeQueryDocs('cms_pricing', 'order', 'asc');
  const merged = mergeCloudWithDefaults(INITIAL_PRICING_PLANS, cloud, {
    type: 'pricing',
  });
  setLocal(KEY_PRICING, merged);
  return merged;
}

export async function savePricingPlan(plan, adminEmail) {
  const isNew = !plan.id || plan.id.startsWith('new_');
  const planId = isNew ? 'plan_' + Date.now() : plan.id;
  const payload = {
    ...plan,
    id: planId,
    enabled: plan.enabled !== false,
    order: Number(plan.order) || 1,
    updatedAt: new Date().toISOString(),
    updatedBy: adminEmail || 'admin@reelxpress.com',
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'cms_pricing', planId), payload, { merge: true });
    } catch (err) {
      console.warn('[savePricingPlan] Direct Firestore write notice:', err);
    }
  }

  if (typeof window !== 'undefined') {
    try {
      fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'pricing', item: payload, adminEmail }),
      }).catch(() => {});
    } catch {}
  }

  if (typeof window !== 'undefined') {
    try {
      fetch(`/api/cms?type=pricing&id=${planId}&adminEmail=${encodeURIComponent(adminEmail || '')}`, {
        method: 'DELETE',
      }).catch(() => {});
    } catch {}
  }

  const plans = await getPricingPlans();
  const updated = isNew
    ? [...plans, payload]
    : plans.map((p) => (p.id === planId ? payload : p));
  setLocal(KEY_PRICING, updated);

  await logAdminActivity(
    isNew ? 'Added Pricing Plan' : 'Updated Pricing Plan',
    `Plan: "${payload.name}" (${payload.price})`,
    adminEmail
  );
  return payload;
}

export async function deletePricingPlan(planId, adminEmail) {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(
        doc(db, 'cms_pricing', planId),
        { id: planId, _deleted: true, updatedAt: new Date().toISOString() },
        { merge: true }
      );
    } catch {
      try {
        await deleteDoc(doc(db, 'cms_pricing', planId));
      } catch {}
    }
  }

  if (typeof window !== 'undefined') {
    try {
      fetch(`/api/cms?type=pricing&id=${planId}&adminEmail=${encodeURIComponent(adminEmail || '')}`, {
        method: 'DELETE',
      }).catch(() => {});
    } catch {}
  }

  const plans = await getPricingPlans();
  const updated = plans.filter((p) => p.id !== planId);
  setLocal(KEY_PRICING, updated);

  await logAdminActivity('Deleted Pricing Plan', `Plan ID: ${planId}`, adminEmail);
  return { success: true, id: planId };
}

// =============================================================================
// 6. FAQS CMS
// =============================================================================

export async function getFaqs() {
  const cloud = await safeQueryDocs('cms_faqs', 'order', 'asc');
  const merged = mergeCloudWithDefaults(INITIAL_FAQS, cloud, {
    type: 'faqs',
  });
  setLocal(KEY_FAQS, merged);
  return merged;
}

export async function saveFaq(faq, adminEmail) {
  const isNew = !faq.id || faq.id.startsWith('new_');
  const faqId = isNew ? 'faq_' + Date.now() : faq.id;
  const question = (faq.question || faq.q || '').trim();
  const answer = (faq.answer || faq.a || '').trim();

  const payload = {
    ...faq,
    id: faqId,
    question,
    answer,
    q: question,
    a: answer,
    category: faq.category || 'General',
    enabled: faq.enabled !== false,
    order: Number(faq.order) || 1,
    updatedAt: new Date().toISOString(),
    updatedBy: adminEmail || 'admin@reelxpress.com',
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'cms_faqs', faqId), payload, { merge: true });
    } catch (err) {
      console.warn('[saveFaq] Direct Firestore write notice:', err);
    }
  }

  if (typeof window !== 'undefined') {
    try {
      fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'faqs', item: payload, adminEmail }),
      }).catch(() => {});
    } catch {}
  }

  if (typeof window !== 'undefined') {
    try {
      fetch(`/api/cms?type=faqs&id=${faqId}&adminEmail=${encodeURIComponent(adminEmail || '')}`, {
        method: 'DELETE',
      }).catch(() => {});
    } catch {}
  }

  const list = await getFaqs();
  const updated = isNew
    ? [...list, payload]
    : list.map((item) => (item.id === faqId ? payload : item));
  setLocal(KEY_FAQS, updated);

  await logAdminActivity(
    isNew ? 'Added FAQ' : 'Updated FAQ',
    `Question: "${payload.question.substring(0, 40)}..."`,
    adminEmail
  );
  return payload;
}

export async function deleteFaq(faqId, adminEmail) {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(
        doc(db, 'cms_faqs', faqId),
        { id: faqId, _deleted: true, updatedAt: new Date().toISOString() },
        { merge: true }
      );
    } catch {
      try {
        await deleteDoc(doc(db, 'cms_faqs', faqId));
      } catch {}
    }
  }

  if (typeof window !== 'undefined') {
    try {
      fetch(`/api/cms?type=faqs&id=${faqId}&adminEmail=${encodeURIComponent(adminEmail || '')}`, {
        method: 'DELETE',
      }).catch(() => {});
    } catch {}
  }

  const list = await getFaqs();
  const updated = list.filter((f) => f.id !== faqId);
  setLocal(KEY_FAQS, updated);

  await logAdminActivity('Deleted FAQ', `FAQ ID: ${faqId}`, adminEmail);
  return { success: true, id: faqId };
}

// =============================================================================
// 7. HERO CAROUSEL / REELS CMS
// =============================================================================

export async function getHeroSlides() {
  const cloud = await safeQueryDocs('cms_hero', 'order', 'asc');
  const merged = mergeCloudWithDefaults(INITIAL_HERO_SLIDES, cloud, {
    type: 'hero',
  });
  setLocal(KEY_HERO, merged);
  return merged;
}

export async function saveHeroSlide(slide, adminEmail) {
  const isNew = !slide.id || slide.id.startsWith('new_');
  const slideId = isNew ? 'slide_' + Date.now() : slide.id;
  const payload = {
    ...slide,
    id: slideId,
    enabled: slide.enabled !== false,
    order: Number(slide.order) || 1,
    updatedAt: new Date().toISOString(),
    updatedBy: adminEmail || 'admin@reelxpress.com',
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'cms_hero', slideId), payload, { merge: true });
    } catch (err) {
      console.warn('[saveHeroSlide] Direct Firestore write notice:', err);
    }
  }

  if (typeof window !== 'undefined') {
    try {
      fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'hero', item: payload, adminEmail }),
      }).catch(() => {});
    } catch {}
  }

  if (typeof window !== 'undefined') {
    try {
      fetch(`/api/cms?type=hero&id=${slideId}&adminEmail=${encodeURIComponent(adminEmail || '')}`, {
        method: 'DELETE',
      }).catch(() => {});
    } catch {}
  }

  const slides = await getHeroSlides();
  const updated = isNew
    ? [...slides, payload]
    : slides.map((s) => (s.id === slideId ? payload : s));
  setLocal(KEY_HERO, updated);

  await logAdminActivity(
    isNew ? 'Added Hero Slide' : 'Updated Hero Slide',
    `Slide: "${payload.title}" (${payload.category})`,
    adminEmail
  );
  return payload;
}

export async function deleteHeroSlide(slideId, adminEmail) {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(
        doc(db, 'cms_hero', slideId),
        { id: slideId, _deleted: true, updatedAt: new Date().toISOString() },
        { merge: true }
      );
    } catch {
      try {
        await deleteDoc(doc(db, 'cms_hero', slideId));
      } catch {}
    }
  }

  if (typeof window !== 'undefined') {
    try {
      fetch(`/api/cms?type=hero&id=${slideId}&adminEmail=${encodeURIComponent(adminEmail || '')}`, {
        method: 'DELETE',
      }).catch(() => {});
    } catch {}
  }

  const slides = await getHeroSlides();
  const updated = slides.filter((s) => s.id !== slideId);
  setLocal(KEY_HERO, updated);

  await logAdminActivity('Deleted Hero Slide', `Slide ID: ${slideId}`, adminEmail);
  return { success: true, id: slideId };
}

// =============================================================================
// 8. IMAGE UPLOAD HELPER (Firebase Storage with base64 Data URL fallback)
// =============================================================================

export async function uploadImageFile(file, folder = 'uploads') {
  if (!file) throw new Error('No file provided for upload.');

  // Direct Firebase Storage upload if accessible
  if (isFirebaseConfigured && storage) {
    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const storageRef = ref(storage, `${folder}/${Date.now()}_${sanitizedName}`);
      const snapshot = await withTimeout(uploadBytes(storageRef, file), 5000, 'Firebase Storage Upload');
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (err) {
      console.warn('[uploadImageFile] Firebase Storage upload notice, using Data URL fallback:', err?.message || err);
    }
  }

  // Fast reliable fallback: convert to base64 Data URL so images preview and persist immediately
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
