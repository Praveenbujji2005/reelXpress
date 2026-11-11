'use client';

import React from 'react';

/**
 * Helper to highlight the brand 'X' in 'reelXpress' if present in question/answer text.
 */
function renderBrandText(text) {
  if (!text || typeof text !== 'string') return text;
  if (!text.includes('reelXpress')) return text;

  return text.split('reelXpress').map((chunk, i, arr) => (
    <React.Fragment key={i}>
      {chunk}
      {i < arr.length - 1 && (
        <span className="font-semibold text-inherit">
          reel<span className="text-primary-container font-extrabold">X</span>press
        </span>
      )}
    </React.Fragment>
  ));
}

/**
 * FAQItem Component
 *
 * Individual FAQ accordion item styled with:
 * - Soft warm beige/cream background derived from theme tokens (#f8f1ec / #faf4ee)
 * - Thin subtle border (#ebded5) & ~12px rounded corners (rounded-xl)
 * - Soft shadow, hover brightening, and subtle lift
 * - Small, medium-weight dark question text
 * - Circular icon button rotating 45° between '+' and '×'
 * - Smooth CSS Grid height transition (0fr -> 1fr) with slight upward slide for answer
 * - Strict WAI-ARIA accessibility (button, aria-expanded, aria-controls, role="region", aria-labelledby)
 */
export default function FAQItem({ faq, isOpen, onToggle, index }) {
  const triggerId = `faq-trigger-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div
      className={`group rounded-xl border transition-all duration-200 motion-reduce:transition-none motion-reduce:transform-none ${
        isOpen
          ? 'bg-[#faf4ee] border-[#dfc4b5] shadow-[0_4px_16px_rgba(41,23,15,0.07)]'
          : 'bg-[#f8f1ec] border-[#ebded5] shadow-[0_2px_8px_rgba(41,23,15,0.04)] hover:bg-[#fffcf9] hover:border-[#dfc4b5] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(41,23,15,0.06)]'
      } p-3.5 sm:p-4.5`}
    >
      {/* Question Trigger Button */}
      <button
        type="button"
        id={triggerId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-3 text-left cursor-pointer select-none rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f1ec]"
      >
        <span className="text-xs sm:text-sm font-medium text-[#29170f] leading-snug pr-2">
          {renderBrandText(faq.question || faq.q || '')}
        </span>

        {/* Small circular icon button: '+' when closed, rotates 45° to '×' when open */}
        <span
          className={`faq-icon-btn w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[#29170f] flex items-center justify-center shrink-0 transition-all duration-300 ease-out motion-reduce:transition-none ${
            isOpen ? 'rotate-45 bg-[#e3cdbf]' : 'rotate-0 bg-[#eddcd2] group-hover:bg-[#e4d2c7]'
          }`}
          aria-hidden="true"
        >
          <svg
            className="w-3.5 h-3.5 stroke-[2.2] stroke-current"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M8 3v10M3 8h10" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Answer Region: Smooth CSS Grid expand/collapse */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        data-state={isOpen ? 'open' : 'closed'}
        className={`faq-accordion-grid grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`faq-answer-content pt-2.5 sm:pt-3 text-xs sm:text-[13.5px] text-[#594238] leading-relaxed transition-all duration-300 motion-reduce:transition-none ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'
            }`}
          >
            {renderBrandText(faq.answer || faq.a || '')}
          </div>
        </div>
      </div>
    </div>
  );
}
