'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { OCCASIONS_LIST, SHOOT_TYPE_CATEGORIES } from '@/lib/data';

// Final CTA banner: JOIN THE EXPRESS NETWORK & Quick Booking Form
export default function BookingSection({ onBookingSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    date: '',
    type: OCCASIONS_LIST[0],
    city: '',
    message: '',
    website_trap: '', // Anti-spam honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  // Auto-select package when user clicks a pricing card CTA
  useEffect(() => {
    const handleSelectType = (e) => {
      if (e.detail?.type) {
        setFormData((prev) => ({ ...prev, type: e.detail.type }));
      }
    };
    window.addEventListener('select-shoot-type', handleSelectType);
    return () => window.removeEventListener('select-shoot-type', handleSelectType);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    const payload = {
      customerName: formData.name.trim(),
      fullName: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      companyName: formData.companyName.trim(),
      selectedService: formData.type,
      serviceType: formData.type,
      enquiryMessage: formData.message.trim(),
      message: formData.message.trim(),
      city: formData.city.trim(),
      eventDate: formData.date,
      website_trap: formData.website_trap,
      sourcePage: 'Website Booking Section',
      source: 'booking_section',
    };

    try {
      // Send directly to Firebase Firestore enquiry endpoint
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        setSubmitError(data.error || 'Failed to submit enquiry. Please verify details and try again.');
        setIsSubmitting(false);
        return;
      }

      setSubmitSuccess(
        data.message || 'Your shoot slot has been locked! Our coordinator will connect via WhatsApp within minutes.'
      );
      onBookingSuccess?.({
        name: payload.customerName || 'Creator',
        date: payload.eventDate || 'Selected Date',
        city: payload.city || 'Bengaluru',
        type: payload.selectedService,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        date: '',
        type: OCCASIONS_LIST[0],
        city: '',
        message: '',
        website_trap: '',
      });
    } catch (err) {
      console.error('[BookingSection] Submission failed:', err);
      setSubmitError(
        err.message || 'Unable to store your enquiry in Firestore database. Please verify connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-space-2xl px-6 md:px-margin max-w-[1440px] mx-auto" id="booking">
      
      {/* Express Network Banner */}
      <div className="reveal-scale-on-scroll rounded-3xl bg-surface-glass-tinted border border-border-amber backdrop-blur-2xl p-8 md:p-14 shadow-[0_20px_80px_rgba(255,109,41,0.25)] mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 border border-border-amber text-primary text-label-sm font-label-sm uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-primary rec-indicator" />
              <span>JOIN THE EXPRESS NETWORK</span>
            </div>
            <h2 className="text-headline-lg font-headline-lg text-text-primary mb-4 leading-tight">
              The fastest creative community for modern creators.
            </h2>
            <p className="text-body-lg font-body-lg text-text-muted mb-8 leading-relaxed">
              We Shoot • Edit • Deliver Reels in Minutes. Book certified mobile videographers or become an elite partner today.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/creators"
                className="btn-shine-sweep btn-ripple inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-container text-text-primary font-bold text-title-md shadow-[0_0_25px_rgba(255,109,41,0.5)] hover:scale-[1.03] active:scale-95 transition-all cursor-pointer"
              >
                <span>Apply as a Creator</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>

            <div className="space-y-4 pt-6 border-t border-border-specular">
              <a
                href="tel:+919988338180"
                className="flex items-center gap-3 text-body-md font-body-md text-on-surface hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-container border border-border-specular flex items-center justify-center text-primary group-hover:border-primary-container transition-colors">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <span>Direct Line: +91 9988338180</span>
              </a>

              <a
                href="mailto:connect@reelxpress.com"
                className="flex items-center gap-3 text-body-md font-body-md text-on-surface hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-container border border-border-specular flex items-center justify-center text-primary group-hover:border-primary-container transition-colors">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <span>Email: connect@reelxpress.com</span>
              </a>

              <div className="flex items-center gap-3 text-body-md font-body-md text-on-surface">
                <div className="w-10 h-10 rounded-xl bg-surface-container border border-border-specular flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">pin_drop</span>
                </div>
                <span>Bengaluru, Karnataka</span>
              </div>
            </div>
          </div>

          {/* Quick Booking Form */}
          <div id="booking-form" className="rounded-2xl bg-surface-deep/90 border border-border-specular p-6 md:p-8 backdrop-blur-xl shadow-xl spotlight-card">
            <div className="text-title-lg font-bold text-text-primary mb-1">Book Your Reel Shoot</div>
            <p className="text-body-sm text-text-muted mb-6">Lock your slot in seconds with direct Firestore confirmation.</p>

            {submitSuccess && (
              <div className="mb-4 p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-sm flex items-start gap-2.5 animate-fadeIn shadow-lg">
                <span className="material-symbols-outlined text-emerald-400 text-lg shrink-0 mt-0.5">check_circle</span>
                <div className="flex-1">
                  <div className="font-bold text-emerald-300">Enquiry Stored in Firestore!</div>
                  <div className="text-xs text-emerald-200/90 mt-0.5">{submitSuccess}</div>
                </div>
              </div>
            )}

            {submitError && (
              <div className="mb-4 p-4 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-sm flex items-start gap-2.5 animate-fadeIn shadow-lg">
                <span className="material-symbols-outlined text-red-400 text-lg shrink-0 mt-0.5">error</span>
                <div className="flex-1">
                  <div className="font-bold text-red-300">Firestore Write Notice</div>
                  <div className="text-xs text-red-200/90 mt-0.5 leading-relaxed">{submitError}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anti-spam honeypot (invisible to real users) */}
              <input
                type="text"
                name="website_trap"
                value={formData.website_trap}
                onChange={(e) => setFormData({ ...formData, website_trap: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Full Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-sm font-label-sm text-text-muted uppercase tracking-wider mb-1.5 font-semibold">
                    Customer Name*
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sravanthi Reddy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-base border border-border-specular text-text-primary placeholder:text-text-muted/60 focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all text-[16px] sm:text-body-md font-body-md"
                  />
                </div>
                <div>
                  <label className="block text-label-sm font-label-sm text-text-muted uppercase tracking-wider mb-1.5 font-semibold">
                    Company / Brand (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp / Creator Studio"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-base border border-border-specular text-text-primary placeholder:text-text-muted/60 focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all text-[16px] sm:text-body-md font-body-md"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-sm font-label-sm text-text-muted uppercase tracking-wider mb-1.5 font-semibold">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sravanthi@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-base border border-border-specular text-text-primary placeholder:text-text-muted/60 focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all text-[16px] sm:text-body-md font-body-md"
                  />
                </div>
                <div>
                  <label className="block text-label-sm font-label-sm text-text-muted uppercase tracking-wider mb-1.5 font-semibold">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-base border border-border-specular text-text-primary placeholder:text-text-muted/60 focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all text-[16px] sm:text-body-md font-body-md"
                  />
                </div>
              </div>

              {/* Event Date & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-sm font-label-sm text-text-muted uppercase tracking-wider mb-1.5 font-semibold">
                    Event Date*
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-base border border-border-specular text-text-primary placeholder:text-text-muted/60 focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all text-[16px] sm:text-body-md font-body-md [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-label-sm font-label-sm text-text-muted uppercase tracking-wider mb-1.5 font-semibold">
                    Location (City / Area)*
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Indiranagar, Bengaluru"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-surface-base border border-border-specular text-text-primary placeholder:text-text-muted/60 focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all text-[16px] sm:text-body-md font-body-md"
                  />
                </div>
              </div>

              {/* Shoot Type & Occasion */}
              <div>
                <label className="block text-label-sm font-label-sm text-text-muted uppercase tracking-wider mb-1.5 font-semibold">
                  Shoot Type &amp; Occasion (Selected Service)*
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-base border border-border-specular text-text-primary focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all text-[16px] sm:text-body-md font-body-md cursor-pointer"
                >
                  {SHOOT_TYPE_CATEGORIES.map((cat) => (
                    <optgroup key={cat.group} label={cat.group} className="bg-[#181318] text-[#ff6d29] font-bold">
                      {cat.options.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#130f14] text-white font-normal py-1">
                          {opt}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Enquiry Message */}
              <div>
                <label className="block text-label-sm font-label-sm text-text-muted uppercase tracking-wider mb-1.5 font-semibold">
                  Project Details / Enquiry Message
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your shoot: timeline, style references, number of reels needed..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-base border border-border-specular text-text-primary placeholder:text-text-muted/60 focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all text-[16px] sm:text-body-md font-body-md resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shine-sweep btn-ripple w-full mt-2 py-4 rounded-xl bg-primary-container text-text-primary font-bold text-title-md font-title-md shadow-[0_0_25px_rgba(255,109,41,0.5)] hover:shadow-[0_0_40px_rgba(255,109,41,0.85)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving to Firestore...</span>
                  </>
                ) : (
                  <span>Book Now →</span>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
