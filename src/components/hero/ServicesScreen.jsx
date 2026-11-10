'use client';

import React from 'react';

/**
 * ServicesScreen Component (Phone 2 Screen Content)
 *
 * Displays plans, services & 3-step workflow in pure HTML/CSS without images:
 * - Maroon header area with two chips: "India's 1st Quick Reel Service" & "Trained & Verified Reel Makers"
 * - Section title "Our Services", subtext "Book hourly and avail multiple services"
 * - Two side-by-side cards: Hourly Plan (₹1,999) with Clock icon, Half Day Plan (₹4,999) with Calendar icon
 * - Short 3-step list: 1 Book, 2 Shoot & Edit on the spot, 3 Delivered before the event ends
 */
export default function ServicesScreen() {
  return (
    <div className="flex-1 flex flex-col p-3 text-[#29170f] font-sans">
      {/* Maroon Header Area with Brand & Value Chips */}
      <div className="p-3 rounded-2xl bg-gradient-to-br from-[#4a1508] via-[#5c1d00] to-[#7f2b00] text-white shadow-md mb-3">
        {/* Brand bar */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-[13px] font-extrabold tracking-tight text-white flex items-center gap-1">
            <span>reel</span>
            <span className="text-[#ff6d29] font-black">X</span>
            <span>press</span>
          </div>
          <span className="text-[8.5px] font-bold bg-white/20 text-[#ffdbce] px-2 py-0.5 rounded-full border border-white/20">
            Bengaluru Live
          </span>
        </div>

        {/* Two Small Chips with Icons */}
        <div className="flex flex-col gap-1.5">
          {/* Chip 1 */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[9px] font-semibold text-[#ffdbce] backdrop-blur-sm self-start">
            <svg className="w-2.5 h-2.5 fill-[#ff6d29]" viewBox="0 0 24 24">
              <path d="M12 2l2.4 7.4h7.6l-6.1 4.5 2.3 7.1-6.2-4.6-6.2 4.6 2.3-7.1-6.1-4.5h7.6z" />
            </svg>
            <span>India&apos;s 1st Quick Reel Service</span>
          </div>

          {/* Chip 2 */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[9px] font-semibold text-[#ffdbce] backdrop-blur-sm self-start">
            <svg className="w-2.5 h-2.5 fill-[#ff6d29]" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <span>Trained &amp; Verified Reel Makers</span>
          </div>
        </div>
      </div>

      {/* Section Title & Subtext */}
      <div className="px-1 mb-2.5">
        <h3 className="text-xs sm:text-[13px] font-extrabold text-[#29170f] tracking-tight leading-tight">
          Our Services
        </h3>
        <p className="text-[9.5px] text-[#6e584f] font-medium leading-snug mt-0.5">
          Book hourly and avail multiple services
        </p>
      </div>

      {/* Two Small Cards Side by Side (Hourly Plan & Half Day Plan) */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* Card 1: Hourly Plan */}
        <div className="rounded-xl bg-white border border-[#ebdcd3] p-2.5 shadow-sm hover:border-[#5c1d00] transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#fedbce] text-[#5c1d00] flex items-center justify-center">
              {/* Clock Icon */}
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" d="M12 6v6l4 2" />
              </svg>
            </div>
            <span className="text-[7.5px] font-bold text-[#ff6d29] uppercase tracking-wide bg-[#ff6d29]/10 px-1.5 py-0.5 rounded">
              Popular
            </span>
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#29170f] leading-tight">
              Hourly Plan
            </div>
            <div className="text-[8.5px] font-bold text-[#7f2b00] mt-0.5">
              Starting from ₹1,999
            </div>
          </div>
        </div>

        {/* Card 2: Half Day Plan */}
        <div className="rounded-xl bg-white border border-[#ebdcd3] p-2.5 shadow-sm hover:border-[#5c1d00] transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#fedbce] text-[#5c1d00] flex items-center justify-center">
              {/* Calendar Icon */}
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[2.2]" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <span className="text-[7.5px] font-bold text-[#5c1d00] uppercase tracking-wide bg-[#5c1d00]/10 px-1.5 py-0.5 rounded">
              Events
            </span>
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#29170f] leading-tight">
              Half Day Plan
            </div>
            <div className="text-[8.5px] font-bold text-[#7f2b00] mt-0.5">
              Starting from ₹4,999
            </div>
          </div>
        </div>
      </div>

      {/* 3-Step Process List with Numbered Circles */}
      <div className="rounded-xl bg-[#f5ece4] p-2.5 border border-[#ebded3] space-y-2 shadow-inner">
        {/* Step 1 */}
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#5c1d00] text-white text-[8.5px] font-extrabold flex items-center justify-center shrink-0 shadow-sm">
            1
          </span>
          <span className="text-[9.5px] font-bold text-[#29170f]">
            Book
          </span>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#5c1d00] text-white text-[8.5px] font-extrabold flex items-center justify-center shrink-0 shadow-sm">
            2
          </span>
          <span className="text-[9.5px] font-bold text-[#29170f]">
            Shoot &amp; Edit on the spot
          </span>
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#5c1d00] text-white text-[8.5px] font-extrabold flex items-center justify-center shrink-0 shadow-sm">
            3
          </span>
          <span className="text-[9.5px] font-bold text-[#29170f]">
            Delivered before the event ends
          </span>
        </div>
      </div>
    </div>
  );
}
