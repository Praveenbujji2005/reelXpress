'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/data';

// Slide-down mobile navigation drawer with backdrop, scroll-lock and high-contrast touch targets
export default function MobileMenu({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleLinkClick = (href) => {
    onClose();
    if (href.startsWith('/#') && typeof window !== 'undefined') {
      const hash = href.substring(1);
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        setTimeout(() => {
          if (window.lenis) {
            const header = document.querySelector('header');
            const headerOffset = header ? header.offsetHeight + 24 : 88;
            window.lenis.scrollTo(targetElement, { offset: -headerOffset, duration: 1.2 });
          } else {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  };

  if (!mounted) return null;

  const content = (
    <>
      {/* Dimmed backdrop positioned above all floating widgets */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100020] bg-black/75 backdrop-blur-md md:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-menu-drawer"
        data-lenis-prevent
        className={`fixed inset-x-0 top-0 z-[100025] p-3 sm:p-4 max-h-[92vh] max-h-[92dvh] overflow-y-auto transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="rounded-3xl bg-surface-deep/98 border border-border-amber backdrop-blur-2xl p-5 sm:p-6 shadow-2xl space-y-4">
          
          <div className="flex items-center justify-between pb-3 border-b border-border-specular">
            <Link
              href="/"
              onClick={() => handleLinkClick('/')}
              className="flex items-center min-h-[44px]"
              aria-label="reelXpress Home"
            >
              <img
                src="/brand/reelxpress-nav-logo.png"
                alt="reelXpress Logo"
                className="h-7 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,109,41,0.4)]"
              />
            </Link>
            {/* 44x44px touch target close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Menu"
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-surface-container border border-border-specular flex items-center justify-center text-text-muted hover:text-text-primary active:scale-90 cursor-pointer touch-manipulation"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-title-md font-bold text-text-primary hover:text-primary-container active:bg-white/5 rounded-xl px-2 py-3 border-b border-border-specular/40 flex items-center justify-between min-h-[48px] touch-manipulation"
              >
                <span>{link.label}</span>
                <span className="material-symbols-outlined text-sm text-text-muted">arrow_forward_ios</span>
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                onClose();
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-contact-modal'));
                }
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-primary-container text-white font-bold text-title-md shadow-[0_0_25px_rgba(255,109,41,0.5)] mt-3 cursor-pointer min-h-[50px] touch-manipulation active:scale-95 transition-transform"
            >
              <span>Book Now</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );

  return createPortal(content, document.body);
}
