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

export default function CookiePolicyView() {
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

  const handleSavePreferences = () => {
    showToast({
      title: 'Cookie Preferences Saved',
      message: 'Your preferences have been successfully recorded.',
      icon: 'cookie',
    });
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
            <span className="material-symbols-outlined text-lg">cookie</span>
            <span className="font-semibold tracking-wide">Cookie Policy</span>
          </div>

          <h1 className="text-display-md sm:text-display-lg md:text-display-xl font-display-xl font-extrabold tracking-tight text-text-primary mb-4">
            Cookie Policy
          </h1>

          <p className="text-body-lg sm:text-headline-sm text-text-muted max-w-2xl mx-auto leading-relaxed mb-6">
            This Cookie Policy explains how{' '}
            <strong className="text-text-primary font-semibold">QUANTELLOVENTURES PRIVATE LIMITED</strong> uses cookies and similar tracking technologies to enhance your experience on our Platform.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container border border-border-specular text-text-muted text-label-sm font-label-sm">
            <span>Last Updated:</span>
            <span className="text-primary font-bold">08 January 2026</span>
          </div>
        </header>

        {/* COOKIE DOCUMENT CONTENT */}
        <section className="px-4 sm:px-6 md:px-margin max-w-5xl mx-auto pb-20">
          <div className="rounded-3xl bg-surface-glass border border-border-specular backdrop-blur-2xl p-6 sm:p-10 md:p-14 shadow-[0_20px_70px_rgba(0,0,0,0.65)] space-y-10">
            
            {/* 1. ROLE OF COOKIES ON THE PLATFORM */}
            <article className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  1. Role of Cookies on the Platform
                </h2>
              </div>
              <p className="text-body-md text-text-muted leading-relaxed pl-0 sm:pl-13">
                Cookies enable the Platform to function efficiently, remember user preferences, analyse traffic patterns, and support personalised content and advertising. Cookies are a widely used and accepted internet standard.
              </p>
              <div className="pl-0 sm:pl-13 space-y-2 pt-1">
                <div className="text-body-sm font-semibold text-text-primary uppercase tracking-wider mb-2">
                  Cookies:
                </div>
                <ul className="space-y-2 text-body-md text-text-primary">
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-green-400 text-base shrink-0 mt-0.5">verified_user</span>
                    <span>Do not contain malware or viruses</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-green-400 text-base shrink-0 mt-0.5">verified_user</span>
                    <span>Do not access or retrieve personal files from your device</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">tune</span>
                    <span>Can be managed, restricted, or deleted by users at their discretion</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* 2. DEFINITION OF COOKIES */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">info</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  2. Definition of Cookies
                </h2>
              </div>
              <p className="text-body-md text-text-muted leading-relaxed pl-0 sm:pl-13">
                Cookies are small text files stored on your device (computer, tablet, or mobile phone) when you visit a website. These files help recognise your device, retain session information, and improve user experience during current and future visits.
              </p>
            </article>

            {/* 3. TYPES OF COOKIES USED */}
            <article className="space-y-6 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">category</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  3. Types of Cookies Used
                </h2>
              </div>

              <div className="pl-0 sm:pl-13 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* A. Essential Cookies */}
                <div className="p-6 rounded-2xl bg-surface-deep/80 border border-border-specular space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-bold text-title-md">
                      <span className="material-symbols-outlined text-lg">lock</span>
                      <span>A. Essential Cookies</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                      Required
                    </span>
                  </div>
                  <p className="text-body-sm text-text-muted leading-relaxed">
                    Strictly necessary for basic operation and security. Cannot be disabled.
                  </p>
                  <ul className="space-y-1 text-body-sm text-text-primary pt-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      <span>User authentication &amp; security</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      <span>Session continuity &amp; navigation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      <span>Saving account preferences</span>
                    </li>
                  </ul>
                </div>

                {/* B. Analytics Cookies */}
                <div className="p-6 rounded-2xl bg-surface-deep/80 border border-border-specular space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-bold text-title-md">
                      <span className="material-symbols-outlined text-lg">analytics</span>
                      <span>B. Analytics Cookies</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-text-muted text-[10px] font-bold uppercase tracking-wider">
                      Performance
                    </span>
                  </div>
                  <p className="text-body-sm text-text-muted leading-relaxed">
                    Aggregated and anonymised data to understand interactions.
                  </p>
                  <ul className="space-y-1 text-body-sm text-text-primary pt-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      <span>Analysing usage patterns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      <span>Monitoring performance &amp; stability</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      <span>Resolving technical issues</span>
                    </li>
                  </ul>
                </div>

                {/* C. Functional Cookies */}
                <div className="p-6 rounded-2xl bg-surface-deep/80 border border-border-specular space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-bold text-title-md">
                      <span className="material-symbols-outlined text-lg">tune</span>
                      <span>C. Functional Cookies</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-text-muted text-[10px] font-bold uppercase tracking-wider">
                      Preferences
                    </span>
                  </div>
                  <p className="text-body-sm text-text-muted leading-relaxed">
                    Remember user selections and enhance functionality.
                  </p>
                  <ul className="space-y-1 text-body-sm text-text-primary pt-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      <span>Language &amp; regional preferences</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      <span>Location-based content</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      <span>Customisation of interface</span>
                    </li>
                  </ul>
                </div>

                {/* D. Marketing Cookies */}
                <div className="p-6 rounded-2xl bg-surface-deep/80 border border-border-specular space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-bold text-title-md">
                      <span className="material-symbols-outlined text-lg">campaign</span>
                      <span>D. Marketing Cookies</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-text-muted text-[10px] font-bold uppercase tracking-wider">
                      Marketing
                    </span>
                  </div>
                  <p className="text-body-sm text-text-muted leading-relaxed">
                    Track browsing activity to deliver relevant ads.
                  </p>
                  <ul className="space-y-1 text-body-sm text-text-primary pt-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      <span>Personalised advertising</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      <span>Measuring campaign performance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                      <span>Partner network integration</span>
                    </li>
                  </ul>
                </div>

              </div>
            </article>

            {/* 4. USER CONTROL AND COOKIE MANAGEMENT */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">settings</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  4. User Control and Cookie Management
                </h2>
              </div>
              <div className="pl-0 sm:pl-13 space-y-3 text-body-md text-text-muted leading-relaxed">
                <p>
                  You may control or delete cookies at any time through your browser settings. Most browsers allow you to block cookies entirely or configure alerts when cookies are being sent.
                </p>
                <div className="p-4 rounded-xl bg-surface-container/60 border border-border-amber/40 text-text-primary text-body-sm flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary-container shrink-0 text-lg mt-0.5">warning</span>
                  <span>
                    Please note that disabling certain cookies may impact the functionality and availability of some Platform features.
                  </span>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className="btn-shine-sweep btn-ripple inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-text-primary font-bold text-label-sm shadow-[0_0_20px_rgba(255,109,41,0.4)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Save My Cookie Preferences</span>
                  </button>
                </div>
              </div>
            </article>

            {/* 5. BROWSER-BASED COOKIE SETTINGS */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">language</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  5. Browser-Based Cookie Settings
                </h2>
              </div>

              <div className="pl-0 sm:pl-13 space-y-3">
                <p className="text-body-md text-text-muted">
                  Users may manage cookie preferences through commonly used browsers as follows:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Google Chrome */}
                  <div className="p-5 rounded-2xl bg-surface-deep/90 border border-border-specular space-y-1.5">
                    <div className="text-title-sm font-bold text-text-primary flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-container" />
                      <span>Google Chrome</span>
                    </div>
                    <p className="text-body-sm text-text-muted font-mono text-xs pt-1">
                      Settings → Privacy and Security → Cookies
                    </p>
                  </div>

                  {/* Mozilla Firefox */}
                  <div className="p-5 rounded-2xl bg-surface-deep/90 border border-border-specular space-y-1.5">
                    <div className="text-title-sm font-bold text-text-primary flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-container" />
                      <span>Mozilla Firefox</span>
                    </div>
                    <p className="text-body-sm text-text-muted font-mono text-xs pt-1">
                      Options → Privacy &amp; Security → Cookies
                    </p>
                  </div>

                  {/* Apple Safari */}
                  <div className="p-5 rounded-2xl bg-surface-deep/90 border border-border-specular space-y-1.5">
                    <div className="text-title-sm font-bold text-text-primary flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-container" />
                      <span>Apple Safari</span>
                    </div>
                    <p className="text-body-sm text-text-muted font-mono text-xs pt-1">
                      Preferences → Privacy → Cookies
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* 6. CHANGES TO THIS COOKIE POLICY */}
            <article className="space-y-4 pt-8 border-t border-border-specular/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(255,109,41,0.3)]">
                  <span className="material-symbols-outlined text-xl">update</span>
                </div>
                <h2 className="text-headline-sm font-headline-sm font-bold text-text-primary">
                  6. Changes to this Cookie Policy
                </h2>
              </div>
              <p className="pl-0 sm:pl-13 text-body-md text-text-muted leading-relaxed">
                The Company reserves the right to update or modify this Cookie Policy at any time. Any changes will be posted on the Platform. Continued use of the Platform after such updates constitutes acceptance of the revised Cookie Policy.
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
