'use client';

import { CLIENT_BRANDS } from '@/lib/data';

// Smooth infinite ticker banner displaying featured client brands moving continuously towards the right
export default function BrandTicker() {
  // Multiply array to guarantee full coverage and seamless rightward flow
  const brandList = [...CLIENT_BRANDS, ...CLIENT_BRANDS];

  return (
    <section
      className="py-12 md:py-16 border-y border-border-specular/40 bg-surface-deep/70 overflow-hidden relative select-none"
      aria-label="Client Brands Ticker"
    >
      {/* Edge Gradient Masks for Smooth Fade */}
      <div className="absolute left-0 inset-y-0 w-24 sm:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 sm:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track Moving Continuously Towards the Right */}
      <div className="marquee-right-container flex overflow-hidden w-full">
        {/* Primary Track */}
        <div className="animate-marquee-right flex items-center shrink-0">
          {brandList.map((brand, idx) => (
            <div key={idx} className="flex items-center shrink-0 mx-6 sm:mx-10 md:mx-14">
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.25em] text-white/35 hover:text-white transition-colors duration-200 cursor-default">
                {brand}
              </span>
              <span className="ml-12 sm:ml-20 md:ml-28 w-1.5 h-1.5 rounded-full bg-primary-container/40" />
            </div>
          ))}
        </div>

        {/* Duplicate Sibling Track for Seamless Infinite Rightward Loop */}
        <div className="animate-marquee-right flex items-center shrink-0" aria-hidden="true">
          {brandList.map((brand, idx) => (
            <div key={`dup-${idx}`} className="flex items-center shrink-0 mx-6 sm:mx-10 md:mx-14">
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.25em] text-white/35 hover:text-white transition-colors duration-200 cursor-default">
                {brand}
              </span>
              <span className="ml-12 sm:ml-20 md:ml-28 w-1.5 h-1.5 rounded-full bg-primary-container/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
