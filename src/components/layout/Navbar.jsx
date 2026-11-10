'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QuickContactModal from '@/components/ui/QuickContactModal';

/**
 * Redesigned Navbar Component
 *
 * Modeled exactly after the user's reference design:
 * - Tiny & small compact pill footprint (w-fit mx-auto)
 * - Glassmorphism removed: 100% solid matte dark pill background with crisp border
 * - Home removed from navigation
 * - Left links: Pricing, Services
 * - Center: Official new orange 'X' logo mark + reelXpress typography
 * - Right links: Real work, Contact
 * - Mobile responsive: perfectly centered logo with compact hamburger drawer trigger
 */
export default function Navbar({ onOpenMobileMenu }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Listen for global custom events to open the contact modal
  useEffect(() => {
    const handleOpen = () => setIsContactModalOpen(true);
    window.addEventListener('open-contact-modal', handleOpen);
    return () => window.removeEventListener('open-contact-modal', handleOpen);
  }, []);

  return (
    <>
      <header className="sticky top-3 sm:top-4 z-50 px-3 w-full flex justify-center pointer-events-none">
        <div
          className="pointer-events-auto rounded-full px-5 sm:px-7 py-2 sm:py-2.5 flex items-center justify-between gap-5 sm:gap-8 bg-[#161217] border border-[#2b2430] shadow-[0_10px_35px_rgba(0,0,0,0.7)] select-none transition-all duration-200"
          role="navigation"
          aria-label="Main Navigation"
        >
          {/* =====================================================================
              LEFT WING: Desktop Links (Pricing, Services) / Mobile Spacer
             ===================================================================== */}
          <div className="flex items-center">
            {/* Desktop Left Nav Links */}
            <nav className="hidden md:flex items-center gap-6 sm:gap-7 text-xs sm:text-[13px] font-semibold text-white/70">
              <Link
                href="/#pricing"
                className="hover:text-white transition-colors py-0.5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-container hover:after:w-full after:transition-all after:duration-200"
              >
                Pricing
              </Link>
              <Link
                href="/reelxpress"
                className="hover:text-white transition-colors py-0.5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-container hover:after:w-full after:transition-all after:duration-200"
              >
                ReelXpress
              </Link>
            </nav>

            {/* Mobile Left Spacer to keep center logo balanced on phone screens */}
            <div className="w-11 h-11 sm:w-8 sm:h-8 min-w-[44px] min-h-[44px] md:hidden opacity-0 pointer-events-none shrink-0" aria-hidden="true" />
          </div>

          {/* =====================================================================
              CENTER: New Orange 'X' Logo Mark Only (No Text)
             ===================================================================== */}
          <div className="shrink-0 flex items-center justify-center px-1 sm:px-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center group select-none py-1 min-w-[44px] min-h-[44px] transition-transform duration-200 hover:scale-[1.08]"
              aria-label="reelXpress Home"
            >
              <img
                src="/brand/reelxpress-x-logo.png"
                alt="reelXpress Mark"
                width={26}
                height={36}
                className="w-5 sm:w-6 h-auto object-contain drop-shadow-[0_0_10px_rgba(255,109,41,0.55)] transition-transform duration-200 group-hover:scale-110"
              />
            </Link>
          </div>

          {/* =====================================================================
              RIGHT WING: Desktop Links (Real work, Contact) / Mobile Hamburger
             ===================================================================== */}
          <div className="flex items-center">
            {/* Desktop Right Nav Links */}
            <nav className="hidden md:flex items-center gap-6 sm:gap-7 text-xs sm:text-[13px] font-semibold text-white/70">
              <Link
                href="/#showcase"
                className="hover:text-white transition-colors py-0.5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-container hover:after:w-full after:transition-all after:duration-200"
              >
                Real work
              </Link>
              <Link
                href="/#booking"
                className="hover:text-white transition-colors py-0.5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-container hover:after:w-full after:transition-all after:duration-200"
              >
                Contact
              </Link>
            </nav>

            {/* Mobile Hamburger Drawer Trigger (Comfortable min 44x44px touch target) */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              aria-label="Open Navigation Menu"
              className="md:hidden flex items-center justify-center w-11 h-11 sm:w-8 sm:h-8 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white active:scale-90 transition-all cursor-pointer shrink-0 touch-manipulation"
            >
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Quick Contact Form Modal */}
      <QuickContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
