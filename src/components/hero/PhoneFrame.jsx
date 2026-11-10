'use client';

import React from 'react';
import PhoneLogoScreen from './PhoneLogoScreen';

/**
 * PhoneFrame Component
 *
 * High-fidelity pure HTML/CSS smartphone outer element:
 * - Rounded rectangle (~46px-52px radius) with dark titanium/space-black bezel
 * - Outer metallic edge highlight and soft drop shadow
 * - Physical hardware side buttons: Action button, Volume up/down on left, Power on right
 * - Top speaker ear-piece micro-slit
 * - Dynamic Island pill at top center with camera lens & sensor reflection
 * - Status bar: "9:41", Dynamic Island, Cellular signal, 5G, Battery indicator
 * - Bottom iOS home indicator bar
 * - Displays ReelXpress logo screen by default
 */
export default function PhoneFrame({
  children,
  className = '',
  width = 'w-[280px] sm:w-[310px] md:w-[330px]',
  height = 'h-[540px] sm:h-[590px] md:h-[630px]',
  ariaLabel = 'ReelXpress Mobile Showcase',
}) {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={`relative ${width} ${height} rounded-[48px] sm:rounded-[54px] p-[10px] sm:p-[12px] bg-gradient-to-b from-[#322835] via-[#161217] to-[#251e24] border-2 border-[#483a4c] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_3px_rgba(255,255,255,0.35)] select-none shrink-0 ${className}`}
    >
      {/* Outer Subtle Metallic Highlight Edge */}
      <div className="absolute inset-0 rounded-[48px] sm:rounded-[54px] pointer-events-none ring-1 ring-white/10" />

      {/* Hardware Buttons - Left Side */}
      {/* Action Button */}
      <div
        className="absolute -left-[5px] top-24 w-[4px] h-6 rounded-l-sm bg-[#3a303e] border-y border-l border-[#5a4861] shadow-sm pointer-events-none"
        aria-hidden="true"
      />
      {/* Volume Up */}
      <div
        className="absolute -left-[5px] top-36 w-[4px] h-12 rounded-l-sm bg-[#3a303e] border-y border-l border-[#5a4861] shadow-sm pointer-events-none"
        aria-hidden="true"
      />
      {/* Volume Down */}
      <div
        className="absolute -left-[5px] top-52 w-[4px] h-12 rounded-l-sm bg-[#3a303e] border-y border-l border-[#5a4861] shadow-sm pointer-events-none"
        aria-hidden="true"
      />

      {/* Hardware Button - Right Side (Power / Lock) */}
      <div
        className="absolute -right-[5px] top-36 w-[4px] h-16 rounded-r-sm bg-[#3a303e] border-y border-r border-[#5a4861] shadow-sm pointer-events-none"
        aria-hidden="true"
      />

      {/* Screen Container */}
      <div className="relative w-full h-full rounded-[38px] sm:rounded-[44px] overflow-hidden bg-[#0c0a0e] text-white flex flex-col shadow-inner border border-white/5">
        {/* Top Speaker Micro-Slit */}
        <div
          className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-[3px] rounded-full bg-[#1e1722] border border-white/5 pointer-events-none z-40"
          aria-hidden="true"
        />

        {/* Status Bar: Time, Dynamic Island, Signal & Battery */}
        <div className="relative z-30 pt-3 px-5 pb-1 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-white/90 shrink-0">
          {/* Time */}
          <span className="font-bold tracking-tight text-white select-none">9:41</span>

          {/* Dynamic Island Pill */}
          <div className="w-[84px] sm:w-[92px] h-[22px] sm:h-[24px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-sm border border-black/40">
            {/* Camera lens glint reflection */}
            <span className="w-2.5 h-2.5 rounded-full bg-[#18181c] border border-[#2b2b35] flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-[#0d2a4a]/80" />
            </span>
            {/* Proximity / Light sensor */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#141418]" />
          </div>

          {/* Status Icons: Cellular, 5G, Battery */}
          <div className="flex items-center gap-1.5 text-white/90 select-none">
            {/* Cellular Bars */}
            <svg className="w-3.5 h-3 fill-current" viewBox="0 0 16 12">
              <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
              <rect x="4" y="5" width="2.5" height="7" rx="0.5" />
              <rect x="8" y="2.5" width="2.5" height="9.5" rx="0.5" />
              <rect x="12" y="0" width="2.5" height="12" rx="0.5" />
            </svg>

            {/* 5G Label */}
            <span className="text-[10px] font-bold text-white/80 tracking-tighter">5G</span>

            {/* Battery Indicator */}
            <div className="w-5 h-2.5 rounded-[3px] border border-white/70 p-[1px] flex items-center relative">
              <div className="w-3 h-full bg-white rounded-[1px]" />
              <span className="absolute -right-1 top-0.5 w-[1.5px] h-1.5 bg-white/70 rounded-r-[1px]" />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="relative flex-1 flex flex-col overflow-hidden">
          {children || <PhoneLogoScreen />}
        </div>

        {/* Bottom iOS Home Indicator Bar */}
        <div className="relative z-30 pt-1 pb-2.5 flex items-center justify-center shrink-0 pointer-events-none">
          <div className="w-28 sm:w-32 h-1 rounded-full bg-white/35 shadow-sm" />
        </div>
      </div>
    </div>
  );
}
