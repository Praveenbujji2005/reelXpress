import { NextResponse } from 'next/server';
import {
  getTestimonials,
  saveTestimonial,
  deleteTestimonial,
  getPricingPlans,
  savePricingPlan,
  deletePricingPlan,
  getFaqs,
  saveFaq,
  deleteFaq,
  getHeroSlides,
  saveHeroSlide,
  deleteHeroSlide,
  getActivityLogs,
} from '@/lib/cmsServices';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'testimonials';

    let data = [];
    switch (type) {
      case 'testimonials':
      case 'reviews':
        data = await getTestimonials();
        break;
      case 'pricing':
        data = await getPricingPlans();
        break;
      case 'faqs':
        data = await getFaqs();
        break;
      case 'hero':
      case 'slides':
        data = await getHeroSlides();
        break;
      case 'activity':
        data = await getActivityLogs();
        break;
      default:
        data = await getTestimonials();
    }

    return NextResponse.json({ success: true, type, count: data.length, data });
  } catch (err) {
    console.error('[API /api/cms GET] Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch CMS content.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, item, adminEmail } = body;

    if (!type || !item) {
      return NextResponse.json(
        { success: false, error: 'Missing type or item payload.' },
        { status: 400 }
      );
    }

    let savedItem = null;
    switch (type) {
      case 'testimonials':
      case 'reviews':
        savedItem = await saveTestimonial(item, adminEmail);
        break;
      case 'pricing':
        savedItem = await savePricingPlan(item, adminEmail);
        break;
      case 'faqs':
        savedItem = await saveFaq(item, adminEmail);
        break;
      case 'hero':
      case 'slides':
        savedItem = await saveHeroSlide(item, adminEmail);
        break;
      default:
        throw new Error(`Unsupported CMS type: ${type}`);
    }

    return NextResponse.json({
      success: true,
      type,
      item: savedItem,
      message: `${type} saved successfully.`,
    });
  } catch (err) {
    console.error('[API /api/cms POST] Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to save CMS item.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const adminEmail = searchParams.get('adminEmail') || 'admin@reelxpress.com';

    if (!type || !id) {
      return NextResponse.json(
        { success: false, error: 'Missing type or id.' },
        { status: 400 }
      );
    }

    switch (type) {
      case 'testimonials':
      case 'reviews':
        await deleteTestimonial(id, adminEmail);
        break;
      case 'pricing':
        await deletePricingPlan(id, adminEmail);
        break;
      case 'faqs':
        await deleteFaq(id, adminEmail);
        break;
      case 'hero':
      case 'slides':
        await deleteHeroSlide(id, adminEmail);
        break;
      default:
        throw new Error(`Unsupported CMS type: ${type}`);
    }

    return NextResponse.json({
      success: true,
      type,
      id,
      message: `${type} item ${id} deleted successfully.`,
    });
  } catch (err) {
    console.error('[API /api/cms DELETE] Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete CMS item.' },
      { status: 500 }
    );
  }
}
