'use client';

// Floating toast notification matching the original luxe design
export default function ToastNotification({ toast }) {
  const isVisible = Boolean(toast?.visible);

  return (
    <div
      id="toast-notification"
      className={`fixed bottom-24 sm:bottom-28 right-3 sm:right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-surface-base/95 backdrop-blur-2xl border border-border-amber text-text-primary shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-300 ${
        isVisible ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="w-8 h-8 rounded-xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary">
        <span className="material-symbols-outlined text-lg">
          {toast?.icon || 'check_circle'}
        </span>
      </div>
      <div className="text-left">
        <div className="text-sm font-bold text-white">{toast?.title || 'Notice'}</div>
        <div className="text-xs text-text-muted">{toast?.message || ''}</div>
      </div>
    </div>
  );
}
