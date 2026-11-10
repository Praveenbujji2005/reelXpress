'use client';

import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import { ROW_1_TESTIMONIALS, ROW_2_TESTIMONIALS } from '@/lib/data';
import { getTestimonials } from '@/lib/cmsServices';

/**
 * TestimonialsSection Component
 *
 * Full-width dual-row marquee displaying client reviews & ratings:
 * - Section label: "TESTIMONIALS" in accent color
 * - Heading: "Insights from Satisfied Clients"
 * - Subtext highlighting same-day professional reels
 * - Top Row: Scrolls LEFT (40s) with Testimonials 1, 3, 5
 * - Bottom Row: Scrolls RIGHT (50s) with Testimonials 2, 4, 6
 * - Infinite seamless loop with dual sibling tracks
 * - Pause on hover
 * - Edge fade masks
 * - Respects prefers-reduced-motion
 */
export default function TestimonialsSection() {
  const [row1, setRow1] = useState(ROW_1_TESTIMONIALS);
  const [row2, setRow2] = useState(ROW_2_TESTIMONIALS);

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        if (data && data.length > 0) {
          const active = data.filter((t) => t.enabled !== false);
          if (active.length > 0) {
            const mid = Math.ceil(active.length / 2);
            setRow1(active.slice(0, mid));
            setRow2(active.slice(mid).length > 0 ? active.slice(mid) : active.slice(0, mid));
          }
        }
      })
      .catch(() => {});
  }, []);

  // Multiply rows so tracks are wide enough for ultra-wide displays (4K+)
  const topRowList = [...row1, ...row1, ...row1];
  const bottomRowList = [...row2, ...row2, ...row2];

  return (
    <section
      className="py-16 md:py-space-2xl overflow-hidden relative select-none"
      id="testimonials"
      aria-label="Client Testimonials"
    >
      {/* Section Header */}
      <div className="reveal-on-scroll text-center max-w-3xl mx-auto mb-12 md:mb-16 px-6">
        <span className="text-primary text-label-md font-label-md uppercase tracking-wider block mb-2 font-bold">
          TESTIMONIALS
        </span>
        <h2 className="text-headline-lg font-headline-lg text-text-primary tracking-tight">
          Insights from Satisfied Clients
        </h2>
        <p className="text-body-md font-body-md text-text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
          Hear from our diverse community of clients who experienced the magic of instant video delivery. From weddings to business launches, see how we&apos;re revolutionizing event coverage with same-day professional reels.
        </p>
      </div>

      {/* Full-Width Dual-Row Marquee Container */}
      <div className="relative w-full overflow-hidden space-y-4 sm:space-y-6">
        {/* Edge Gradient Masks for Smooth Fade Out on Left & Right */}
        <div
          className="absolute left-0 inset-y-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 inset-y-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* =========================================================================
            ROW 1: Top Row scrolling continuously towards the LEFT (40s)
            Contains Testimonials 1, 3, 5
           ========================================================================= */}
        <div className="testimonials-marquee-row flex overflow-hidden w-full testimonials-mask-fade">
          {/* Primary Track */}
          <div className="animate-marquee-left flex items-stretch shrink-0 gap-4 sm:gap-6 pr-4 sm:pr-6">
            {topRowList.map((item, idx) => (
              <TestimonialCard
                key={`row1-primary-${item.id}-${idx}`}
                name={item.name}
                role={item.role}
                quote={item.quote || item.review}
                review={item.review || item.quote}
                rating={item.rating}
              />
            ))}
          </div>

          {/* Sibling Duplicate Track for Seamless Zero-Jump Loop */}
          <div
            className="animate-marquee-left flex items-stretch shrink-0 gap-4 sm:gap-6 pr-4 sm:pr-6"
            aria-hidden="true"
          >
            {topRowList.map((item, idx) => (
              <TestimonialCard
                key={`row1-dup-${item.id}-${idx}`}
                name={item.name}
                role={item.role}
                quote={item.quote || item.review}
                review={item.review || item.quote}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* =========================================================================
            ROW 2: Bottom Row scrolling continuously towards the RIGHT (50s)
            Contains Testimonials 2, 4, 6
           ========================================================================= */}
        <div className="testimonials-marquee-row flex overflow-hidden w-full testimonials-mask-fade">
          {/* Primary Track */}
          <div className="animate-marquee-right-slow flex items-stretch shrink-0 gap-4 sm:gap-6 pr-4 sm:pr-6">
            {bottomRowList.map((item, idx) => (
              <TestimonialCard
                key={`row2-primary-${item.id}-${idx}`}
                name={item.name}
                role={item.role}
                quote={item.quote || item.review}
                review={item.review || item.quote}
                rating={item.rating}
              />
            ))}
          </div>

          {/* Sibling Duplicate Track for Seamless Zero-Jump Loop */}
          <div
            className="animate-marquee-right-slow flex items-stretch shrink-0 gap-4 sm:gap-6 pr-4 sm:pr-6"
            aria-hidden="true"
          >
            {bottomRowList.map((item, idx) => (
              <TestimonialCard
                key={`row2-dup-${item.id}-${idx}`}
                name={item.name}
                role={item.role}
                quote={item.quote || item.review}
                review={item.review || item.quote}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
