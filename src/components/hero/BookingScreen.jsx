'use client';

import React from 'react';

/**
 * BookingScreen Component (Phone 1 Screen Content)
 *
 * Displays live booking state in pure HTML/CSS without images:
 * - Header: "< Booking details"
 * - Maroon status bar: "Reel Maker arriving in 12 mins"
 * - CSS-only map placeholder: light beige grid, thin street lines, pulsing maroon dot & destination pin
 * - PIN shoot verification: "Start your shoot with PIN" with 4 small maroon digit boxes (4 3 0 5)
 */
export default function BookingScreen() {
  return (
    <div className="flex-1 flex flex-col p-3 text-[#29170f] font-sans">
      {/* Top Header: "< Booking details" */}
      <div className="flex items-center gap-1.5 pt-1 pb-2.5 px-1 border-b border-[#ebdcd3]">
        <button
          type="button"
          aria-label="Back to bookings"
          className="w-5 h-5 flex items-center justify-center text-[#5c1d00] hover:opacity-80 transition-opacity"
        >
          <svg className="w-4 h-4 stroke-current stroke-[2.5] fill-none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-xs font-bold text-[#29170f] tracking-tight">
          Booking details
        </span>
        <span className="ml-auto text-[10px] font-semibold text-[#7f2b00] bg-[#fedbce] px-2 py-0.5 rounded-full">
          Live #8431
        </span>
      </div>

      {/* Maroon Theme Status Bar: "Reel Maker arriving in 12 mins" */}
      <div className="mt-2.5 p-2.5 rounded-xl bg-[#5c1d00] text-white shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Scooter / Motion Icon */}
          <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center text-[#ffdbce] shrink-0">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 7c0-1.1-.9-2-2-2h-3v2h3v2.65L13.52 14H10V9H6c-2.21 0-4 1.79-4 4v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4.18c.41 1.16 1.51 2 2.82 2 1.66 0 3-1.34 3-3h2v-5l-3-3H19V7zM7 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm11 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
            </svg>
          </div>
          <div>
            <div className="text-[10.5px] font-bold text-[#ffdbce] leading-tight">
              Reel Maker arriving in 12 mins
            </div>
            <div className="text-[8.5px] text-[#ffb599]/85 font-medium">
              Verified Creator • iPhone 15 Pro Max
            </div>
          </div>
        </div>

        {/* Live Tracking Radar Dot */}
        <div className="relative flex items-center justify-center w-3 h-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6d29] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffdbce]" />
        </div>
      </div>

      {/* CSS-Only Map Placeholder (No images!) */}
      <div className="mt-3 relative w-full h-[165px] rounded-2xl overflow-hidden border border-[#ebdcd3] bg-[#f4ebe3] shadow-inner">
        {/* Subtle Map Grid Network */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, #d8c5b6 1px, transparent 1px), linear-gradient(to bottom, #d8c5b6 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* Abstract Street / Route Divs */}
        <div className="absolute top-1/4 -left-2 right-0 h-3 bg-[#e8ded3] rounded-full transform -rotate-3" />
        <div className="absolute top-0 bottom-0 left-1/3 w-3 bg-[#e8ded3] rounded-full transform rotate-6" />
        <div className="absolute bottom-6 left-0 right-0 h-3.5 bg-[#e8ded3] rounded-full transform rotate-1" />

        {/* Transit Dotted Route Line in Maroon Accent */}
        <div className="absolute top-[46%] left-[34%] w-[80px] h-[48px] border-b-2 border-r-2 border-dashed border-[#5c1d00] rounded-br-2xl pointer-events-none" />

        {/* Moving Creator Marker: Maroon Dot with Pulsing Ring */}
        <div className="absolute top-[42%] left-[32%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
          <span className="animate-pulse-ring absolute w-7 h-7 rounded-full bg-[#ff6d29]/30" />
          <span className="w-4 h-4 rounded-full bg-[#5c1d00] border-2 border-white shadow-md flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffdbce]" />
          </span>
          {/* Tooltip Pill */}
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#29170f] text-[#ffdbce] text-[7.5px] font-bold px-1.5 py-0.5 rounded shadow">
            Creator
          </span>
        </div>

        {/* Destination Location Marker */}
        <div className="absolute bottom-[28%] right-[22%] z-10 flex items-center justify-center">
          <span className="w-3.5 h-3.5 rounded-full bg-[#ff6d29] border-2 border-white shadow-md" />
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-[#29170f] text-[7px] font-bold px-1 rounded border border-[#ebdcd3]">
            Shoot Venue
          </span>
        </div>
      </div>

      {/* Start Shoot with PIN Section */}
      <div className="mt-3.5 p-3 rounded-2xl bg-white border border-[#ebdcd3] shadow-sm text-center">
        <div className="text-[11px] font-bold text-[#29170f] mb-2 tracking-tight">
          Start your shoot with PIN
        </div>

        {/* 4 Maroon Digit Boxes (4 3 0 5) with staggered sequential fade-in */}
        <div className="flex items-center justify-center gap-2">
          {['4', '3', '0', '5'].map((digit, idx) => (
            <div
              key={idx}
              className="pin-digit-seq w-8 h-9 rounded-lg bg-[#5c1d00] text-[#ffdbce] font-extrabold text-sm flex items-center justify-center shadow-md border border-[#7f2b00]/30 transition-transform hover:scale-105"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {digit}
            </div>
          ))}
        </div>

        <div className="text-[8.5px] text-[#7f2b00] font-medium mt-2">
          Share this code with your Reel Maker upon arrival
        </div>
      </div>
    </div>
  );
}
