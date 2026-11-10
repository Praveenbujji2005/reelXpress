/**
 * reelXpress - Cinematic Landing Page Controller
 * Advanced Production-Grade Frontend Engine
 * Complete Custom Video Player & Reference 2 Fanned Carousel
 */ 

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Lenis Smooth Scrolling Engine Initialization
  // ---------------------------------------------------------------------------
  function initSmoothScrolling() {
    if (typeof Lenis === 'undefined') {
      console.warn('Lenis smooth scroll library not found. Falling back to native scrolling.');
      return;
    }

    // Respect user's reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.info('Reduced motion preferred: Lenis smooth scroll disabled.');
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false, // Keep touch scrolling 100% native on mobile & touchscreens
      autoRaf: false,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Dynamic header height measurement for precise scroll alignment
    function getHeaderOffset() {
      const header = document.querySelector('header');
      if (!header) return -80;
      const rect = header.getBoundingClientRect();
      return -(Math.round(rect.height) + 24);
    }

    // Anchor smooth scrolling integration via Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId) return;

        // "Scroll to top" behavior for href="#" or href="#top"
        if (targetId === '#' || targetId === '#top') {
          e.preventDefault();
          if (typeof closeMobileMenu === 'function') closeMobileMenu();
          lenis.scrollTo(0, { duration: 1.2 });
          return;
        }

        if (targetId.length <= 1) return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          if (typeof closeMobileMenu === 'function') closeMobileMenu();
          lenis.scrollTo(targetElement, {
            offset: getHeaderOffset(),
            duration: 1.2,
          });
        }
      });
    });

    // Support dedicated scroll-to-top buttons
    document.querySelectorAll('[data-scroll-to-top], .scroll-to-top, #scroll-to-top').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.2 });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 2. Reading Progress Bar & Header Glass Effect (GPU Composited & Throttled)
  // ---------------------------------------------------------------------------
  function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    const header = document.querySelector('header');

    let ticking = false;

    function updateProgress(scrollTop, maxScroll) {
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;

      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }

      if (header) {
        if (scrollTop > 40) {
          header.classList.add('shadow-[0_10px_30px_rgba(0,0,0,0.8)]', 'bg-surface-deep/95');
        } else {
          header.classList.remove('shadow-[0_10px_30px_rgba(0,0,0,0.8)]', 'bg-surface-deep/95');
        }
      }
    }

    // Connect to Lenis scroll event if active, with fallback to throttled passive scroll listener
    if (window.lenis) {
      window.lenis.on('scroll', ({ scroll, limit }) => {
        updateProgress(scroll, limit);
      });
    } else {
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            updateProgress(scrollTop, docHeight);
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  }

  // ---------------------------------------------------------------------------
  // 3. Cinematic Scroll Reveal (Intersection Observer)
  // ---------------------------------------------------------------------------
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-scale-on-scroll, .stagger-grid > *'
    );

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12,
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // ---------------------------------------------------------------------------
  // 4. Live Statistics Count-Up Animation
  // ---------------------------------------------------------------------------
  function initCounters() {
    const statElements = document.querySelectorAll('.counter-value');
    if (!statElements.length) return;

    let countersStarted = false;

    const statsBar = document.querySelector('.bg-surface-glass.spotlight-card');
    if (!statsBar) {
      animateCounters();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          countersStarted = true;
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(statsBar);

    function animateCounters() {
      statElements.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-target')) || 0;
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2200;
        const startTime = performance.now();

        function updateCounter(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = easeOut * target;

          if (target % 1 === 0) {
            el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
          } else {
            el.textContent = prefix + current.toFixed(1) + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = prefix + target.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 5. Interactive Mouse Spotlight Glow on Glass Cards
  // ---------------------------------------------------------------------------
  function initSpotlightCards() {
    const spotlightCards = document.querySelectorAll('.spotlight-card');

    spotlightCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', '-500px');
        card.style.setProperty('--mouse-y', '-500px');
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 6. Reference 2 Overlapping Fanned-Out Portfolio Carousel Controller
  // ---------------------------------------------------------------------------
  let activeReelIndex = 2; // Default to center card (Reel 3, index 2)
  const totalCards = 5;

  function initFannedCarousel() {
    const track = document.getElementById('fanned-carousel-track');
    const cards = document.querySelectorAll('.fanned-card');
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    const dots = document.querySelectorAll('#carousel-dots .carousel-dot');
    const counterNumEl = document.getElementById('current-carousel-num');

    if (!track || !cards.length) return;

    function updateCarousel(newIndex) {
      activeReelIndex = (newIndex + totalCards) % totalCards;

      const width = window.innerWidth;
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;

      // Responsive spacing calculation
      let spacing;
      if (isMobile) {
        // Proportional spacing so flanking cards peek smoothly from the screen edges
        spacing = Math.min(Math.round(width * 0.28), 120);
      } else if (isTablet) {
        spacing = 135;
      } else {
        spacing = 190;
      }

      cards.forEach((card, i) => {
        let diff = (i - activeReelIndex) % totalCards;
        if (diff > Math.floor(totalCards / 2)) diff -= totalCards;
        if (diff < -Math.floor(totalCards / 2)) diff += totalCards;

        const absDiff = Math.abs(diff);

        let tx, ty, scale, rot, zIndex, opacity, filter, pointerEvents;

        if (isMobile) {
          // Mobile Presentation: Hero center card + peek cards left and right
          if (absDiff === 0) {
            tx = 0;
            ty = 0;
            scale = 1.04;
            rot = 0;
            zIndex = 30;
            opacity = 1;
            filter = 'brightness(1) contrast(1)';
            pointerEvents = 'auto';
          } else if (absDiff === 1) {
            tx = diff * spacing;
            ty = 8;
            scale = 0.86;
            rot = diff < 0 ? -4 : 4;
            zIndex = 20;
            opacity = 0.65;
            filter = 'brightness(0.85) contrast(0.95)';
            pointerEvents = 'auto';
          } else {
            // Far cards (absDiff >= 2) - safely hidden and non-interactive on mobile
            tx = diff * (spacing * 1.5);
            ty = 16;
            scale = 0.70;
            rot = diff < 0 ? -8 : 8;
            zIndex = 5;
            opacity = 0;
            filter = 'brightness(0.7) contrast(0.9)';
            pointerEvents = 'none';
          }
        } else if (isTablet) {
          // Tablet: 5 cards fanned with balanced spacing
          tx = diff * spacing;
          ty = absDiff === 0 ? 0 : (absDiff === 1 ? 10 : 20);
          scale = absDiff === 0 ? 1.08 : (absDiff === 1 ? 0.92 : 0.78);
          rot = diff === 0 ? 0 : (diff < 0 ? (diff === -1 ? -4.5 : -9) : (diff === 1 ? 4.5 : 9));
          zIndex = absDiff === 0 ? 30 : (absDiff === 1 ? 20 : 10);
          opacity = absDiff === 0 ? 1 : (absDiff === 1 ? 0.90 : 0.72);
          filter = absDiff === 0 ? 'brightness(1) contrast(1)' : (absDiff === 1 ? 'brightness(0.9) contrast(0.96)' : 'brightness(0.78) contrast(0.92)');
          pointerEvents = 'auto';
        } else {
          // Desktop: 5 cards fanned out with Reference 2 luxury styling
          tx = diff * spacing;
          ty = absDiff === 0 ? 0 : (absDiff === 1 ? 12 : 24);
          scale = absDiff === 0 ? 1.10 : (absDiff === 1 ? 0.95 : 0.82);
          rot = diff === 0 ? 0 : (diff < 0 ? (diff === -1 ? -5.5 : -11) : (diff === 1 ? 5.5 : 11));
          zIndex = absDiff === 0 ? 30 : (absDiff === 1 ? 20 : 10);
          opacity = absDiff === 0 ? 1 : (absDiff === 1 ? 0.92 : 0.76);
          filter = absDiff === 0 ? 'brightness(1) contrast(1)' : (absDiff === 1 ? 'brightness(0.9) contrast(0.96)' : 'brightness(0.78) contrast(0.92)');
          pointerEvents = 'auto';
        }

        // Save slot positioning in CSS variables so hover transforms preserve coordinate context
        card.style.setProperty('--slot-tx', `${tx}px`);
        card.style.setProperty('--slot-scale', `${scale}`);

        card.style.transform = `translateX(calc(-50% + ${tx}px)) translateY(calc(-50% + ${ty}px)) scale(${scale}) rotate(${rot}deg)`;
        card.style.zIndex = zIndex;
        card.style.opacity = opacity;
        card.style.filter = filter;
        card.style.pointerEvents = pointerEvents;

        if (diff === 0) {
          card.classList.add('is-active');
        } else {
          card.classList.remove('is-active');
        }
      });

      // Update Pagination Dots
      dots.forEach((dot, idx) => {
        if (idx === activeReelIndex) {
          dot.classList.add('active');
          dot.style.width = '28px';
          dot.style.background = '#ff6d29';
          dot.style.boxShadow = '0 0 12px #ff6d29';
        } else {
          dot.classList.remove('active');
          dot.style.width = '8px';
          dot.style.background = 'rgba(255, 255, 255, 0.28)';
          dot.style.boxShadow = 'none';
        }
      });

      // Update Counter
      if (counterNumEl) {
        counterNumEl.textContent = activeReelIndex + 1;
      }
    }

    function stopAllCardAudio() {
      cards.forEach((card) => {
        card.classList.remove('is-playing');
        const v = card.querySelector('video');
        const ic = card.querySelector('.reel-glass-play-icon');
        if (v) {
          v.muted = true;
          v.pause();
        }
        if (ic) ic.textContent = 'play_arrow';
      });
    }

    function toggleCardAudioPlay(cardIndex) {
      const targetCard = cards[cardIndex];
      if (!targetCard) return;
      const video = targetCard.querySelector('video');
      const playIcon = targetCard.querySelector('.reel-glass-play-icon');

      const isAlreadyPlaying = targetCard.classList.contains('is-playing');

      if (isAlreadyPlaying) {
        // Pause audio/video and restore play button to full size
        if (video) video.pause();
        targetCard.classList.remove('is-playing');
        if (playIcon) playIcon.textContent = 'play_arrow';
        showToast('Video Paused', 'pause', 'Reel Audio');
        return;
      }

      // Stop and mute any other playing card
      cards.forEach((otherCard, idx) => {
        if (idx !== cardIndex) {
          otherCard.classList.remove('is-playing');
          const otherVideo = otherCard.querySelector('video');
          const otherIcon = otherCard.querySelector('.reel-glass-play-icon');
          if (otherVideo) {
            otherVideo.muted = true;
            otherVideo.pause();
          }
          if (otherIcon) otherIcon.textContent = 'play_arrow';
        }
      });

      // Align this card to center in carousel if not already centered
      if (cardIndex !== activeReelIndex) {
        updateCarousel(cardIndex);
      }

      // Play video with audio directly right here on the card (NO POPUP)
      if (video) {
        video.muted = false;
        video.volume = 1.0;
        if (video.paused || video.ended) {
          video.currentTime = 0;
        }
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            targetCard.classList.add('is-playing');
            if (playIcon) playIcon.textContent = 'pause';
            showToast('Playing with Sound 🔊', 'volume_up', 'Reel Audio Active');
          }).catch((err) => {
            console.warn('Playback error with audio, retrying:', err);
            video.muted = false;
            video.play().then(() => {
              targetCard.classList.add('is-playing');
              if (playIcon) playIcon.textContent = 'pause';
            }).catch(() => {});
          });
        }
      }
    }

    // Previous and Next Buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        stopAllCardAudio();
        updateCarousel(activeReelIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        stopAllCardAudio();
        updateCarousel(activeReelIndex + 1);
      });
    }

    // Pagination Dots Click
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(targetIndex)) {
          stopAllCardAudio();
          updateCarousel(targetIndex);
        }
      });
    });

    // Shared drag state for both touch and mouse gestures
    let hasDragged = false;

    // Card and Play Button Clicks: Inline Playback with Sound and Reduced Play Button (NO POPUP)
    cards.forEach((card) => {
      const idx = parseInt(card.getAttribute('data-reel'), 10);
      const playBtn = card.querySelector('.hero-glass-btn');

      // Click on Play Button directly
      if (playBtn) {
        playBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (hasDragged) return;
          toggleCardAudioPlay(idx);
        });
      }

      // Click anywhere on Card
      card.addEventListener('click', () => {
        if (hasDragged) return;
        // If clicking on an inactive flanking card, center that card first!
        if (idx !== activeReelIndex) {
          stopAllCardAudio();
          updateCarousel(idx);
          return;
        }
        // If clicking the active center card, toggle video and audio playback!
        toggleCardAudioPlay(idx);
      });
    });

    // Touch Swipe Gestures
    let touchStartX = 0;
    let touchStartY = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
      hasDragged = false;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      const currentX = e.changedTouches[0].clientX;
      if (Math.abs(currentX - touchStartX) > 10) {
        hasDragged = true;
      }
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        hasDragged = true;
        stopAllCardAudio();
        if (diffX < 0) {
          updateCarousel(activeReelIndex + 1);
        } else {
          updateCarousel(activeReelIndex - 1);
        }
      }
      if (hasDragged) {
        setTimeout(() => {
          hasDragged = false;
        }, 120);
      }
    }, { passive: true });

    // Mouse Drag Support
    let mouseStartX = 0;
    let isMouseDown = false;

    track.addEventListener('mousedown', (e) => {
      if (e.target.closest('button')) return;
      mouseStartX = e.clientX;
      isMouseDown = true;
      hasDragged = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      if (Math.abs(e.clientX - mouseStartX) > 8) {
        hasDragged = true;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const diffX = e.clientX - mouseStartX;
      if (Math.abs(diffX) > 40) {
        stopAllCardAudio();
        if (diffX < 0) {
          updateCarousel(activeReelIndex + 1);
        } else {
          updateCarousel(activeReelIndex - 1);
        }
      }
      setTimeout(() => {
        hasDragged = false;
      }, 100);
    });

    // Dynamic responsive recalculation on resize
    window.addEventListener('resize', () => {
      updateCarousel(activeReelIndex);
    });

    // Initialize carousel layout
    updateCarousel(activeReelIndex);
    window.updateFannedCarousel = updateCarousel;
  }

  // ---------------------------------------------------------------------------
  // 7. Mobile Menu Drawer Controller
  // ---------------------------------------------------------------------------
  let isMenuOpen = false;

  function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu-drawer') || document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('mobile-menu-icon') || document.getElementById('menu-icon');
    if (!mobileMenu) return;

    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
    if (menuIcon) menuIcon.textContent = 'menu';
    isMenuOpen = false;
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();
  }

  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-drawer') || document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('mobile-menu-icon') || document.getElementById('menu-icon');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      if (isMenuOpen) {
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
        if (menuIcon) menuIcon.textContent = 'close';
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop();
      } else {
        closeMobileMenu();
      }
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // ---------------------------------------------------------------------------
  // 8. Toast Notification System
  // ---------------------------------------------------------------------------
  let toastTimeout = null;

  function showToast(message, iconName = 'check_circle', title = 'reelXpress') {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-msg');
    const toastTitle = document.getElementById('toast-title');
    const toastIcon = document.getElementById('toast-icon');

    if (!toast) return;

    if (toastMsg) toastMsg.textContent = message;
    if (toastTitle) toastTitle.textContent = title;
    if (toastIcon) {
      toastIcon.innerHTML = `<span class="material-symbols-outlined text-lg">${iconName}</span>`;
    }

    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    toast.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    }, 3200);
  }

  // ---------------------------------------------------------------------------
  // 9. Full-Featured Cinematic Custom Video Player Modal Controller
  // ---------------------------------------------------------------------------
  const reelData = [
    {
      title: '90-Day Athletic Cut',
      category: 'Fitness & Training',
      creator: 'Shot by Rahul V. • Certified Creator',
      views: '185K',
      videoSrc: 'assets/Video1.mp4'
    },
    {
      title: 'Bespoke Resort Tour',
      category: 'Luxury Hospitality',
      creator: 'Shot by Priya M. • Elite Cinematic Lead',
      views: '420K',
      videoSrc: 'assets/Video2.mp4'
    },
    {
      title: 'Streetwear Drop Launch',
      category: 'E-Commerce Fashion',
      creator: 'Shot by Arvind K. • Senior Motion Specialist',
      views: '890K',
      videoSrc: 'assets/Video3.mp4'
    },
    {
      title: 'Artisan Cocktail Pour',
      category: 'Café & Nightlife',
      creator: 'Shot by Sneha D. • Visual Storyteller',
      views: '310K',
      videoSrc: 'assets/Video4.mp4'
    },
    {
      title: 'Sunburn Arena Aftermovie',
      category: 'Creator Content',
      creator: 'Shot by Vikram S. • Festival Media Director',
      views: '640K',
      videoSrc: 'assets/Video5.mp4'
    }
  ];

  let modalEl = null;
  let modalCardEl = null;
  let modalVideoEl = null;
  let modalCategoryEl = null;
  let modalViewsEl = null;
  let modalTitleEl = null;
  let modalCreatorEl = null;

  let centerPlayBtn = null;
  let centerPlayIcon = null;
  let loadingSpinner = null;
  let errorOverlay = null;
  let retryBtn = null;
  let unmutePrompt = null;
  let unmuteBtn = null;

  let controlsDeck = null;
  let progressContainer = null;
  let bufferedBar = null;
  let progressBar = null;
  let scrubThumb = null;
  let timeTooltip = null;

  let playBtn = null;
  let playIcon = null;
  let volumeBtn = null;
  let volumeIcon = null;
  let volumeSlider = null;
  let currentTimeEl = null;
  let durationTimeEl = null;

  let speedBtn = null;
  let currentSpeedEl = null;
  let speedMenu = null;
  let speedOpts = [];

  let pipBtn = null;
  let fullscreenBtn = null;
  let fullscreenIcon = null;
  let closeBtn = null;
  let heartBtn = null;
  let heartIcon = null;
  let shareBtn = null;

  let currentVolume = 1.0;
  let currentSpeed = 1.0;
  let isLiked = false;
  let currentReelIndex = 0;
  let controlsHideTimeout = null;

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function setPlayState(isPlaying) {
    if (playIcon) {
      playIcon.textContent = isPlaying ? 'pause' : 'play_arrow';
    }
    if (centerPlayIcon) {
      centerPlayIcon.textContent = isPlaying ? 'pause' : 'play_arrow';
    }
    if (centerPlayBtn) {
      if (isPlaying) {
        centerPlayBtn.classList.add('splash-hidden');
      } else {
        centerPlayBtn.classList.remove('splash-hidden');
      }
    }
  }

  function updateVolumeUI() {
    if (!modalVideoEl) return;
    const isMuted = modalVideoEl.muted || modalVideoEl.volume === 0;
    if (volumeSlider) {
      volumeSlider.value = isMuted ? 0 : modalVideoEl.volume;
    }
    if (volumeIcon) {
      if (isMuted) {
        volumeIcon.textContent = 'volume_off';
      } else if (modalVideoEl.volume < 0.5) {
        volumeIcon.textContent = 'volume_down';
      } else {
        volumeIcon.textContent = 'volume_up';
      }
    }
  }

  function updateProgressUI() {
    if (!modalVideoEl || !modalVideoEl.duration) return;
    const current = modalVideoEl.currentTime;
    const duration = modalVideoEl.duration;
    const percent = (current / duration) * 100;

    if (progressBar) progressBar.style.width = percent + '%';
    if (scrubThumb) scrubThumb.style.left = percent + '%';
    if (currentTimeEl) currentTimeEl.textContent = formatTime(current);
    if (durationTimeEl) durationTimeEl.textContent = formatTime(duration);

    // Update buffered progress
    if (modalVideoEl.buffered && modalVideoEl.buffered.length > 0 && bufferedBar) {
      try {
        const bufferedEnd = modalVideoEl.buffered.end(modalVideoEl.buffered.length - 1);
        const bufferedPercent = (bufferedEnd / duration) * 100;
        bufferedBar.style.width = Math.min(100, bufferedPercent) + '%';
      } catch (e) {}
    }
  }

  function resetControlsTimer() {
    if (controlsHideTimeout) clearTimeout(controlsHideTimeout);
    if (!controlsDeck) return;
    controlsDeck.classList.remove('controls-hidden');

    if (modalVideoEl && !modalVideoEl.paused && !modalVideoEl.ended) {
      controlsHideTimeout = setTimeout(() => {
        if (modalVideoEl && !modalVideoEl.paused && !modalVideoEl.ended) {
          controlsDeck.classList.add('controls-hidden');
        }
      }, 2500);
    }
  }

  function togglePlayPause() {
    if (!modalVideoEl) return;
    if (modalVideoEl.paused || modalVideoEl.ended) {
      modalVideoEl.play().then(() => {
        setPlayState(true);
        resetControlsTimer();
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    } else {
      modalVideoEl.pause();
      setPlayState(false);
      resetControlsTimer();
    }
  }

  function seekToPosition(clientX) {
    if (!progressContainer || !modalVideoEl || !modalVideoEl.duration) return;
    const rect = progressContainer.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;
    ratio = Math.max(0, Math.min(1, ratio));
    modalVideoEl.currentTime = ratio * modalVideoEl.duration;
    updateProgressUI();
  }

  function toggleFullscreen() {
    if (!modalCardEl) return;
    if (!document.fullscreenElement) {
      if (modalCardEl.requestFullscreen) {
        modalCardEl.requestFullscreen().catch(() => {});
      } else if (modalVideoEl && modalVideoEl.requestFullscreen) {
        modalVideoEl.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  function openReelModal(index) {
    // Pop-up modal completely disabled per user requirement:
    // "disable the pop up of the video"
    return;
  }

  function closeReelModal() {
    if (controlsHideTimeout) clearTimeout(controlsHideTimeout);

    // 1. Hide modal with reverse animation
    if (modalEl && modalCardEl) {
      modalEl.classList.remove('modal-active');
      setTimeout(() => {
        modalEl.classList.remove('opacity-100', 'pointer-events-auto');
        modalEl.classList.add('opacity-0', 'pointer-events-none');
      }, 300);
    }

    // 2. Stop and clear video
    if (modalVideoEl) {
      modalVideoEl.pause();
      modalVideoEl.currentTime = 0;
      modalVideoEl.removeAttribute('src');
    }

    // 3. Restore background scrolling
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();

    // 4. Resume preview videos on background cards
    document.querySelectorAll('#fanned-carousel-track video').forEach((v) => {
      v.play().catch(() => {});
    });
  }

  function toggleLike(e) {
    if (e) e.stopPropagation();
    isLiked = !isLiked;
    if (heartIcon) {
      heartIcon.style.color = isLiked ? '#ff4757' : 'white';
      heartIcon.style.transform = isLiked ? 'scale(1.35)' : 'scale(1)';
      setTimeout(() => {
        if (heartIcon) heartIcon.style.transform = 'scale(1)';
      }, 200);
    }
    showToast(isLiked ? 'Added to Favorites!' : 'Removed from Favorites', isLiked ? 'favorite' : 'info');
  }

  function shareReel(e) {
    if (e) e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    showToast('Reel link copied to clipboard!', 'share');
  }

  function initReelModal() {
    modalEl = document.getElementById('reel-modal');
    modalCardEl = document.getElementById('reel-modal-card');
    modalVideoEl = document.getElementById('modal-video-element');
    modalCategoryEl = document.getElementById('modal-category');
    modalViewsEl = document.getElementById('modal-views');
    modalTitleEl = document.getElementById('modal-title');
    modalCreatorEl = document.getElementById('modal-creator');

    centerPlayBtn = document.getElementById('player-center-play-btn');
    centerPlayIcon = document.getElementById('player-center-play-icon');
    loadingSpinner = document.getElementById('player-loading-spinner');
    errorOverlay = document.getElementById('player-error-overlay');
    retryBtn = document.getElementById('player-retry-btn');
    unmutePrompt = document.getElementById('player-unmute-prompt');
    unmuteBtn = document.getElementById('player-unmute-btn');

    controlsDeck = document.getElementById('player-controls-deck');
    progressContainer = document.getElementById('player-progress-container');
    bufferedBar = document.getElementById('player-buffered-bar');
    progressBar = document.getElementById('player-progress-bar');
    scrubThumb = document.getElementById('player-scrub-thumb');
    timeTooltip = document.getElementById('player-time-tooltip');

    playBtn = document.getElementById('player-play-btn');
    playIcon = document.getElementById('player-play-icon');
    volumeBtn = document.getElementById('player-volume-btn');
    volumeIcon = document.getElementById('player-volume-icon');
    volumeSlider = document.getElementById('player-volume-slider');
    currentTimeEl = document.getElementById('player-current-time');
    durationTimeEl = document.getElementById('player-duration-time');

    speedBtn = document.getElementById('player-speed-btn');
    currentSpeedEl = document.getElementById('player-current-speed');
    speedMenu = document.getElementById('player-speed-menu');
    speedOpts = document.querySelectorAll('.speed-opt');

    pipBtn = document.getElementById('player-pip-btn');
    fullscreenBtn = document.getElementById('player-fullscreen-btn');
    fullscreenIcon = document.getElementById('player-fullscreen-icon');
    closeBtn = document.getElementById('close-reel-modal-btn');
    heartBtn = document.getElementById('modal-heart-btn');
    heartIcon = document.getElementById('heart-icon');
    shareBtn = document.getElementById('modal-share-btn');

    if (!modalVideoEl) return;

    // Video Lifecycle Events
    modalVideoEl.addEventListener('timeupdate', updateProgressUI);
    modalVideoEl.addEventListener('progress', updateProgressUI);

    modalVideoEl.addEventListener('waiting', () => {
      if (loadingSpinner) loadingSpinner.classList.remove('hidden');
    });

    modalVideoEl.addEventListener('canplay', () => {
      if (loadingSpinner) loadingSpinner.classList.add('hidden');
      updateProgressUI();
    });

    modalVideoEl.addEventListener('playing', () => {
      if (loadingSpinner) loadingSpinner.classList.add('hidden');
      setPlayState(true);
      resetControlsTimer();
    });

    modalVideoEl.addEventListener('pause', () => {
      setPlayState(false);
      resetControlsTimer();
    });

    modalVideoEl.addEventListener('ended', () => {
      modalVideoEl.currentTime = 0;
      modalVideoEl.play().catch(() => {});
    });

    modalVideoEl.addEventListener('error', () => {
      if (loadingSpinner) loadingSpinner.classList.add('hidden');
      if (errorOverlay) errorOverlay.classList.remove('hidden');
    });

    // Center Play Button & Surface Click
    if (centerPlayBtn) {
      centerPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayPause();
      });
    }

    const videoSurface = document.getElementById('modal-video-surface');
    if (videoSurface) {
      videoSurface.addEventListener('click', (e) => {
        // Ignore clicks on overlays/buttons
        if (e.target.closest('button')) return;
        togglePlayPause();
      });
    }

    // Play/Pause Button in Bottom Bar
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayPause();
      });
    }

    // Volume Slider & Mute Toggle
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        e.stopPropagation();
        const val = parseFloat(volumeSlider.value);
        currentVolume = val;
        modalVideoEl.volume = val;
        modalVideoEl.muted = val === 0;
        updateVolumeUI();
      });
    }

    if (volumeBtn) {
      volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        modalVideoEl.muted = !modalVideoEl.muted;
        if (!modalVideoEl.muted && modalVideoEl.volume === 0) {
          modalVideoEl.volume = 0.5;
          currentVolume = 0.5;
        }
        updateVolumeUI();
        showToast(modalVideoEl.muted ? 'Audio Muted' : 'Audio Unmuted', modalVideoEl.muted ? 'volume_off' : 'volume_up');
      });
    }

    // Unmute Prompt Button
    if (unmuteBtn) {
      unmuteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        modalVideoEl.muted = false;
        modalVideoEl.volume = currentVolume > 0 ? currentVolume : 1.0;
        if (unmutePrompt) unmutePrompt.classList.add('hidden');
        updateVolumeUI();
        showToast('Sound Unmuted 🔊', 'volume_up', 'Audio Active');
      });
    }

    // Scrubber Seeking & Tooltip Hover
    let isScrubbing = false;

    if (progressContainer) {
      progressContainer.addEventListener('mousedown', (e) => {
        isScrubbing = true;
        seekToPosition(e.clientX);
      });

      progressContainer.addEventListener('click', (e) => {
        seekToPosition(e.clientX);
      });

      progressContainer.addEventListener('mousemove', (e) => {
        if (!modalVideoEl.duration || !timeTooltip) return;
        const rect = progressContainer.getBoundingClientRect();
        let ratio = (e.clientX - rect.left) / rect.width;
        ratio = Math.max(0, Math.min(1, ratio));
        timeTooltip.textContent = formatTime(ratio * modalVideoEl.duration);
        timeTooltip.style.left = `${ratio * 100}%`;
      });
    }

    window.addEventListener('mousemove', (e) => {
      if (isScrubbing) {
        seekToPosition(e.clientX);
      }
    });

    window.addEventListener('mouseup', () => {
      if (isScrubbing) isScrubbing = false;
    });

    // Playback Speed Dropdown
    if (speedBtn) {
      speedBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (speedMenu) speedMenu.classList.toggle('hidden');
      });
    }

    speedOpts.forEach((opt) => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const spd = parseFloat(opt.getAttribute('data-speed'));
        if (!isNaN(spd)) {
          currentSpeed = spd;
          modalVideoEl.playbackRate = spd;
          if (currentSpeedEl) currentSpeedEl.textContent = `${spd}x`;
          speedOpts.forEach((o) => o.classList.remove('active'));
          opt.classList.add('active');
          if (speedMenu) speedMenu.classList.add('hidden');
          showToast(`Speed: ${spd}x`, 'speed', 'Playback Rate');
        }
      });
    });

    window.addEventListener('click', () => {
      if (speedMenu && !speedMenu.classList.contains('hidden')) {
        speedMenu.classList.add('hidden');
      }
    });

    // Picture-in-Picture
    if (pipBtn) {
      pipBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
          if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
          } else if (modalVideoEl.requestPictureInPicture) {
            await modalVideoEl.requestPictureInPicture();
          }
        } catch (err) {
          console.warn('PiP error:', err);
        }
      });
    }

    // Fullscreen Toggle
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFullscreen();
      });
    }

    document.addEventListener('fullscreenchange', () => {
      if (fullscreenIcon) {
        fullscreenIcon.textContent = document.fullscreenElement ? 'fullscreen_exit' : 'fullscreen';
      }
    });

    // Retry Playback Button on Error
    if (retryBtn) {
      retryBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (errorOverlay) errorOverlay.classList.add('hidden');
        if (loadingSpinner) loadingSpinner.classList.remove('hidden');
        const data = reelData[currentReelIndex] || reelData[2];
        modalVideoEl.src = data.videoSrc;
        modalVideoEl.play().then(() => {
          if (loadingSpinner) loadingSpinner.classList.add('hidden');
          setPlayState(true);
        }).catch(() => {
          if (loadingSpinner) loadingSpinner.classList.add('hidden');
          if (errorOverlay) errorOverlay.classList.remove('hidden');
        });
      });
    }

    // Close Modal Button & Backdrop
    if (closeBtn) closeBtn.addEventListener('click', closeReelModal);
    if (modalEl) {
      modalEl.addEventListener('click', (e) => {
        if (e.target === modalEl) closeReelModal();
      });
    }

    // Like & Share Buttons
    if (heartBtn) heartBtn.addEventListener('click', toggleLike);
    if (shareBtn) shareBtn.addEventListener('click', shareReel);

    // Auto-hide controls timer on mousemove / touch
    if (modalCardEl) {
      modalCardEl.addEventListener('mousemove', resetControlsTimer);
      modalCardEl.addEventListener('touchstart', resetControlsTimer, { passive: true });
    }

    // Comprehensive Keyboard Shortcuts Controller
    window.addEventListener('keydown', (e) => {
      if (!modalEl || modalEl.classList.contains('opacity-0')) return;

      if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeReelModal();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (modalVideoEl) {
          modalVideoEl.currentTime = Math.max(0, modalVideoEl.currentTime - 5);
          updateProgressUI();
          resetControlsTimer();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (modalVideoEl && modalVideoEl.duration) {
          modalVideoEl.currentTime = Math.min(modalVideoEl.duration, modalVideoEl.currentTime + 5);
          updateProgressUI();
          resetControlsTimer();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (modalVideoEl) {
          modalVideoEl.volume = Math.min(1, modalVideoEl.volume + 0.1);
          currentVolume = modalVideoEl.volume;
          modalVideoEl.muted = false;
          updateVolumeUI();
          resetControlsTimer();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (modalVideoEl) {
          modalVideoEl.volume = Math.max(0, modalVideoEl.volume - 0.1);
          currentVolume = modalVideoEl.volume;
          if (currentVolume === 0) modalVideoEl.muted = true;
          updateVolumeUI();
          resetControlsTimer();
        }
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        if (modalVideoEl) {
          modalVideoEl.muted = !modalVideoEl.muted;
          updateVolumeUI();
          resetControlsTimer();
          showToast(modalVideoEl.muted ? 'Audio Muted' : 'Audio Unmuted', modalVideoEl.muted ? 'volume_off' : 'volume_up');
        }
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 10. Booking Form & Confirmation Modal Controller
  // ---------------------------------------------------------------------------
  let bookingModalEl = null;

  function closeBookingModal() {
    if (!bookingModalEl) return;
    bookingModalEl.classList.remove('opacity-100', 'pointer-events-auto');
    bookingModalEl.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();
  }

  function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    bookingModalEl = document.getElementById('booking-modal');
    const closeBookingBtn = document.getElementById('close-booking-modal-btn');

    if (closeBookingBtn) {
      closeBookingBtn.addEventListener('click', closeBookingModal);
    }
    if (bookingModalEl) {
      bookingModalEl.addEventListener('click', (e) => {
        if (e.target === bookingModalEl) closeBookingModal();
      });
    }

    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>Securing Slot...</span>
          `;
        }

        const nameInput = document.getElementById('booking-name');
        const phoneInput = document.getElementById('booking-phone');
        const cityInput = document.getElementById('booking-city');
        const dateInput = document.getElementById('booking-date');

        const clientName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Creator';
        const clientDate = dateInput && dateInput.value ? dateInput.value : 'Selected Date';
        const clientCity = cityInput && cityInput.value ? cityInput.value : 'Hyderabad';

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }

          const confirmedName = document.getElementById('confirmed-name');
          const confirmedDate = document.getElementById('confirmed-date');
          const confirmedCity = document.getElementById('confirmed-city');

          if (confirmedName) confirmedName.textContent = clientName;
          if (confirmedDate) confirmedDate.textContent = clientDate;
          if (confirmedCity) confirmedCity.textContent = clientCity;

          if (bookingModalEl) {
            bookingModalEl.classList.remove('opacity-0', 'pointer-events-none');
            bookingModalEl.classList.add('opacity-100', 'pointer-events-auto');
            document.body.style.overflow = 'hidden';
            if (window.lenis) window.lenis.stop();
            if (typeof confetti === 'function') {
              confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
            }
          }
          bookingForm.reset();
        }, 800);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 11. Global Keyboard Listeners
  // ---------------------------------------------------------------------------
  function initKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeReelModal();
        closeBookingModal();
        closeMobileMenu();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 12. Public API Exports for inline callers & window access
  // ---------------------------------------------------------------------------
  window.openReelModal = openReelModal;
  window.closeReelModal = closeReelModal;
  window.toggleModalPlayback = togglePlayPause;
  window.toggleLike = toggleLike;
  window.shareReel = shareReel;
  window.closeBookingModal = closeBookingModal;
  window.closeMobileMenu = closeMobileMenu;
  window.showToast = showToast;
  window.goToSlide = function(idx) {
    if (window.updateFannedCarousel) window.updateFannedCarousel(idx);
  };

  // ---------------------------------------------------------------------------
  // 13. Application Bootstrap
  // ---------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

  function bootstrap() {
    initSmoothScrolling();
    initScrollProgress();
    initScrollReveal();
    initCounters();
    initSpotlightCards();
    initFannedCarousel();
    initMobileMenu();
    initReelModal();
    initBookingForm();
    initKeyboardListeners();
  }
})();
