'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function CreatorSuccessModal({ isOpen, onClose, applicationData }) {
  useEffect(() => {
    if (isOpen) {
      // Trigger golden/orange celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff6d29', '#FFD700', '#ffffff', '#ff9e66'],
        });
      } catch {
        // Fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100010] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-surface-deep border border-border-amber p-8 md:p-10 shadow-[0_25px_80px_rgba(255,109,41,0.35)] text-center text-text-primary overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary-container/30 blur-3xl pointer-events-none rounded-full" />

        {/* Close Icon Button */}
        <button
          onClick={onClose}
          aria-label="Close Confirmation Modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-surface-container border border-border-specular flex items-center justify-center text-text-muted hover:text-white hover:border-primary-container transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Badge */}
        <div className="w-16 h-16 rounded-2xl bg-primary-container/20 border border-border-amber text-primary mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(255,109,41,0.5)]">
          <span className="material-symbols-outlined text-3xl">celebration</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 border border-border-amber text-primary text-xs uppercase font-bold tracking-wider mb-3">
          <span>Application Received</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
          Welcome to the Creator Waiting List!
        </h3>

        <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6">
          Thank you, <span className="text-primary font-bold">{applicationData?.fullName || 'Creator'}</span>!
          Your application for the <span className="text-white font-medium">{applicationData?.phoneModel || 'iPhone'}</span> has been priority-queued.
        </p>

        {/* Next Steps Box */}
        <div className="rounded-2xl bg-surface-container/60 border border-border-specular p-5 text-left mb-6 space-y-3">
          <div className="text-xs uppercase tracking-wider font-bold text-primary flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>What happens in the next 24 hours:</span>
          </div>
          <div className="flex items-start gap-3 text-xs sm:text-sm text-text-muted">
            <span className="w-5 h-5 rounded-full bg-primary-container/30 text-primary font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </span>
            <span>Our creative director reviews your Instagram profile and video samples.</span>
          </div>
          <div className="flex items-start gap-3 text-xs sm:text-sm text-text-muted">
            <span className="w-5 h-5 rounded-full bg-primary-container/30 text-primary font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </span>
            <span>You will receive an official WhatsApp invite to the 60-minute orientation workshop.</span>
          </div>
          <div className="flex items-start gap-3 text-xs sm:text-sm text-text-muted">
            <span className="w-5 h-5 rounded-full bg-primary-container/30 text-primary font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </span>
            <span>Complete demo shoots and receive your official reelXpress Partner Kit.</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-shine-sweep btn-ripple w-full py-3.5 px-6 rounded-full bg-primary-container text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(255,109,41,0.6)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
        >
          Got It, Thanks!
        </button>
      </div>
    </div>
  );
}
