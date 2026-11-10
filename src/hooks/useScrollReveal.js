'use client';

import { useEffect } from 'react';

// Observes elements with .reveal-on-scroll or .reveal-scale-on-scroll
// and smoothly triggers their reveal animation as the user scrolls down the page.
export function useScrollReveal() {
  useEffect(() => {
    // Flag the document so CSS transitions take effect without layout flash
    document.documentElement.classList.add('js-ready');

    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-scale-on-scroll');

    if (!revealElements.length) return;

    // Use IntersectionObserver for high performance scroll tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            entry.target.setAttribute('data-revealed', 'true');
            // Unobserve once revealed so animation runs only once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => {
      // Hero elements should immediately appear without waiting
      if (el.closest('#hero') || el.closest('#showcase')) {
        el.classList.add('is-revealed');
        el.setAttribute('data-revealed', 'true');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
