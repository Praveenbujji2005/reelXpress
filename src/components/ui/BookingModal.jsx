'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

// Celebration modal displayed after a user submits the quick booking form
export default function BookingModal({ isOpen, bookingDetails, onClose }) {
  useEffect(() => {
    if (isOpen) {
      // Trigger festive gold and orange confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff6d29', '#ffd700', '#ffffff', '#ffb599'],
        });
      } catch {
        // Fallback gracefully if canvas is blocked
      }

      // Lock body scroll while modal is active
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      function handleKeyDown(e) {
        if (e.key === 'Escape') onClose();
      }
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow || '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const formattedDate = bookingDetails?.date
    ? (() => {
        try {
          const d = new Date(bookingDetails.date);
          if (isNaN(d.getTime())) return bookingDetails.date;
          return d.toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });
        } catch {
          return bookingDetails.date;
        }
      })()
    : 'Confirmed Upon Call';

  return (
    <div
      id="booking-modal"
      data-lenis-prevent
      className={`fixed inset-0 z-[100030] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className={`relative w-full max-w-md rounded-3xl bg-surface-deep border border-border-amber p-8 text-center shadow-[0_30px_100px_rgba(255,109,41,0.4)] transform transition-all duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-primary-container/20 border border-border-amber flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,109,41,0.5)] p-3">
          <img src="/brand/icon-gold.png" alt="reelXpress" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,109,41,0.6)]" />
        </div>
        <h3 id="booking-modal-title" className="text-headline-sm font-headline-sm font-bold text-white mb-2">
          Slot Successfully Locked!
        </h3>
        <p className="text-body-md text-text-muted mb-6 leading-relaxed">
          Thank you, <span className="text-primary font-semibold">{bookingDetails?.name || 'there'}</span>! Our Bengaluru executive coordinator will WhatsApp your creator portfolio match within minutes.
        </p>
        <div className="p-4 rounded-xl bg-surface-base border border-border-specular text-left mb-6 space-y-1.5 text-xs text-text-muted">
          <div className="flex justify-between">
            <span className="text-white">Status:</span>{' '}
            <span className="text-green-400 font-bold">● Confirmed</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white">Date:</span>{' '}
            <span className="text-white font-medium">{formattedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white">City Zone:</span>{' '}
            <span className="text-white font-medium">{bookingDetails?.city || 'Bengaluru'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white">Turnaround:</span>{' '}
            <span className="text-primary font-bold">Delivery in Minutes</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="btn-shine-sweep btn-ripple w-full py-3.5 rounded-xl bg-primary-container text-white font-bold text-title-md shadow-[0_0_25px_rgba(255,109,41,0.5)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
        >
          Awesome, Can&apos;t Wait! →
        </button>
      </div>
    </div>
  );
}
