'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Smooth scrolling provider using Lenis for an inertia-style fluid scrolling experience.
 *
 * CRITICAL FIXES FOR IPHONE SAFARI & MOBILE FREEZING:
 * 1. Sets history.scrollRestoration = 'manual' to prevent mobile Safari from restoring scroll
 *    before layout and images have calculated heights.
 * 2. Clears any stuck document.body overflow styles on mount/unmount.
 * 3. Listens to window 'load' event to recalculate Lenis scroll dimensions after all images load.
 * 4. Disables smoothWheel hijacking on touch devices so native iOS momentum scrolling remains untouched.
 * 5. Handles sticky header offset adjustments when clicking internal anchor links (#pricing, #showcase, etc.)
 */
export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Enforce manual scroll restoration so browser does not jump before DOM hydrates
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      try {
        window.history.scrollRestoration = 'manual';
      } catch {}
    }

    // Safety clear any stuck body scroll-locks on initial mount (unless full-screen loader is active)
    if (typeof document !== 'undefined' && !document.getElementById('reelxpress-pro-loader')) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // 2. Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    // 3. Initialize Lenis instance with safe touch options
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // NEVER hijack native touch scrolling on iOS/Android
      touchMultiplier: 1.0,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // 4. Connect Lenis to requestAnimationFrame loop
    let rafId;
    let isRunning = true;
    function raf(time) {
      if (!isRunning) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 5. Refresh Lenis height calculations after window fully loads and after resize
    const handleWindowLoad = () => {
      lenis.resize();
    };
    window.addEventListener('load', handleWindowLoad);
    window.addEventListener('resize', handleWindowLoad, { passive: true });

    // Fallback resize triggers to handle deferred font and image rendering
    const timer1 = setTimeout(() => lenis.resize(), 500);
    const timer2 = setTimeout(() => lenis.resize(), 1500);

    // 6. Intercept in-page hash anchor clicks (#pricing, #showcase, etc.)
    function handleAnchorClick(e) {
      const link = e.target.closest('a[href*="#"]');
      if (!link) return;

      const rawHref = link.getAttribute('href');
      if (!rawHref) return;

      let hash = '';
      if (rawHref.startsWith('#')) {
        hash = rawHref;
      } else if (
        rawHref.startsWith('/#') &&
        (typeof window !== 'undefined' &&
          (window.location.pathname === '/' || window.location.pathname === ''))
      ) {
        hash = rawHref.substring(1);
      }

      if (!hash || hash === '#') return;

      try {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          e.preventDefault();
          const header = document.querySelector('header');
          const headerOffset = header ? header.offsetHeight + 24 : 88;

          lenis.scrollTo(targetElement, {
            offset: -headerOffset,
            duration: 1.2,
          });

          if (window.history.pushState) {
            window.history.pushState(null, '', hash);
          }
        }
      } catch {}
    }

    document.addEventListener('click', handleAnchorClick);

    return () => {
      isRunning = false;
      clearTimeout(timer1);
      clearTimeout(timer2);
      cancelAnimationFrame(rafId);
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('resize', handleWindowLoad);
      document.removeEventListener('click', handleAnchorClick);
      try {
        lenis.destroy();
      } catch {}
      window.lenis = null;
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, []);

  return <>{children}</>;
}
