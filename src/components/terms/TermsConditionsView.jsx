'use client';

import React, { useState, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import MobileMenu from '@/components/layout/MobileMenu';
import Footer from '@/components/layout/Footer';
import FaqSection from '@/components/sections/FaqSection';
import BookingSection from '@/components/sections/BookingSection';
import BrandWatermark from '@/components/sections/BrandWatermark';
import BookingModal from '@/components/ui/BookingModal';
import ToastNotification from '@/components/ui/ToastNotification';

export default function TermsConditionsView() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const [toast, setToast] = useState({
    visible: false,
    title: '',
    message: '',
    icon: 'check_circle',
  });

  const showToast = useCallback((toastData) => {
    setToast({
      visible: true,
      title: toastData.title,
      message: toastData.message || '',
      icon: toastData.icon || 'check_circle',
    });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
  }, []);

  const copyToClipboard = (text, label) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast({
        title: 'Copied!',
        message: `${label} copied to clipboard`,
        icon: 'content_copy',
      });
    }
  };

  const handleBookingSuccess = useCallback((details) => {
    setConfirmedBooking(details);
    setIsBookingModalOpen(true);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="relative z-10 flex-1">
        {/* HERO SECTION */}
        <header className="relative pt-12 md:pt-20 pb-12 px-6 md:px-margin max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-glass-tinted border border-border-amber text-primary text-label-md font-label-md backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,109,41,0.25)]">
            <span className="material-symbols-outlined text-lg">gavel</span>
            <span className="font-semibold tracking-wide">Legal Documentation</span>
          </div>

          <h1 className="text-display-md sm:text-display-lg md:text-display-xl font-display-xl font-extrabold tracking-tight text-text-primary mb-4">
            Terms &amp; Conditions
          </h1>

          <p className="text-body-lg sm:text-headline-sm text-text-muted max-w-2xl mx-auto leading-relaxed mb-6">
            These Terms and Conditions constitute a legally binding agreement between{' '}
            <strong className="text-text-primary font-semibold">QUANTELLOVENTURES PRIVATE LIMITED</strong> and the user.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container border border-border-specular text-text-muted text-label-sm font-label-sm">
            <span>Last Updated:</span>
            <span className="text-primary font-bold">08 January 2026</span>
          </div>
        </header>

        {/* TERMS CONTENT DOCUMENT */}
        <section className="px-4 sm:px-6 md:px-margin max-w-5xl mx-auto pb-20">
          <div className="rounded-3xl bg-surface-glass border border-border-specular backdrop-blur-2xl p-6 sm:p-10 md:p-14 shadow-[0_20px_70px_rgba(0,0,0,0.65)] space-y-10">
            
            {/* Introduction */}
            <article className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">description</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  Introduction
                </h2>
              </div>
              <p className="text-body-md text-text-muted leading-relaxed pl-0 sm:pl-13">
                These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between{' '}
                <strong className="text-text-primary">QUANTELLOVENTURES PRIVATE LIMITED</strong>, a company incorporated under the Companies Act, 2013, having its registered office at #67 Jyothi Nivas College Road, 5th Block, Industrial Area, Koramangala, Bengaluru, Karnataka – 560095 (&ldquo;Company&rdquo;, &ldquo;We&rdquo;, &ldquo;Us&rdquo;, &ldquo;Our&rdquo;) and the user (&ldquo;You&rdquo;, &ldquo;User&rdquo;).
              </p>
              <p className="text-body-md text-text-muted leading-relaxed pl-0 sm:pl-13">
                These Terms govern access to and use of the Company&apos;s website, mobile application, and services (collectively, the &ldquo;Platform&rdquo;).
              </p>
            </article>

            {/* 1. Entire Agreement */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  1
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Entire Agreement
                </h3>
              </div>
              <div className="pl-0 sm:pl-11 space-y-3 text-body-md text-text-muted leading-relaxed">
                <p>
                  These Terms, read together with the Privacy Policy and any supplemental policies published on the Platform, constitute the entire agreement between You and the Company and supersede all prior or contemporaneous understandings, representations, warranties, or agreements, whether written or oral.
                </p>
                <p>
                  The Company shall not be bound by any representations made by any third party, affiliate, agent, or employee unless expressly incorporated herein in writing.
                </p>
              </div>
            </article>

            {/* 2. Definitions */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  2
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Definitions
                </h3>
              </div>
              <div className="pl-0 sm:pl-11 grid grid-cols-1 md:grid-cols-2 gap-3.5 text-body-sm">
                <div className="p-4 rounded-xl bg-surface-deep/80 border border-border-specular">
                  <strong className="text-primary block font-bold mb-1">&ldquo;User&rdquo;</strong>
                  <span className="text-text-muted">Means any individual or entity accessing or using the Platform.</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-deep/80 border border-border-specular">
                  <strong className="text-primary block font-bold mb-1">&ldquo;Client&rdquo;</strong>
                  <span className="text-text-muted">Means Users booking services through the Platform.</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-deep/80 border border-border-specular">
                  <strong className="text-primary block font-bold mb-1">&ldquo;Creator&rdquo;</strong>
                  <span className="text-text-muted">Means photographers, videographers, freelancers, or service providers listed on the Platform.</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-deep/80 border border-border-specular">
                  <strong className="text-primary block font-bold mb-1">&ldquo;Content&rdquo;</strong>
                  <span className="text-text-muted">Includes all text, images, audio, video, creatives, metadata, software, and platform materials.</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-deep/80 border border-border-specular md:col-span-2">
                  <strong className="text-primary block font-bold mb-1">&ldquo;Services&rdquo;</strong>
                  <span className="text-text-muted">Means access, booking, scheduling, communication, payment facilitation, and content delivery services provided via the Platform.</span>
                </div>
              </div>
            </article>

            {/* 3. Eligibility & Children Policy */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  3
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Eligibility &amp; Children Policy
                </h3>
              </div>
              <div className="pl-0 sm:pl-11 space-y-2 text-body-md text-text-muted leading-relaxed">
                <p>The Services are intended for persons 18 years or older.</p>
                <p>
                  If a minor accesses the Platform under parental or legal guardian supervision, such guardian assumes full responsibility for:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-text-primary text-body-sm">
                  <li>The minor&apos;s conduct</li>
                  <li>Monitoring usage</li>
                  <li>Consequences arising from such use</li>
                </ul>
                <p className="pt-2 text-body-sm italic">
                  The Company follows applicable child protection norms and NCPCR guidelines.
                </p>
              </div>
            </article>

            {/* 4. Platform Nature & Disclaimer */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  4
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Platform Nature &amp; Disclaimer
                </h3>
              </div>
              <div className="pl-0 sm:pl-11 space-y-2 text-body-md text-text-muted leading-relaxed">
                <p>
                  The Company operates a technology intermediary platform and does not provide creative or professional services directly.
                </p>
                <p>
                  No agency, partnership, employment, or joint venture relationship exists between the Company and any Creator or User.
                </p>
              </div>
            </article>

            {/* 5. User Warranties & Representations */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  5
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  User Warranties &amp; Representations
                </h3>
              </div>
              <div className="pl-0 sm:pl-11 space-y-2 text-body-md text-text-muted">
                <p>You represent and warrant that You shall not:</p>
                <ul className="space-y-2 text-text-primary text-body-sm">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">block</span>
                    <span>Use the Platform beyond its intended purpose</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">block</span>
                    <span>Gain or attempt unauthorized access</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">block</span>
                    <span>Scrape, reverse engineer, decompile, or mirror the Platform</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">block</span>
                    <span>Circumvent payments or transact outside the Platform</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">block</span>
                    <span>Use any Content for resale, licensing, or commercial exploitation</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">block</span>
                    <span>Remove DRM, copyright, trademark, or proprietary notices</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">block</span>
                    <span>Misuse personal or sensitive information</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">block</span>
                    <span>Upload unlawful, misleading, infringing, or fraudulent material</span>
                  </li>
                </ul>
                <p className="pt-2 text-body-sm italic text-primary font-medium">
                  Any violation shall be at Your sole risk and liability.
                </p>
              </div>
            </article>

            {/* 6. Intellectual Property */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  6
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Intellectual Property
                </h3>
              </div>
              <div className="pl-0 sm:pl-11 space-y-3 text-body-md text-text-muted leading-relaxed">
                <p>
                  All Platform Content is protected under Indian law and international treaties.
                </p>
                <p>
                  Users are granted a limited, revocable, non-exclusive, non-transferable, non-sublicensable license for personal, non-commercial use only.
                </p>
                <p>You shall not:</p>
                <ul className="space-y-1.5 list-disc pl-5 text-text-primary text-body-sm">
                  <li>Copy, record, download, broadcast, modify, distribute, or create derivative works</li>
                  <li>Upload Company Content to third-party platforms</li>
                  <li>Bypass digital rights management systems</li>
                </ul>
              </div>
            </article>

            {/* 7. Bookings, Payments & Refunds */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  7
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Bookings, Payments &amp; Refunds
                </h3>
              </div>
              <div className="pl-0 sm:pl-11 space-y-2 text-body-md text-text-muted">
                <ul className="space-y-2 list-disc pl-5 text-text-primary text-body-sm">
                  <li>Bookings are subject to Creator acceptance</li>
                  <li>The Company may deduct platform/service fees</li>
                  <li>Refunds and cancellations are governed by the Refund Policy</li>
                  <li>The Company is not responsible for service quality, delays, or disputes between Creators and Users</li>
                </ul>
              </div>
            </article>

            {/* 8. Technical Disclaimer & Force Majeure */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  8
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Technical Disclaimer &amp; Force Majeure
                </h3>
              </div>
              <div className="pl-0 sm:pl-11 space-y-2 text-body-md text-text-muted leading-relaxed">
                <p>The Company shall not be liable for:</p>
                <ul className="space-y-1.5 list-disc pl-5 text-text-primary text-body-sm">
                  <li>Server failures, downtime, or traffic congestion</li>
                  <li>Data loss or system interruptions</li>
                  <li>Force Majeure events including natural disasters, strikes, epidemics, war, or utility failures</li>
                </ul>
                <p className="pt-2 text-body-sm text-text-muted italic">
                  Temporary suspension for maintenance may occur without prior notice.
                </p>
              </div>
            </article>

            {/* 9. Third-Party Links & Advertisements */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  9
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Third-Party Links &amp; Advertisements
                </h3>
              </div>
              <div className="pl-0 sm:pl-11 space-y-2 text-body-md text-text-muted leading-relaxed">
                <p>
                  The Platform may contain third-party links or advertisements provided for convenience only. The Company:
                </p>
                <ul className="space-y-1.5 list-disc pl-5 text-text-primary text-body-sm">
                  <li>Does not endorse or control third-party content</li>
                  <li>Is not liable for transactions, representations, or losses involving third parties</li>
                </ul>
                <p className="pt-2 text-body-sm italic">
                  User interaction with third-party services is entirely at Your own risk.
                </p>
              </div>
            </article>

            {/* 10. Limitation of Liability */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  10
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Limitation of Liability
                </h3>
              </div>
              <div className="pl-0 sm:pl-11 space-y-2 text-body-md text-text-muted leading-relaxed">
                <p>To the maximum extent permitted by law:</p>
                <ul className="space-y-1.5 list-disc pl-5 text-text-primary text-body-sm">
                  <li>The Company shall not be liable for indirect, incidental, punitive, or consequential damages</li>
                  <li>Liability, if any, shall not exceed the amount paid by the User for the relevant service</li>
                </ul>
              </div>
            </article>

            {/* 11. Indemnity */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  11
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Indemnity
                </h3>
              </div>
              <div className="pl-0 sm:pl-11 space-y-2 text-body-md text-text-muted leading-relaxed">
                <p>
                  You agree to indemnify and hold harmless the Company, its directors, officers, employees, and affiliates from all claims arising from:
                </p>
                <ul className="space-y-1.5 list-disc pl-5 text-text-primary text-body-sm">
                  <li>Platform usage</li>
                  <li>Breach of these Terms</li>
                  <li>Violation of law or third-party rights</li>
                </ul>
                <p className="pt-2 text-body-sm text-primary font-medium italic">
                  (This provision survives termination)
                </p>
              </div>
            </article>

            {/* 12. Electronic Communication Consent */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  12
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Electronic Communication Consent
                </h3>
              </div>
              <p className="pl-0 sm:pl-11 text-body-md text-text-muted leading-relaxed">
                You consent to receive communications electronically including email, SMS, calls, WhatsApp, and platform notifications. Electronic communications satisfy all legal notice requirements.
              </p>
            </article>

            {/* 13. Termination */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  13
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Termination
                </h3>
              </div>
              <div className="pl-0 sm:pl-11 space-y-2 text-body-md text-text-muted leading-relaxed">
                <p>The Company may suspend or terminate access without notice for:</p>
                <ul className="space-y-1.5 list-disc pl-5 text-text-primary text-body-sm">
                  <li>Breach of Terms</li>
                  <li>Legal non-compliance</li>
                  <li>Business or security reasons</li>
                </ul>
              </div>
            </article>

            {/* 14. Waiver */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  14
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Waiver
                </h3>
              </div>
              <p className="pl-0 sm:pl-11 text-body-md text-text-muted leading-relaxed">
                Failure to enforce any right does not constitute waiver. Waivers must be written and signed by an authorized Company representative.
              </p>
            </article>

            {/* 15. Severability */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  15
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Severability
                </h3>
              </div>
              <p className="pl-0 sm:pl-11 text-body-md text-text-muted leading-relaxed">
                If any provision is held unenforceable, such provision shall be severed and remaining provisions shall continue in full force.
              </p>
            </article>

            {/* 16. Governing Law & Jurisdiction */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-surface-container border border-border-specular flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  16
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Governing Law &amp; Jurisdiction
                </h3>
              </div>
              <p className="pl-0 sm:pl-11 text-body-md text-text-muted leading-relaxed">
                These Terms shall be governed by the laws of India. Courts at Bengaluru, Karnataka shall have exclusive jurisdiction.
              </p>
            </article>

            {/* 17. Support & Grievance */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  17
                </span>
                <h3 className="text-title-lg font-title-lg font-bold text-text-primary">
                  Support &amp; Grievance
                </h3>
              </div>

              <div className="pl-0 sm:pl-11 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Office */}
                <div className="p-5 rounded-2xl bg-surface-deep/90 border border-border-specular space-y-1.5">
                  <div className="text-label-sm font-bold text-primary uppercase tracking-wider">
                    Registered Office
                  </div>
                  <p className="text-body-sm text-text-primary leading-snug">
                    #67 Jyothi Nivas College Road, 5th Block, Industrial Area, Koramangala, Bengaluru – 560095, India
                  </p>
                </div>

                {/* Email */}
                <div className="p-5 rounded-2xl bg-surface-deep/90 border border-border-specular space-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="text-label-sm font-bold text-primary uppercase tracking-wider mb-1">
                      Email
                    </div>
                    <a
                      href="mailto:support@reelxpress.com"
                      className="text-body-sm text-text-primary hover:text-primary transition-colors block font-semibold break-all"
                    >
                      support@reelxpress.com
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('support@reelxpress.com', 'Support email')}
                    className="inline-flex items-center gap-1 text-[11px] text-text-muted hover:text-primary transition-colors cursor-pointer pt-2"
                  >
                    <span className="material-symbols-outlined text-xs">content_copy</span>
                    <span>Copy Email</span>
                  </button>
                </div>

                {/* Contact */}
                <div className="p-5 rounded-2xl bg-surface-deep/90 border border-border-specular space-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="text-label-sm font-bold text-primary uppercase tracking-wider mb-1">
                      Contact Number
                    </div>
                    <a
                      href="tel:+919988338180"
                      className="text-body-sm text-text-primary hover:text-primary transition-colors block font-semibold"
                    >
                      +91 9988338180
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('+91 9988338180', 'Contact phone')}
                    className="inline-flex items-center gap-1 text-[11px] text-text-muted hover:text-primary transition-colors cursor-pointer pt-2"
                  >
                    <span className="material-symbols-outlined text-xs">content_copy</span>
                    <span>Copy Phone</span>
                  </button>
                </div>
              </div>
            </article>

          </div>
        </section>

        {/* FAQ Section */}
        <FaqSection />

        {/* Join the Express Network Banner & Booking */}
        <BookingSection onBookingSuccess={handleBookingSuccess} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Confirmation Celebration Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        bookingDetails={confirmedBooking}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* System Toast Notification */}
      <ToastNotification toast={toast} />
    </>
  );
}
