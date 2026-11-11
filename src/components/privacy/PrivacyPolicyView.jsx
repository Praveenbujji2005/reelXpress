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

export default function PrivacyPolicyView() {
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
          {/* Eyebrow with Shield Lock Icon */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-glass-tinted border border-border-amber text-primary text-label-md font-label-md backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,109,41,0.25)]">
            <span className="material-symbols-outlined text-lg">shield_lock</span>
            <span className="font-semibold tracking-wide">Security &amp; Privacy</span>
          </div>

          <h1 className="text-display-md sm:text-display-lg md:text-display-xl font-display-xl font-extrabold tracking-tight text-text-primary mb-4">
            Privacy Policy
          </h1>

          <p className="text-body-lg sm:text-headline-sm text-text-muted max-w-2xl mx-auto leading-relaxed mb-6">
            <strong className="text-text-primary font-semibold">QUANTELLOVENTURES PRIVATE LIMITED</strong> is committed to protecting your data and privacy.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container border border-border-specular text-text-muted text-label-sm font-label-sm">
            <span>Last Updated:</span>
            <span className="text-primary font-bold">08 January 2026</span>
          </div>
        </header>

        {/* POLICY CONTENT DOCUMENT */}
        <section className="px-4 sm:px-6 md:px-margin max-w-5xl mx-auto pb-20">
          <div className="rounded-3xl bg-surface-glass border border-border-specular backdrop-blur-2xl p-6 sm:p-10 md:p-14 shadow-[0_20px_70px_rgba(0,0,0,0.65)] space-y-12">
            
            {/* A. Introduction and Scope */}
            <article className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">info</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  A. Introduction and Scope
                </h2>
              </div>
              <p className="text-body-md text-text-muted leading-relaxed pl-0 sm:pl-13">
                This Privacy Policy explains how <strong className="text-text-primary">QUANTELLOVENTURES PRIVATE LIMITED</strong>, a company incorporated under the Companies Act, 2013, having its registered office at #67 Jyothi Nivas College Road, 5th Block, Industrial Area, Koramangala, Bengaluru, Karnataka – 560095 (“Company”, “we”, “us”, “our”), collects, uses, processes, stores, transfers, and discloses information relating to users (“you”, “your”, “user”) who access or use our website, mobile application, or services (collectively, the “Platform”).
              </p>
              <p className="text-body-md text-text-muted leading-relaxed pl-0 sm:pl-13">
                This Policy applies to all interactions with the Platform, whether online or offline, and forms an integral part of the Company’s Terms and Conditions.
              </p>
            </article>

            {/* B. Applicable Data Protection Laws */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">gavel</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  B. Applicable Data Protection Laws
                </h2>
              </div>
              <div className="pl-0 sm:pl-13 space-y-3">
                <p className="text-body-md text-text-muted leading-relaxed">
                  Our information practices are governed by:
                </p>
                <ul className="space-y-2 text-body-md text-text-primary">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">check_circle</span>
                    <span>The Information Technology Act, 2000</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">check_circle</span>
                    <span>The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">check_circle</span>
                    <span>Other applicable laws, rules, regulations, and guidelines in force in India</span>
                  </li>
                </ul>
                <p className="text-body-sm text-text-muted pt-2 italic">
                  All references to “Personal Information” and “Sensitive Personal Data or Information” shall carry the meaning assigned under applicable Indian law.
                </p>
              </div>
            </article>

            {/* C. Categories of Information Collected */}
            <article className="space-y-6 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">database</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  C. Categories of Information Collected
                </h2>
              </div>

              <div className="pl-0 sm:pl-13 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Identification and Account Data */}
                <div className="p-5 rounded-2xl bg-surface-deep/80 border border-border-specular space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-title-md">
                    <span className="material-symbols-outlined text-lg">badge</span>
                    <span>1. Identification &amp; Account Data</span>
                  </div>
                  <p className="text-body-sm text-text-muted leading-relaxed">
                    Information such as your name, email address, phone number, postal address, company name, designation, account identifiers, preferences, and similar profile-related details.
                  </p>
                </div>

                {/* 2. Transaction-Related Information */}
                <div className="p-5 rounded-2xl bg-surface-deep/80 border border-border-specular space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-title-md">
                    <span className="material-symbols-outlined text-lg">payments</span>
                    <span>2. Transaction-Related Information</span>
                  </div>
                  <p className="text-body-sm text-text-muted leading-relaxed">
                    We do not store payment card details, bank account information, or financial credentials. We may retain limited non-financial transaction data (e.g., booking IDs, confirmation numbers) strictly for operational and compliance purposes.
                  </p>
                </div>

                {/* 3. Platform Interaction and User Activity */}
                <div className="p-5 rounded-2xl bg-surface-deep/80 border border-border-specular space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-title-md">
                    <span className="material-symbols-outlined text-lg">touch_app</span>
                    <span>3. Platform Interaction &amp; Activity</span>
                  </div>
                  <p className="text-body-sm text-text-muted leading-relaxed">
                    This includes information generated through your use of the Platform, such as browsing behaviour, interaction logs, preferences, cookies, pixel tags, and similar technologies.
                  </p>
                </div>

                {/* 4. Technical, Device, and Location Information */}
                <div className="p-5 rounded-2xl bg-surface-deep/80 border border-border-specular space-y-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-title-md">
                    <span className="material-symbols-outlined text-lg">devices</span>
                    <span>4. Technical, Device &amp; Location</span>
                  </div>
                  <p className="text-body-sm text-text-muted leading-relaxed">
                    Information such as IP address, device identifiers, browser type, operating system, access timestamps, and location data where enabled. Audio or video interactions with the Company may be recorded or monitored for quality, security, or training purposes.
                  </p>
                </div>
              </div>
            </article>

            {/* D. Purposes for Processing Information */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">settings</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  D. Purposes for Processing Information
                </h2>
              </div>
              <div className="pl-0 sm:pl-13 space-y-3">
                <p className="text-body-md text-text-muted">
                  Your information is collected and processed for the following legitimate purposes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-body-sm text-text-primary">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container/60 border border-border-specular/60">
                    <span className="material-symbols-outlined text-primary text-base">task_alt</span>
                    <span>Delivering and managing requested services</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container/60 border border-border-specular/60">
                    <span className="material-symbols-outlined text-primary text-base">manage_accounts</span>
                    <span>Creating and maintaining user accounts</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container/60 border border-border-specular/60">
                    <span className="material-symbols-outlined text-primary text-base">event_available</span>
                    <span>Facilitating bookings, communications, &amp; fulfilment</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container/60 border border-border-specular/60">
                    <span className="material-symbols-outlined text-primary text-base">support_agent</span>
                    <span>Customer support and responding to queries</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container/60 border border-border-specular/60">
                    <span className="material-symbols-outlined text-primary text-base">forward_to_inbox</span>
                    <span>Service communications &amp; permitted updates</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container/60 border border-border-specular/60">
                    <span className="material-symbols-outlined text-primary text-base">verified_user</span>
                    <span>Platform security and fraud prevention</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container/60 border border-border-specular/60">
                    <span className="material-symbols-outlined text-primary text-base">analytics</span>
                    <span>Analysing operations and improving platform</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container/60 border border-border-specular/60">
                    <span className="material-symbols-outlined text-primary text-base">share</span>
                    <span>Managing social media &amp; digital presence</span>
                  </div>
                </div>
              </div>
            </article>

            {/* E. Methods and Sources of Collection */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">source</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  E. Methods and Sources of Collection
                </h2>
              </div>
              <div className="pl-0 sm:pl-13 space-y-2 text-body-md text-text-muted">
                <p>Information may be collected:</p>
                <ul className="space-y-1.5 list-disc pl-5 text-text-primary text-body-sm">
                  <li>Directly from you when you register, communicate, or transact</li>
                  <li>Through your use of devices to access the Platform</li>
                  <li>From business partners, affiliates, or service providers</li>
                  <li>From publicly available sources or social media platforms</li>
                  <li>From third parties who share information with your consent</li>
                </ul>
              </div>
            </article>

            {/* F. Storage, Processing, and Cross-Border Transfers */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">cloud_sync</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  F. Storage, Processing, and Cross-Border Transfers
                </h2>
              </div>
              <div className="pl-0 sm:pl-13 space-y-2 text-body-md text-text-muted leading-relaxed">
                <p>
                  Information may be stored and processed in India and/or other jurisdictions where the Company, its affiliates, or service providers maintain infrastructure.
                </p>
                <p>
                  Appropriate security safeguards are implemented to protect such data in accordance with applicable law.
                </p>
              </div>
            </article>

            {/* G. Disclosure and Sharing of Information */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">share</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  G. Disclosure and Sharing of Information
                </h2>
              </div>
              <div className="pl-0 sm:pl-13 space-y-2 text-body-md text-text-muted">
                <p>Your information may be shared on a need-to-know basis with:</p>
                <ul className="space-y-1.5 list-disc pl-5 text-text-primary text-body-sm">
                  <li>Service providers and operational partners</li>
                  <li>Marketing, analytics, and communication vendors</li>
                  <li>IT, cloud, and security service providers</li>
                  <li>Professional advisors such as auditors and legal consultants</li>
                  <li>Government authorities, regulators, or courts where required by law</li>
                  <li>Any third party with your consent or for legitimate business interests</li>
                </ul>
              </div>
            </article>

            {/* H. Use of Cookies and Tracking Tools */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">cookie</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  H. Use of Cookies and Tracking Tools
                </h2>
              </div>
              <p className="pl-0 sm:pl-13 text-body-md text-text-muted leading-relaxed">
                The Platform uses cookies and similar technologies to enhance user experience, analyse usage patterns, and improve services. You may disable cookies through browser settings; however, certain features of the Platform may not function correctly. The Company does not control cookies deployed by third parties.
              </p>
            </article>

            {/* I. User Rights and Choices */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">person_check</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  I. User Rights and Choices
                </h2>
              </div>
              <div className="pl-0 sm:pl-13 space-y-2 text-body-md text-text-muted">
                <p>You have the right to:</p>
                <ul className="space-y-1.5 list-disc pl-5 text-text-primary text-body-sm">
                  <li>Withdraw consent where processing is based on consent</li>
                  <li>Opt out of marketing communications at any time</li>
                  <li>Manage cookies and tracking preferences through browser settings</li>
                </ul>
                <p className="text-body-sm text-text-muted pt-2">
                  Requests may be made using the contact details provided below.
                </p>
              </div>
            </article>

            {/* J. Data Security and System Limitations */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">security</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  J. Data Security and System Limitations
                </h2>
              </div>
              <div className="pl-0 sm:pl-13 space-y-2 text-body-md text-text-muted leading-relaxed">
                <p>
                  Reasonable administrative, technical, and physical safeguards are implemented to protect information. However, no digital system is entirely secure, and Users acknowledge the inherent risks of online data transmission.
                </p>
                <p>
                  The Company shall not be liable for data loss or service disruption caused by events beyond its reasonable control, including technical failures or force majeure events.
                </p>
              </div>
            </article>

            {/* K. Refund Information */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">currency_exchange</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  K. Refund Information
                </h2>
              </div>
              <p className="pl-0 sm:pl-13 text-body-md text-text-muted leading-relaxed">
                Refunds are processed in accordance with the Company’s Refund Policy as displayed on the Platform. Eligibility depends on service status, completion level, and applicable deductions.
              </p>
            </article>

            {/* L. Policy Updates */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">update</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  L. Policy Updates
                </h2>
              </div>
              <p className="pl-0 sm:pl-13 text-body-md text-text-muted leading-relaxed">
                This Privacy Policy may be updated periodically to reflect changes in law, technology, or business practices. Continued use of the Platform following updates constitutes acceptance of the revised Policy.
              </p>
            </article>

            {/* M. Contact Details */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">contact_mail</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  M. Contact Details
                </h2>
              </div>

              <div className="pl-0 sm:pl-13 space-y-4">
                <p className="text-body-md text-text-muted">
                  For questions, concerns, or requests relating to privacy:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Address */}
                  <div className="p-5 rounded-2xl bg-surface-deep/90 border border-border-specular space-y-1.5">
                    <div className="text-label-sm font-bold text-primary uppercase tracking-wider">
                      Registered Office
                    </div>
                    <p className="text-body-sm text-text-primary leading-snug">
                      #67 Jyothi Nivas College Road, 5th Block, Industrial Area, Koramangala, Bengaluru, Karnataka – 560095, India
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
                      onClick={() => copyToClipboard('support@reelxpress.com', 'Email address')}
                      className="inline-flex items-center gap-1 text-[11px] text-text-muted hover:text-primary transition-colors cursor-pointer pt-2"
                    >
                      <span className="material-symbols-outlined text-xs">content_copy</span>
                      <span>Copy Email</span>
                    </button>
                  </div>

                  {/* Phone */}
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
                      onClick={() => copyToClipboard('+91 9988338180', 'Phone number')}
                      className="inline-flex items-center gap-1 text-[11px] text-text-muted hover:text-primary transition-colors cursor-pointer pt-2"
                    >
                      <span className="material-symbols-outlined text-xs">content_copy</span>
                      <span>Copy Phone</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* N. Governing Law */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">account_balance</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  N. Governing Law
                </h2>
              </div>
              <p className="pl-0 sm:pl-13 text-body-md text-text-muted leading-relaxed">
                This Privacy Policy shall be governed by and construed in accordance with the laws of India. Courts at Bengaluru, Karnataka shall have exclusive jurisdiction.
              </p>
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
