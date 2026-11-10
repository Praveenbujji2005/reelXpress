import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import AmbientOrbs from '@/components/ui/AmbientOrbs';
import ScrollProgress from '@/components/ui/ScrollProgress';
import FloatingActionButtons from '@/components/ui/FloatingActionButtons';
import WhatsAppWidget from '@/components/ui/WhatsAppWidget/WhatsAppWidget';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata = {
  title: "reelXpress | Bengaluru's First Quick Content Service",
  description:
    'We Shoot • Edit • Deliver Reels in Minutes. You live the moment. reelXpress captures it — instantly. Shot on latest iPhone gear with on-spot live editing and fast cloud delivery.',
  keywords: [
    'Reel Maker',
    'Instagram Reels',
    'Bengaluru',
    'Quick Content Service',
    'Event Videography',
    'Same-Day Video Delivery',
    'Wedding Reels',
    'Vehicle Shoot',
    'Model Shoot',
  ],
  authors: [{ name: 'QUANTELLOVENTURES PRIVATE LIMITED' }],
  metadataBase: new URL('https://www.reelxpress.com'),
  openGraph: {
    title: "reelXpress | Bengaluru's First Quick Content Service",
    description:
      'We Shoot • Edit • Deliver Reels in Minutes. You live the moment. reelXpress captures it — instantly.',
    url: 'https://www.reelxpress.com',
    siteName: 'reelXpress',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "reelXpress | Bengaluru's First Quick Content Service",
    description:
      'We Shoot • Edit • Deliver Reels in Minutes. You live the moment. reelXpress captures it — instantly.',
  },
};

export const viewport = {
  themeColor: '#151215',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Official Brand Favicon & Touch Icon */}
        <link rel="icon" href="/brand/icon-gold.png" type="image/png" />
        <link rel="apple-touch-icon" href="/brand/icon-gold.png" />
        {/* Google Material Symbols Outlined Icon Font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${cormorantGaramond.variable} bg-background text-text-primary antialiased selection:bg-primary-container selection:text-text-primary min-h-screen relative font-sans`}
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          {/* Top GPU Scroll Progress Bar */}
          <ScrollProgress />

          {/* Background Ambient Glowing Orbs */}
          <AmbientOrbs />

          {/* Application Page Flow */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </SmoothScrollProvider>

        {/* Persistent Floating Bottom-Left Action Buttons - Viewport-fixed overlay across all sections */}
        <FloatingActionButtons />

        {/* Persistent Floating WhatsApp Chat Widget (Bottom-Right) */}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
