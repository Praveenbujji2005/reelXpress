'use client';

import React from 'react';

// Star path for crisp SVG rendering matching the project's accent color
const STAR_PATH =
  'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';

/**
 * TestimonialCard Component
 *
 * Glassmorphic testimonial review card matching ReelXpress design system:
 * - Fixed width (~340px, responsive on mobile)
 * - Semi-transparent background with subtle border & backdrop blur
 * - 5-star rating in the brand accent color (#ff6d29)
 * - Quote text in bold white
 * - Name in bold, role in smaller accent-colored text beneath
 * - Subtle hover lift & amber glow
 */
export default function TestimonialCard({ name, role, quote, review, rating = 5 }) {
  const displayText = (quote || review || '').trim();

  return (
    <article
      className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 rounded-2xl bg-surface-glass border border-border-specular backdrop-blur-xl p-5 sm:p-6 md:p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 hover:border-border-amber hover:shadow-[0_12px_35px_rgba(255,109,41,0.22)] cursor-default select-none"
    >
      <div>
        {/* 5-Star Rating in Brand Accent Color */}
        <div
          className="flex items-center gap-1 text-primary-container mb-4 group-hover:scale-105 transition-transform duration-200 origin-left"
          aria-label={`${rating} out of 5 stars`}
        >
          {[...Array(Math.max(1, Math.min(5, Number(rating) || 5)))].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 fill-[#ff6d29] text-[#ff6d29] drop-shadow-[0_0_6px_rgba(255,109,41,0.35)]"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d={STAR_PATH} />
            </svg>
          ))}
        </div>

        {/* Quote in Bold White Text */}
        <p className="text-text-primary font-bold text-sm sm:text-[15px] md:text-base leading-relaxed mb-6">
          &ldquo;{displayText}&rdquo;
        </p>
      </div>

      {/* Author Details: Name in bold, Role in smaller accent color */}
      <div className="pt-4 border-t border-border-specular/40 flex items-center justify-between gap-3">
        <div>
          <div className="text-text-primary font-bold text-sm sm:text-base leading-snug">
            {name}
          </div>
          <div className="text-primary text-xs sm:text-sm font-medium leading-snug mt-0.5">
            {role}
          </div>
        </div>

        {/* Quote mark glyph pill */}
        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary-container border border-border-specular/40 shrink-0">
          <svg className="w-3.5 h-3.5 fill-[#ff6d29]" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>
        </div>
      </div>
    </article>
  );
}
