'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { REEL_PORTFOLIO, INSTAGRAM_PAGE_URL } from '@/lib/data';
import { getHeroSlides } from '@/lib/cmsServices';

// Overlapping fanned-out 3D reel portfolio carousel displaying clean photo stills with Instagram redirection
export default function PortfolioCarousel({ onShowToast }) {
  const [reels, setReels] = useState(REEL_PORTFOLIO);
  const [activeReelIndex, setActiveReelIndex] = useState(3); // Center card active by default
  const [windowWidth, setWindowWidth] = useState(1200);

  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const hasDragged = useRef(false);

  const totalCards = reels.length;

  // Load latest dynamic hero slides from CMS / Firestore
  useEffect(() => {
    getHeroSlides()
      .then((slides) => {
        if (slides && slides.length > 0) {
          const activeSlides = slides.filter((s) => s.enabled !== false);
          if (activeSlides.length > 0) {
            setReels(activeSlides);
            setActiveReelIndex((prev) => Math.min(prev, Math.floor(activeSlides.length / 2)));
          }
        }
      })
      .catch(() => {});
  }, []);

  // Track window width for responsive 3D card layout calculations
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute transform styles for each card based on activeReelIndex
  const getCardStyle = useCallback(
    (index) => {
      const isMobile = windowWidth < 640;
      const isTablet = windowWidth >= 640 && windowWidth < 1024;

      let spacing = 175;
      if (isMobile) {
        spacing = Math.min(Math.round(windowWidth * 0.28), 120);
      } else if (isTablet) {
        spacing = 130;
      }

      let diff = (index - activeReelIndex) % totalCards;
      if (diff > Math.floor(totalCards / 2)) diff -= totalCards;
      if (diff < -Math.floor(totalCards / 2)) diff += totalCards;

      const absDiff = Math.abs(diff);

      let tx = 0,
        ty = 0,
        scale = 1,
        rot = 0,
        zIndex = 10,
        opacity = 1,
        filter = 'brightness(1)',
        pointerEvents = 'auto';

      if (isMobile) {
        // Pure horizontal sliding animation on mobile - zero 3D rotation, zero tilt, zero vertical drop
        const cardWidth = Math.min(Math.round(windowWidth * 0.72), 260);
        const cardGap = 16;
        const mobileSpacing = cardWidth + cardGap;
        tx = diff * mobileSpacing;
        ty = 0;
        rot = 0;
        scale = absDiff === 0 ? 1 : 0.94;
        zIndex = absDiff === 0 ? 30 : 20 - absDiff;
        opacity = absDiff === 0 ? 1 : absDiff === 1 ? 0.72 : 0;
        filter = absDiff === 0 ? 'brightness(1) contrast(1)' : 'brightness(0.8) contrast(0.95)';
        pointerEvents = absDiff <= 1 ? 'auto' : 'none';
      } else if (isTablet) {
        tx = diff * spacing;
        ty = absDiff === 0 ? 0 : absDiff === 1 ? 10 : absDiff === 2 ? 20 : 30;
        scale = absDiff === 0 ? 1.08 : absDiff === 1 ? 0.92 : absDiff === 2 ? 0.78 : 0.65;
        rot = diff === 0 ? 0 : diff < 0 ? (diff === -1 ? -4.5 : diff === -2 ? -9 : -13) : diff === 1 ? 4.5 : diff === 2 ? 9 : 13;
        zIndex = absDiff === 0 ? 30 : absDiff === 1 ? 20 : absDiff === 2 ? 10 : 5;
        opacity = absDiff === 0 ? 1 : absDiff === 1 ? 0.9 : absDiff === 2 ? 0.72 : (absDiff === 3 ? 0.35 : 0);
        filter =
          absDiff === 0
            ? 'brightness(1) contrast(1)'
            : absDiff === 1
            ? 'brightness(0.9) contrast(0.96)'
            : absDiff === 2
            ? 'brightness(0.78) contrast(0.92)'
            : 'brightness(0.65) contrast(0.88)';
      } else {
        tx = diff * spacing;
        ty = absDiff === 0 ? 0 : absDiff === 1 ? 12 : absDiff === 2 ? 24 : 36;
        scale = absDiff === 0 ? 1.1 : absDiff === 1 ? 0.95 : absDiff === 2 ? 0.82 : 0.70;
        rot = diff === 0 ? 0 : diff < 0 ? (diff === -1 ? -5.5 : diff === -2 ? -11 : -16) : diff === 1 ? 5.5 : diff === 2 ? 11 : 16;
        zIndex = absDiff === 0 ? 30 : absDiff === 1 ? 20 : absDiff === 2 ? 10 : 5;
        opacity = absDiff === 0 ? 1 : absDiff === 1 ? 0.94 : absDiff === 2 ? 0.82 : (absDiff === 3 ? 0.65 : 0);
        filter =
          absDiff === 0
            ? 'brightness(1) contrast(1)'
            : absDiff === 1
            ? 'brightness(0.92) contrast(0.98)'
            : absDiff === 2
            ? 'brightness(0.84) contrast(0.94)'
            : 'brightness(0.74) contrast(0.90)';
      }

      return {
        '--slot-tx': `${tx}px`,
        '--slot-scale': `${scale}`,
        transform: isMobile
          ? `translateX(calc(-50% + ${tx}px)) translateY(-50%) scale(${scale})`
          : `translateX(calc(-50% + ${tx}px)) translateY(calc(-50% + ${ty}px)) scale(${scale}) rotate(${rot}deg)`,
        zIndex,
        opacity,
        filter,
        pointerEvents,
        visibility: opacity === 0 ? 'hidden' : 'visible',
      };
    },
    [activeReelIndex, totalCards, windowWidth]
  );

  // Center on a card
  const selectCard = useCallback(
    (index) => {
      const nextIndex = (index + totalCards) % totalCards;
      setActiveReelIndex(nextIndex);
    },
    [totalCards]
  );

  // Redirect to Instagram page
  const openInstagram = useCallback(
    (reel) => {
      const url = reel?.instagramUrl || INSTAGRAM_PAGE_URL;
      if (typeof window !== 'undefined') {
        window.open(url, '_blank', 'noopener,noreferrer');
        onShowToast?.({
          title: 'Opening Instagram',
          message: 'Redirecting to @reelxpress___ on Instagram',
          icon: 'open_in_new',
          visible: true,
        });
      }
    },
    [onShowToast]
  );

  // Handle card click: clicking center card redirects to Instagram; clicking side card centers it
  const handleCardClick = useCallback(
    (index) => {
      if (hasDragged.current) return;
      if (index === activeReelIndex) {
        openInstagram(reels[index]);
      } else {
        selectCard(index);
      }
    },
    [activeReelIndex, openInstagram, selectCard, reels]
  );

  // Touch and swipe gestures
  const handleTouchStart = (e) => {
    dragStartX.current = e.changedTouches[0].clientX;
    dragStartY.current = e.changedTouches[0].clientY;
    hasDragged.current = false;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - dragStartX.current;
    const diffY = endY - dragStartY.current;

    if (Math.abs(diffX) > 30 && Math.abs(diffX) > Math.abs(diffY)) {
      hasDragged.current = true;
      if (diffX > 0) {
        selectCard(activeReelIndex - 1);
      } else {
        selectCard(activeReelIndex + 1);
      }
    }
  };

  return (
    <div id="fanned-carousel-container" className="my-6 md:my-10 relative w-full overflow-hidden sm:overflow-visible">
      {/* 3D Perspective Stage Track */}
      <div
        id="fanned-carousel-track"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {reels.map((reel, index) => {
          const isCenter = index === activeReelIndex;
          const cardStyle = getCardStyle(index);

          return (
            <div
              key={reel.id}
              onClick={() => handleCardClick(index)}
              style={cardStyle}
              className={`fanned-card group cursor-pointer overflow-hidden ${
                isCenter ? 'is-active ring-1 ring-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)]' : 'ring-1 ring-white/10'
              }`}
              data-reel={index}
              role="button"
              tabIndex={0}
              aria-label={`View reel on Instagram`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(index);
                }
              }}
            >
              {/* Single Frame / Photo of the Video - Explicit width/height to prevent layout shift */}
              <img
                src={reel.poster}
                alt={reel.title || 'Reel Photo'}
                width={290}
                height={516}
                loading={isCenter ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Subtle interactive hover highlight (zero text, purely the photo) */}
              <div
                className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center z-10"
                aria-hidden="true"
              >
                <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls: Prev Arrow, Pagination Dots, Next Arrow */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 md:mt-8 relative z-20">
        <button
          onClick={() => selectCard(activeReelIndex - 1)}
          aria-label="Previous Reel Card"
          className="w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] rounded-full bg-surface-glass border border-white/15 text-white flex items-center justify-center hover:bg-primary-container hover:border-primary-container hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer touch-manipulation"
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">arrow_back</span>
        </button>

        {/* Pagination Dots */}
        <div id="carousel-dots" className="flex items-center gap-1.5 sm:gap-2 py-2">
          {reels.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => selectCard(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className="p-1.5 cursor-pointer touch-manipulation group flex items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-200 ${
                  dotIdx === activeReelIndex
                    ? 'w-6 h-2 bg-primary-container shadow-[0_0_8px_rgba(255,109,41,0.7)]'
                    : 'w-2 h-2 bg-white/30 group-hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => selectCard(activeReelIndex + 1)}
          aria-label="Next Reel Card"
          className="w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] rounded-full bg-surface-glass border border-white/15 text-white flex items-center justify-center hover:bg-primary-container hover:border-primary-container hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer touch-manipulation"
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
