# reelXpress | Next.js + React.js Application

India's 1st Reel-Maker Booking Platform converted to a modern, high-performance **Next.js (App Router)** and **React 19** application with Tailwind CSS, Lenis smooth scrolling, and custom 3D fanned video carousel interactions.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```text
reelexpress_website/
├── public/
│   ├── assets/              # Local video reels (Video1.mp4 - Video5.mp4)
│   └── screen.png           # Visual design references
├── src/
│   ├── app/
│   │   ├── globals.css      # Core design system, keyframes & animations
│   │   ├── layout.js        # Root metadata, fonts, ambient orbs & scroll progress
│   │   ├── loading.js       # App Router branded loading skeleton
│   │   ├── not-found.js     # Custom 404 error page
│   │   └── page.js          # Interactive single-page flow
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Sticky header with gold brand accents
│   │   │   ├── Footer.jsx          # Shared footer with branding & links
│   │   │   └── MobileMenu.jsx      # Animated slide-down navigation drawer
│   │   ├── providers/
│   │   │   └── SmoothScrollProvider.jsx # Lenis inertial smooth scroll provider
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx         # Headline, stats, and creative showcase
│   │   │   ├── PortfolioCarousel.jsx   # 3D fanned-out video portfolio carousel
│   │   │   ├── ServicesSection.jsx     # On-ground shoot capabilities & spotlight cards
│   │   │   ├── HowItWorksSection.jsx   # 5-step workflow with connecting energy beam
│   │   │   ├── PricingSection.jsx      # Transparent rates, conic border & unclipped Most Popular badge
│   │   │   ├── TestimonialsSection.jsx # Client reviews with 24k gold stars
│   │   │   ├── FaqSection.jsx          # Interactive collapsible accordion
│   │   │   ├── BookingSection.jsx      # Quick slot booking form
│   │   │   └── BrandWatermark.jsx      # Giant watermark billboard next to footer
│   │   └── ui/
│   │       ├── AmbientOrbs.jsx         # Floating background light orbs
│   │       ├── BookingModal.jsx        # Slot celebration modal with confetti burst
│   │       ├── ReelModal.jsx           # Full cinematic portrait lightbox video player
│   │       ├── ScrollProgress.jsx      # Top GPU-accelerated scroll depth bar
│   │       └── ToastNotification.jsx   # Feedback notification toasts
│   ├── hooks/
│   │   ├── useScrollPosition.js        # Tracks scroll percentage for progress indicator
│   │   └── useScrollReveal.js          # IntersectionObserver trigger for .reveal-on-scroll
│   └── lib/
│       ├── data.js                     # Centralized content, reels, pricing, FAQs
│       └── utils.js                    # Utility helpers (time formatting, classnames)
├── .env.example
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

---

## 🎨 Key Features & Migrations

1. **Next.js App Router**: Converted from plain HTML/JS to Next.js 16 with React 19 functional components and client-side hooks.
2. **3D Fanned-Out Video Portfolio Carousel**:
   - 5 portrait reels arranged in an overlapping fan on desktop.
   - Smooth swipe gestures on mobile with flanking peek cards.
   - Inline playback with audio on click with crystal clear glassmorphism play button.
   - Animated soundwave equalizer indicators.
3. **Featured "Half Day Plan" Card**:
   - Unclipped "MOST POPULAR" luxury pill badge with flame icon and specular border.
   - 24k gold 5-star rating badge with inline SVGs and drop shadows.
   - Rotating conic gradient border animation.
4. **Lenis Inertia Smooth Scrolling**:
   - Integrated via `lenis` npm package with `requestAnimationFrame`.
   - Intercepts in-page hash links (`#services`, `#pricing`, etc.) with automatic header offset calculation.
5. **Quick Booking & Confetti Celebration**:
   - Event slot booking form with validation.
   - Triggers `canvas-confetti` celebration burst with slot confirmation modal.
6. **Brand Identity**:
   - Luxurious gold-highlighted "X" in `reelXpress` (`.brand-x-gold`).
   - Ambient glowing floating orbs with organic keyframe float animations.
