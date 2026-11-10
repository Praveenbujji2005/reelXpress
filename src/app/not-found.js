import Link from 'next/link';

// Custom 404 page preserving the dark cinematic luxe styling
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background text-text-primary">
      <div className="w-20 h-20 rounded-3xl bg-primary-container/20 border border-border-amber flex items-center justify-center text-primary-container mb-6 shadow-[0_0_40px_rgba(255,109,41,0.5)]">
        <span className="material-symbols-outlined text-4xl">videocam_off</span>
      </div>
      <h1 className="text-display-xl-mobile md:text-display-xl font-display-xl font-extrabold text-white mb-3">
        404
      </h1>
      <h2 className="text-headline-sm font-headline-sm text-text-primary mb-3">
        Reel Not Found
      </h2>
      <p className="text-body-md text-text-muted max-w-md mb-8 leading-relaxed">
        The shot you are looking for has already cut. Return to the main reelXpress stage to book your next viral shoot.
      </p>
      <Link
        href="/"
        className="btn-shine-sweep btn-ripple inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-container text-white font-bold text-label-md font-label-md shadow-[0_0_25px_rgba(255,109,41,0.6)] hover:scale-105 active:scale-95 transition-all"
      >
        <span>Return to Stage</span>
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </Link>
    </div>
  );
}
