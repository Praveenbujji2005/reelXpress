'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FAQItem from './FAQItem';
import { FAQ_DATA } from '@/lib/data';
import { getFaqs } from '@/lib/cmsServices';

/**
 * FaqSection Component (Redesigned & Database-Connected)
 *
 * Modern two-column FAQ layout:
 * - Left column: sticky & vertically aligned on desktop with section label,
 *   3-line headline, descriptive subtext, and dual pill action buttons.
 * - Right column: vertical stack of dynamic accordion items with smooth expansion,
 *   fetching from database with fallback, plus expandable 'View all questions' trigger.
 * - Accordion style: soft warm beige/cream background, subtle border, rounded-xl corners (12px),
 *   dark question text, '+' rotating to '×', and smooth CSS Grid expand/collapse.
 * - State: interactive expand/collapse toggle with smooth transitions.
 */
export default function FaqSection() {
  const [faqs, setFaqs] = useState(FAQ_DATA);
  const [openIndex, setOpenIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadFaqs() {
      try {
        const res = await fetch('/api/cms?type=faqs');
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.data) && data.data.length > 0) {
          const active = data.data.filter((f) => f.enabled !== false);
          if (active.length > 0) {
            setFaqs(active);
            return;
          }
        }
      } catch {
        // Fallback to cmsServices
      }

      try {
        const cmsData = await getFaqs();
        if (isMounted && cmsData && cmsData.length > 0) {
          const active = cmsData.filter((f) => f.enabled !== false);
          if (active.length > 0) {
            setFaqs(active);
          }
        }
      } catch {}
    }

    loadFaqs();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 6);

  return (
    <section
      className="py-16 md:py-space-2xl px-6 md:px-margin max-w-[1440px] mx-auto relative select-none"
      id="faq"
      aria-label="Frequently Asked Questions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start">
        {/* =========================================================================
            LEFT COLUMN (Sticky on desktop)
           ========================================================================= */}
        <div className="reveal-on-scroll lg:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-6">
          <span className="text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.2em] block">
            FAQs
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-text-primary tracking-tight leading-[1.14]">
            Answers to<br className="hidden sm:inline" />
            {' '}Your Most Common<br className="hidden sm:inline" />
            {' '}Questions
          </h2>

          <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-md">
            Explore our FAQ section to find clear and concise answers to common queries about our services, processes, and more.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href="#booking"
              className="inline-flex items-center justify-between sm:justify-center gap-3 px-6 py-3.5 rounded-full bg-surface-container-high hover:bg-surface-bright text-white font-semibold text-sm border border-border-specular hover:border-border-amber transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(255,109,41,0.25)] group cursor-pointer"
            >
              <span>Book your event now</span>
              <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-primary-container text-white flex items-center justify-center transition-colors shrink-0">
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>

            <Link
              href="/creators"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-transparent hover:bg-white/5 text-text-primary font-semibold text-sm border border-border-specular hover:border-white/30 transition-all duration-200 cursor-pointer text-center"
            >
              Become a creator
            </Link>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (Accordion List with ~12px gap)
           ========================================================================= */}
        <div className="reveal-on-scroll lg:col-span-7 flex flex-col gap-3">
          {displayedFaqs.map((faq, idx) => (
            <FAQItem
              key={faq.id || idx}
              index={idx}
              faq={faq}
              isOpen={openIndex === idx}
              onToggle={() => toggleFaq(idx)}
            />
          ))}

          {/* Below list: Expand / Collapse Toggle if more than 6 FAQs */}
          {faqs.length > 6 && (
            <div className="pt-2 sm:pt-3">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-glass border border-border-specular hover:border-border-amber text-primary hover:text-primary-container font-semibold text-sm transition-all duration-200 shadow-sm cursor-pointer"
              >
                <span>{showAll ? 'Show fewer questions' : `View all ${faqs.length} Questions`}</span>
                <span className="material-symbols-outlined text-base transition-transform duration-200">
                  {showAll ? 'expand_less' : 'expand_more'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
