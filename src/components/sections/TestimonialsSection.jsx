'use client';

import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import { ROW_1_TESTIMONIALS, ROW_2_TESTIMONIALS } from '@/lib/data';
import { getTestimonials, getCachedTestimonials } from '@/lib/cmsServices';

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
// SKELETON PLACEHOLDER FOR TESTIMONIAL CARDS
function TestimonialCardSkeleton() {
  return (
    <div className="w-[260px] xs:w-[280px] sm:w-[304px] md:w-[323px] h-[200px] rounded-2xl p-4 sm:p-5 md:p-6 bg-[#161217] border border-white/10 flex flex-col justify-between ambient-skeleton shrink-0 shadow-lg">
      <div>
        <div className="flex gap-1.5 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={`skel-star-${s}`} className="w-3.5 h-3.5 rounded-full bg-white/10 ambient-pulse" />
          ))}
        </div>
        <div className="w-full h-3.5 rounded bg-white/10 mb-2 ambient-pulse" />
        <div className="w-5/6 h-3.5 rounded bg-white/10 mb-2 ambient-pulse" />
        <div className="w-3/5 h-3.5 rounded bg-white/5 ambient-pulse" />
      </div>
      <div className="flex items-center gap-3 pt-3 border-t border-white/5">
        <div className="w-10 h-10 rounded-full bg-white/10 shrink-0 ambient-pulse" />
        <div className="flex-1 space-y-1.5">
          <div className="w-28 h-3.5 rounded bg-white/10 ambient-pulse" />
          <div className="w-20 h-3 rounded bg-white/5 ambient-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [row1, setRow1] = useState(ROW_1_TESTIMONIALS);
  const [row2, setRow2] = useState(ROW_2_TESTIMONIALS);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // 1. Instant check from cache for 0ms initial render
    const cached = getCachedTestimonials();
    if (cached && cached.length > 0) {
      const active = cached.filter((t) => t.enabled !== false);
      if (active.length > 0) {
        const mid = Math.ceil(active.length / 2);
        setRow1(active.slice(0, mid));
        setRow2(active.slice(mid).length > 0 ? active.slice(mid) : active.slice(0, mid));
        setIsLoading(false);
      }
    }

    // 2. Fetch fresh testimonials in background
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
      .finally(() => {
        setIsLoading(false);
      });

    // 3. React to live Admin updates
    const handleCmsUpdate = (e) => {
      if (!e.detail?.type || e.detail.type === 'testimonials') {
        getTestimonials({ forceRefresh: true }).then((data) => {
          if (data && data.length > 0) {
            const active = data.filter((t) => t.enabled !== false);
            if (active.length > 0) {
              const mid = Math.ceil(active.length / 2);
              setRow1(active.slice(0, mid));
              setRow2(active.slice(mid).length > 0 ? active.slice(mid) : active.slice(0, mid));
            }
          }
        });
      }
    };
    window.addEventListener('cms-cache-invalidated', handleCmsUpdate);
    return () => window.removeEventListener('cms-cache-invalidated', handleCmsUpdate);
  }, []);

  // Pause animations when browser tab is inactive to preserve battery & CPU
  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Use minimal duplication (2x per track) to maintain a seamless CSS infinite loop while minimizing DOM node count
  const topRowList = row1.length <= 3 ? [...row1, ...row1] : row1;
  const bottomRowList = row2.length <= 3 ? [...row2, ...row2] : row2;

  return (
    <section
      className="py-16 md:py-space-2xl overflow-hidden relative select-none scroll-mt-20 md:scroll-mt-28"
      id="testimonials"
      aria-label="Client Testimonials"
    >
      {/* Section Header */}
      <div className="reveal-on-scroll text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4 sm:px-6">
        <span className="text-primary text-label-md font-label-md uppercase tracking-wider block mb-2 font-bold">
          TESTIMONIALS
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-headline-lg font-headline-lg text-text-primary tracking-tight">
          Insights from Satisfied Clients
        </h2>
        <p className="text-body-md font-body-md text-text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
          Hear from our diverse community of clients who experienced the magic of instant video delivery. From weddings to business launches, see how we&apos;re revolutionizing event coverage with same-day professional reels.
        </p>
      </div>

      {/* Full-Width Dual-Row Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Edge Gradient Masks for Smooth Fade Out on Left & Right */}
        <div
          className="absolute left-0 inset-y-0 w-8 sm:w-24 md:w-40 bg-gradient-to-r from-background via-background/70 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 inset-y-0 w-8 sm:w-24 md:w-40 bg-gradient-to-l from-background via-background/70 to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />

        {isLoading ? (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex gap-4 sm:gap-6 overflow-hidden">
              {[1, 2, 3, 4].map((n) => (
                <TestimonialCardSkeleton key={`skel-row1-${n}`} />
              ))}
            </div>
            <div className="flex gap-4 sm:gap-6 overflow-hidden">
              {[5, 6, 7, 8].map((n) => (
                <TestimonialCardSkeleton key={`skel-row2-${n}`} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 fade-in-content">
            {/* =========================================================================
                ROW 1: Top Row scrolling continuously towards the LEFT (40s)
                Contains Testimonials 1, 3, 5
               ========================================================================= */}
            <div className="testimonials-marquee-row flex overflow-hidden w-full testimonials-mask-fade">
              {/* Primary Track */}
              <div
                className="animate-marquee-left flex items-stretch shrink-0 gap-4 sm:gap-6 pr-4 sm:pr-6"
                style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
              >
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
                style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
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
              <div
                className="animate-marquee-right-slow flex items-stretch shrink-0 gap-4 sm:gap-6 pr-4 sm:pr-6"
                style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
              >
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
                style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
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
        )}
      </div>
    </section>
  );
}
