import Link from 'next/link';
import { FOOTER_NAV_LINKS, FOOTER_LEGAL_LINKS } from '@/lib/data';

// Shared website footer with branding, internal navigation, legal links, and copyright
export default function Footer() {
  return (
    <footer className="bg-surface-deep text-primary full-width border-t border-border-specular">
      <div className="w-full px-6 md:px-margin max-w-[1440px] mx-auto py-space-2xl flex flex-col justify-between gap-space-xl">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="max-w-md">
            <Link href="/reelxpress" className="inline-flex items-center gap-3 mb-4 group" aria-label="reelXpress">
              <img
                src="/brand/reelxpress-wordmark-white-hd.png"
                alt="reelXpress"
                className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_0_16px_rgba(255,109,41,0.4)] transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-body-sm font-body-sm text-text-muted leading-relaxed mb-6">
              The intersection of speed and cinema. On-demand video production for the modern era.
            </p>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/#booking"
                className="btn-shine-sweep btn-ripple inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container text-text-primary font-bold text-label-md shadow-[0_0_20px_rgba(255,109,41,0.4)] hover:scale-[1.03] active:scale-95 transition-all cursor-pointer"
              >
                <span>Book a Creator</span>
                <span className="material-symbols-outlined text-sm">bolt</span>
              </Link>
              <Link
                href="/creators"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-specular text-text-primary font-semibold text-label-md hover:border-border-amber transition-all cursor-pointer"
              >
                <span>Become a Partner</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Navigation & Legal Links Columns */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-14">
            {/* Navigation Column */}
            <div>
              <div className="text-label-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                <span>Navigation</span>
              </div>
              <div className="flex flex-col gap-2.5 text-body-sm">
                {FOOTER_NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors flex items-center gap-1 group py-0.5"
                  >
                    <span className="material-symbols-outlined text-xs text-text-muted/40 group-hover:text-primary transition-colors">
                      chevron_right
                    </span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect / Legal Links Column */}
            <div>
              <div className="text-label-sm font-bold text-text-primary uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                <span>Connect &amp; Legal</span>
              </div>
              <div className="flex flex-col gap-2.5 text-body-sm">
                {FOOTER_LEGAL_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors flex items-center gap-1 group py-0.5"
                  >
                    <span className="material-symbols-outlined text-xs text-text-muted/40 group-hover:text-primary transition-colors">
                      shield
                    </span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-6 border-t border-border-specular/30 text-xs text-text-muted/70 leading-relaxed text-center sm:text-left">
          reelXpress is an independent service provider operated by QUANTELLOVENTURES PRIVATE LIMITED and is not affiliated with or endorsed by Instagram, Meta, or any brands shown unless explicitly stated.
        </div>

        {/* Copyright Notice */}
        <div className="pt-4 border-t border-border-specular/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-body-sm font-body-sm text-text-muted">
          <div>
            Copyright © 2026 by QUANTELLOVENTURES PRIVATE LIMITED. All rights reserved.
          </div>
          <Link href="/reelxpress" className="flex items-center gap-2 text-label-sm font-label-sm text-text-muted/80 hover:text-white transition-colors">
            <img src="/brand/icon-gold.png" alt="" className="w-4 h-4 object-contain opacity-75" />
            <span>reel<span className="brand-x-gold">X</span>press · Cinematic Quick Content Platform</span>
          </Link>
        </div>

      </div>
    </footer>
  );
}
