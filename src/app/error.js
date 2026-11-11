'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('[Global App Error]:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#151215] text-white">
      <div className="w-16 h-16 rounded-2xl bg-primary-container/20 border border-primary-container/40 flex items-center justify-center text-primary-container mb-6 shadow-xl">
        <svg className="w-8 h-8 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-3">Something interrupted the page</h1>
      <p className="text-sm sm:text-base text-text-muted max-w-md mb-8 leading-relaxed">
        We encountered a display issue. Click below to recover and continue browsing reelXpress.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ff6d29] text-white font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          Try Again
        </button>
        <a
          href="/"
          className="px-7 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all cursor-pointer"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
