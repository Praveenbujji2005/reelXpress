'use client';

import { useState, useEffect } from 'react';
import { getPricingPlans } from '@/lib/cmsServices';

// Pricing Tabs
const TABS = [
  { id: 'instant', label: 'Instant packages' },
  { id: 'business', label: 'Business packages' },
  { id: 'wedding', label: 'Wedding & Luxe' },
];

// 1. INSTANT PACKAGES (Fast on-site delivery in minutes)
const INSTANT_PACKAGES = [
  {
    id: 'instant-hourly',
    tag: 'SINGLE EVENT',
    name: 'Hourly Plan',
    description: 'Perfect for anyone who wants a single, fast, high-quality reel delivered in minutes.',
    price: '₹ 2,200',
    priceSuffix: '+ GST',
    badge: 'BEST SELLER',
    isPopular: true,
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
    tag: 'AUTOMOTIVE',
    name: 'Vehicle Shoot',
    description: 'Specialized dynamic reels for car & superbike deliveries, unboxings, and rallies.',
    price: '₹ 3,999',
    priceSuffix: 'onwards + GST',
    isPopular: false,
    shootType: 'Vehicle Shoot (From ₹3,999 - Regular / Premium / Drone)',
    inclusions: [
      'Regular ₹3,999 · Premium ₹4,999 · Drone ₹8,999',
      'Dynamic rolling & tracking shots',
      'Shot on Latest iPhone with gimbal gear',
      'Instant reel delivery.',
      'Sound design & exhaust note capture',
      'RAW content on request',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Vehicle Shoot',
  },
  {
    id: 'instant-half-day',
    tag: 'FOUR HOURS',
    name: 'Half Day',
    description: 'Ideal for parties, pop-up events, store launches, or multi-content creator shoots.',
    price: '₹ 8,500',
    priceSuffix: '+ GST',
    isPopular: false,
    shootType: 'Half Day Plan (₹8,500 - Up to 4 Hours, 3 Reels)',
    inclusions: [
      'Covers up to 4 hours event',
      'Include 3 High-Impact Edited Reels',
      'Shot on Latest iPhone',
      'Instant reel delivery.',
      'Dedicated Creator on site',
      'Complementary mobile portraits',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Half Day',
  },
  {
    id: 'instant-full-day',
    tag: 'EIGHT HOURS',
    name: 'Full Day',
    description: 'Complete day-long coverage for exhibitions, major festivals, and marathon events.',
    price: '₹ 15,000',
    priceSuffix: '+ GST',
    isPopular: false,
    shootType: 'Full Day Plan (₹15,000 - Up to 8 Hours, 7 Reels)',
    inclusions: [
      'Covers up to 8 hours event',
      'Include 7 High-Impact Edited Reels',
      'Shot on Latest iPhone',
      'Priority on-site delivery.',
      'Full event storytelling & coverage',
      'All RAW footage provided on request',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Full Day',
  },
];

// 2. BUSINESS PACKAGES (Matching Reference Image 2)
const BUSINESS_PACKAGES = [
  {
    id: 'business-brand',
    tag: 'COMPREHENSIVE',
    name: 'Brand shoot',
    description: 'Professional coverage tailored to campaign, launch, and showcase moments, scoped around your calendar and deliverables.',
    price: 'Customised',
    priceSuffix: '+ GST',
    badge: 'MOST FLEXIBLE',
    isPopular: true,
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
    btnVariant: 'primary',
  },
  {
    id: 'business-product',
    tag: 'PER REEL',
    name: 'Product Shoot',
    description: 'High-converting product and catalog reels for e-commerce, D2C, and brand launches, shot and edited to make your product the hero.',
    price: '₹ 7,000',
    priceSuffix: 'onwards / per reel + GST',
    isPopular: false,
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
    btnVariant: 'white',
  },
];

// 3. WEDDING PACKAGES (Matching Reference Image 1)
const WEDDING_PACKAGES = [
  {
    id: 'wedding-basic',
    tag: 'SINGLE EVENT',
    name: 'Basic',
    description: "Perfect for couples looking for a stunning, professionally crafted wedding shoot that won't break the bank.",
    price: '₹ 14,999',
    priceSuffix: '+ GST',
    isPopular: false,
    shootType: 'Wedding Basic (₹14,999 - Single Event, 3 Reels)',
    inclusions: [
      'Covers up to one event',
      'Include 3 Reels',
      'Shot on iPhone',
      'Instant reel delivery.',
      'Complementary Pictures',
      'Please provide an SD card to receive all raw content if needed.',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Basic',
  },
  {
    id: 'wedding-silver',
    tag: 'THREE EVENTS',
    name: 'Silver',
    description: 'Perfect for those who want comprehensive coverage with an extra touch of elegance.',
    price: '₹ 44,999',
    priceSuffix: '+ GST',
    isPopular: false,
    shootType: 'Wedding Silver (₹44,999 - Three Events, 10 Reels)',
    inclusions: [
      'Covers up to three event',
      'Include 10 Reels',
      'Shot on iPhone',
      'Instant reel delivery.',
      'Complementary Pictures',
      'Please provide an SD card to receive all raw content if needed.',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Silver',
  },
  {
    id: 'wedding-gold',
    tag: 'FOUR EVENTS',
    name: 'Gold',
    description: 'Perfect for couples who want an exclusive, comprehensive experience across four events.',
    price: '₹ 59,999',
    priceSuffix: '+ GST',
    badge: 'MOST POPULAR',
    isPopular: true,
    shootType: 'Wedding Gold (₹59,999 - Four Events, 15 Reels)',
    inclusions: [
      'Covers up to four event',
      'Include 15 Reels',
      'Shot on iPhone',
      'Instant reel delivery.',
      'Complementary Pictures',
      'Please provide an SD card to receive all raw content if needed.',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Gold',
  },
  {
    id: 'wedding-platinum',
    tag: 'COMPLETE WEDDING',
    name: 'Platinum',
    description: 'For couples who want it all: every moment captured with unmatched attention to detail.',
    price: '₹ 99,999',
    priceSuffix: '+ GST',
    isPopular: false,
    shootType: 'Wedding Platinum (₹99,999 - Complete Wedding, 25 Reels)',
    inclusions: [
      'Covers whole wedding events',
      'Include 25 Reels',
      'Shot on iPhone',
      'Instant reel delivery.',
      'Interaction videos with complimentary mobile portraits',
      'Please provide an SD card to receive all raw content if needed.',
      'reelXpress Logo Mandatory',
    ],
    ctaText: 'Book Platinum',
  },
];

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState('instant');
  const [instantPlans, setInstantPlans] = useState(INSTANT_PACKAGES);
  const [businessPlans, setBusinessPlans] = useState(BUSINESS_PACKAGES);
  const [weddingPlans, setWeddingPlans] = useState(WEDDING_PACKAGES);

  useEffect(() => {
    getPricingPlans()
      .then((plans) => {
        if (plans && plans.length > 0) {
          const activePlans = plans.filter((p) => p.enabled !== false);
          const instant = activePlans.filter((p) => p.category === 'instant');
          const business = activePlans.filter((p) => p.category === 'business');
          const wedding = activePlans.filter((p) => p.category === 'wedding');
          if (instant.length > 0) setInstantPlans(instant);
          if (business.length > 0) setBusinessPlans(business);
          if (wedding.length > 0) setWeddingPlans(wedding);
        }
      })
      .catch(() => {});
  }, []);

  const handleBooking = (e, shootType) => {
    e.preventDefault();
    if (shootType) {
      window.dispatchEvent(
        new CustomEvent('select-shoot-type', { detail: { type: shootType } })
      );
    }
    const bookingEl =
      document.getElementById('booking-form') ||
      document.getElementById('booking');

    if (bookingEl) {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.scrollTo(bookingEl, { offset: -60, duration: 1.2 });
      } else {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '#booking';
    }
  };

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 md:px-margin max-w-[1440px] mx-auto" id="pricing">
      
      {/* Static Atmospheric Radial Ambient in Brand Orange (Zero Spinning Animation) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[340px] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,109,41,0.16),transparent_70%)] pointer-events-none -z-10" />

      {/* 1. Pill Switcher Bar */}
      <div className="flex justify-center mb-10 sm:mb-14 px-1">
        <div
          role="tablist"
          aria-label="Pricing Categories"
          className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-[#181216] border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] gap-0.5 sm:gap-1 max-w-full select-none"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 xs:px-3 sm:px-6 md:px-7 py-1.5 sm:py-2.5 md:py-3 rounded-full text-[11px] sm:text-sm md:text-[15px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#ff6d29] text-white shadow-[0_4px_16px_rgba(255,109,41,0.45)]'
                    : 'text-[#9e969d] hover:text-white bg-transparent'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Dynamic Section Headers based on Active Tab */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        {activeTab === 'wedding' && (
          <>
            <span className="text-[#ff6d29] text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] block mb-2.5">
              WEDDING REEL PACKAGES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Capture Your Wedding <span className="font-serif italic font-normal text-white/70">Memories</span>
            </h2>
            <p className="text-sm sm:text-base text-[#a8a1a8] mt-3 max-w-xl mx-auto leading-relaxed">
              Professional wedding reel services to preserve your special moments forever.
            </p>
          </>
        )}

        {activeTab === 'business' && (
          <>
            <span className="text-[#ff6d29] text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] block mb-2.5">
              FOR BUSINESS AND BRANDS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Cinematic coverage, <span className="font-serif italic font-normal text-white/70">built for brands.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#a8a1a8] mt-3 max-w-xl mx-auto leading-relaxed">
              Professional coverage for your business events, delivering polished content that aligns with your brand identity and marketing goals.
            </p>
          </>
        )}

        {activeTab === 'instant' && (
          <>
            <span className="text-[#ff6d29] text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] block mb-2.5">
              INSTANT CONTENT PACKAGES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Minutes to Delivery. <span className="font-serif italic font-normal text-white/70">Zero Hassle.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#a8a1a8] mt-3 max-w-xl mx-auto leading-relaxed">
              On-spot iPhone vertical video shoots and instant editing for individuals, creators, and venues.
            </p>
          </>
        )}
      </div>

      {/* 3. Cards Display */}
      {/* ---------------- INSTANT PACKAGES (4 Cards) ---------------- */}
      {activeTab === 'instant' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16">
          {instantPlans.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-[28px] sm:rounded-[32px] bg-[#140f13] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                pkg.isPopular
                  ? 'border border-[#ff6d29]/70 shadow-[0_12px_40px_rgba(255,109,41,0.22)]'
                  : 'border border-white/10 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Optional Most Popular Badge in Orange */}
              {pkg.badge && (
                <div className="absolute -top-3.5 right-6 sm:right-7 px-3.5 py-1 rounded-full bg-[#ff6d29] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-[0_4px_12px_rgba(255,109,41,0.45)]">
                  {pkg.badge}
                </div>
              )}

              <div>
                {/* Category Subtitle */}
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff6d29] mb-2 block">
                  {pkg.tag}
                </span>

                {/* Plan Name */}
                <h3 className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight mb-2">
                  {pkg.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-[#a8a1a8] leading-relaxed mb-6 font-normal min-h-[44px]">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 pb-6 border-b border-white/10 mb-6">
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {pkg.price}
                  </span>
                  <span className="text-xs font-normal text-white/50 tracking-normal">
                    {pkg.priceSuffix}
                  </span>
                </div>

                {/* Inclusions */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3.5 block">
                    WHAT&apos;S INCLUDED
                  </span>
                  <ul className="space-y-3">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-white/80 leading-normal">
                        <svg
                          className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.isPopular ? 'text-[#ff6d29]' : 'text-white/60'}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#booking"
                onClick={(e) => handleBooking(e, pkg.shootType)}
                className={`group w-full mt-8 py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer ${
                  pkg.isPopular
                    ? 'bg-[#ff6d29] hover:bg-[#ff5500] text-white shadow-[0_8px_25px_rgba(255,109,41,0.4)]'
                    : 'bg-white/10 hover:bg-white/15 border border-white/15 text-white'
                }`}
              >
                <span>{pkg.ctaText}</span>
                <svg
                  className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H9M17 7V15" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- BUSINESS PACKAGES (2 Cards Centered) ---------------- */}
      {activeTab === 'business' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-16">
          {businessPlans.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-[28px] sm:rounded-[32px] bg-[#140f13] p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                pkg.isPopular
                  ? 'border border-[#ff6d29]/70 shadow-[0_16px_48px_rgba(255,109,41,0.22)]'
                  : 'border border-white/10 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Most Flexible Badge */}
              {pkg.badge && (
                <div className="absolute -top-3.5 right-6 sm:right-8 px-4 py-1.5 rounded-full bg-[#ff6d29] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-[0_4px_12px_rgba(255,109,41,0.45)]">
                  {pkg.badge}
                </div>
              )}

              <div>
                {/* Category Subtitle */}
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff6d29] mb-2 block">
                  {pkg.tag}
                </span>

                {/* Plan Name */}
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                  {pkg.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#a8a1a8] leading-relaxed mb-6 font-normal min-h-[48px]">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 pb-6 border-b border-white/10 mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {pkg.price}
                  </span>
                  <span className="text-xs sm:text-sm font-normal text-white/50 tracking-normal">
                    {pkg.priceSuffix}
                  </span>
                </div>

                {/* Inclusions */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-4 block">
                    WHAT&apos;S INCLUDED
                  </span>
                  <ul className="space-y-3.5">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white/80 leading-normal">
                        <svg
                          className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.isPopular ? 'text-[#ff6d29]' : 'text-white/60'}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#booking"
                onClick={(e) => handleBooking(e, pkg.shootType)}
                className={`group w-full mt-9 py-3.5 sm:py-4 px-6 rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer ${
                  pkg.btnVariant === 'primary'
                    ? 'bg-[#ff6d29] hover:bg-[#ff5500] text-white shadow-[0_8px_25px_rgba(255,109,41,0.4)]'
                    : 'bg-white hover:bg-white/90 text-black shadow-lg'
                }`}
              >
                <span>{pkg.ctaText}</span>
                <svg
                  className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H9M17 7V15" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- WEDDING & LUXE (4 Cards + Luxe Banner) ---------------- */}
      {activeTab === 'wedding' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
            {weddingPlans.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-[28px] sm:rounded-[32px] bg-[#140f13] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  pkg.isPopular
                    ? 'border border-[#ff6d29]/70 shadow-[0_12px_40px_rgba(255,109,41,0.22)]'
                    : 'border border-white/10 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Most Popular Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 right-6 sm:right-7 px-3.5 py-1 rounded-full bg-[#ff6d29] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-[0_4px_12px_rgba(255,109,41,0.45)]">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  {/* Category Subtitle */}
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff6d29] mb-2 block">
                    {pkg.tag}
                  </span>

                  {/* Plan Name */}
                  <h3 className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight mb-2">
                    {pkg.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-[#a8a1a8] leading-relaxed mb-6 font-normal min-h-[44px]">
                    {pkg.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 pb-6 border-b border-white/10 mb-6">
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {pkg.price}
                    </span>
                    <span className="text-xs font-normal text-white/50 tracking-normal">
                    {pkg.priceSuffix}
                    </span>
                  </div>

                  {/* Inclusions */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3.5 block">
                      WHAT&apos;S INCLUDED
                    </span>
                    <ul className="space-y-3">
                      {pkg.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-white/80 leading-normal">
                          <svg
                            className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.isPopular ? 'text-[#ff6d29]' : 'text-white/60'}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href="#booking"
                  onClick={(e) => handleBooking(e, pkg.shootType)}
                  className={`group w-full mt-8 py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer ${
                    pkg.isPopular
                      ? 'bg-[#ff6d29] hover:bg-[#ff5500] text-white shadow-[0_8px_25px_rgba(255,109,41,0.4)]'
                      : 'bg-white/10 hover:bg-white/15 border border-white/15 text-white'
                  }`}
                >
                  <span>{pkg.ctaText}</span>
                  <svg
                    className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H9M17 7V15" />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          {/* THE PINNACLE OF LUXE SECTION (Static Black & Gold Luxe Edition) */}
          <div className="rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-[#1c1419] via-[#141014] to-[#0c090c] border border-border-amber/60 hover:border-primary-container p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] transition-all duration-300">
            {/* Ambient Warm Glows */}
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,_rgba(255,109,41,0.18)_0%,_transparent_70%)] pointer-events-none blur-2xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,_rgba(255,215,0,0.08)_0%,_transparent_70%)] pointer-events-none blur-2xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
              
              {/* Left Editorial Content */}
              <div className="w-full lg:max-w-xl text-left">
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="w-8 sm:w-10 h-[2px] bg-gradient-to-r from-primary-container to-[#FFD700]" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-primary-container">
                    The Pinnacle of Luxury
                  </span>
                </div>

                {/* Editorial Luxe Title */}
                <h3 className="font-luxe-serif italic font-normal text-6xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffe6d8] to-[#ffb599] tracking-tight leading-none mb-6 drop-shadow-[0_4px_24px_rgba(255,109,41,0.35)]">
                  Luxe
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-[17px] text-[#c4bec6] font-normal leading-relaxed mb-8 max-w-lg">
                  Elevate your celebration with our most exclusive offering. A masterclass in cinematic storytelling, blending regal traditionalism with avant-garde aesthetics.
                </p>

                {/* Investment Section */}
                <div className="mb-8 sm:mb-10">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary-container block mb-1.5">
                    Investment
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                      ₹1,99,999
                    </span>
                    <span className="text-sm sm:text-base text-text-muted font-normal italic">
                      + GST
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <div>
                  <a
                    href="#booking"
                    onClick={(e) => handleBooking(e, 'Luxe Edition (₹1,99,999 - The Pinnacle of Luxury)')}
                    className="inline-flex items-center justify-center gap-2 px-9 sm:px-11 py-4 rounded-xl bg-primary-container text-white text-xs sm:text-sm font-extrabold uppercase tracking-[0.22em] shadow-[0_10px_32px_rgba(255,109,41,0.55)] hover:shadow-[0_14px_45px_rgba(255,109,41,0.85)] hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer border border-white/20"
                  >
                    <span>BOOK NOW</span>
                    <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                  </a>
                </div>
              </div>

              {/* Right Showcase Emblem */}
              <div className="w-full lg:w-auto flex items-center justify-center lg:justify-end">
                <div className="relative w-[300px] sm:w-[380px] md:w-[420px] aspect-square flex items-center justify-center">
                  
                  {/* Concentric Orbital Rings */}
                  <div className="absolute inset-2 sm:inset-4 rounded-full border border-primary-container/20 pointer-events-none" />
                  <div className="absolute inset-6 sm:inset-10 rounded-full border border-[#FFD700]/25 pointer-events-none" />
                  <div className="absolute inset-10 sm:inset-16 rounded-full border border-border-specular/40 pointer-events-none" />

                  {/* Central Luxury Emblem Disc */}
                  <div className="relative rounded-full bg-gradient-to-br from-[#241a22]/90 via-[#161116]/95 to-[#0e0a0e] border border-border-amber/80 shadow-[0_0_50px_rgba(255,109,41,0.3),inset_0_0_30px_rgba(255,109,41,0.1)] backdrop-blur-2xl w-[260px] sm:w-[320px] md:w-[350px] h-[260px] sm:h-[320px] md:h-[350px] flex flex-col items-center justify-center select-none group transition-transform duration-500 hover:scale-[1.02]">
                    
                    {/* 1. REEL */}
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f3f3f3] to-[#9e9e9e] leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      REEL
                    </span>

                    {/* 2. PRESS with 3D Gold X */}
                    <div className="flex items-center gap-2 sm:gap-2.5 leading-tight mt-1">
                      <img
                        src="/brand/icon-gold.png"
                        alt="X"
                        className="w-7 h-7 sm:w-9 sm:h-9 object-contain drop-shadow-[0_0_12px_rgba(255,215,0,0.9)]"
                      />
                      <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f3f3f3] to-[#9e9e9e] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        PRESS
                      </span>
                    </div>

                    {/* 3. LUXE with Gold Serif Italic */}
                    <span className="font-luxe-serif italic text-2xl sm:text-3xl md:text-4xl text-[#FFD700] tracking-[0.35em] mt-3 font-normal drop-shadow-[0_0_12px_rgba(255,215,0,0.7)]">
                      LUXE
                    </span>

                    {/* 4. Delicate Tapered Gold Underline */}
                    <div className="w-28 sm:w-36 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mt-2 shadow-[0_0_10px_rgba(255,215,0,0.6)]" />

                  </div>

                </div>
              </div>

            </div>
          </div>
        </>
      )}

    </section>
  );
}
