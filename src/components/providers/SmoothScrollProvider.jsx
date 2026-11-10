'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Smooth scrolling provider using Lenis for an inertia-style fluid scrolling experience.
// Handles sticky header offset adjustments when clicking internal anchor links (#pricing, #services, etc.)
export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis instance
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // Keep native touch scrolling on mobile for buttery responsiveness
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Connect Lenis to requestAnimationFrame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept in-page hash anchor clicks (#services, /#pricing, etc.) to scroll with header offset
    function handleAnchorClick(e) {
      const link = e.target.closest('a[href*="#"]');
      if (!link) return;

      const rawHref = link.getAttribute('href');
      if (!rawHref) return;

      // Determine the target hash
      let hash = '';
      if (rawHref.startsWith('#')) {
        hash = rawHref;
      } else if (
        rawHref.startsWith('/#') &&
        (typeof window !== 'undefined' &&
          (window.location.pathname === '/' || window.location.pathname === ''))
      ) {
        hash = rawHref.substring(1); // e.g. "/#pricing" -> "#pricing"
      }

      if (!hash || hash === '#') return;

      const targetElement = document.querySelector(hash);
      if (targetElement) {
        e.preventDefault();
        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight + 24 : 88;

        lenis.scrollTo(targetElement, {
          offset: -headerOffset,
          duration: 1.2,
        });

        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, '', hash);
        }
      }
    }

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
