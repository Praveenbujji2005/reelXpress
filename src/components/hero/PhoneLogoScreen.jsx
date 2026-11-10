'use client';

import React from 'react';

/**
 * PhoneLogoScreen Component
 *
 * Screen content inside the Hero Phone element:
 * - Ultra-crisp OLED dark display (#0c0a0e)
 * - Ambient warm amber radial glow halo
 * - Official ReelXpress brand logo with luminous amber drop-shadow
 * - Live status badge ("● LIVE IN BENGALURU")
 * - Tagline ("Shoot • Edit • Deliver")
 * - Instant delivery micro-chip
 */
export default function PhoneLogoScreen() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-4 py-4 sm:py-6 select-none overflow-hidden bg-gradient-to-b from-[#0b080d] via-[#140f16] to-[#09070b]">
      {/* Ambient Warm Radial Glow Halo Behind Logo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 sm:w-64 h-52 sm:h-64 rounded-full bg-gradient-to-br from-[#ff6d29]/30 via-[#5c1d00]/20 to-transparent blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Grid Background Pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] pointer-events-none opacity-40"
        aria-hidden="true"
      />

      {/* Top Status Badge */}
      <div className="relative z-10 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-[10px] sm:text-[11px] font-bold text-[#ff8f50] uppercase tracking-[0.2em] shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722] animate-pulse" />
          <span>LIVE IN BENGALURU</span>
        </div>
      </div>

      {/* Centerpiece: ReelXpress Logo with Ambient Luminous Glow */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto px-2">
        {/* Subtle Ambient Behind-Logo Flare */}
        <div className="relative group">
          <div className="absolute -inset-4 rounded-3xl bg-[#ff6d29]/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <img
            src="/brand/reelxpress-stacked-logo.png"
            alt="ReelXpress Brand Logo"
            width={1488}
            height={625}
            className="relative w-48 sm:w-56 max-w-[88%] mx-auto h-auto object-contain drop-shadow-[0_0_30px_rgba(255,109,41,0.55)] transition-transform duration-300 hover:scale-105 pointer-events-none"
            loading="eager"
          />
        </div>

        {/* Tagline & Slogan */}
        <div className="mt-5 text-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/80">
            Shoot <span className="text-[#ff6d29] mx-1">•</span> Edit{' '}
            <span className="text-[#ff6d29] mx-1">•</span> Deliver
          </p>
          <p className="text-[10px] text-white/50 tracking-wider mt-1 font-medium">
            Bengaluru&apos;s 1st Quick Content Service
          </p>
        </div>

        {/* Micro Feature Chip */}
        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/30 text-primary-container text-[10px] font-bold tracking-wider shadow-sm">
          <span className="material-symbols-outlined text-xs">bolt</span>
          <span>REELS IN MINUTES</span>
        </div>
      </div>

      {/* Bottom Subtle Pill */}
      <div className="relative z-10 pb-1">
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-semibold">
          Shot on Latest iPhone Gear
        </span>
      </div>
    </div>
  );
}
