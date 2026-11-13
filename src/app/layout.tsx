import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mybouquettegal.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'My Bouquet Tegal | Buket Wisuda, Tunangan & Hampers Lebaran',
    template: '%s | My Bouquet Tegal',
  },
  description:
    'Toko buket wisuda, tunangan, snack, uang & hampers parcel lebaran di Tegal Slawi. Custom rapi sesuai budget, free kartu ucapan & fast order kilat via WhatsApp!',
  keywords: [
    'buket wisuda tegal',
    'buket tunangan tegal',
    'hampers lebaran tegal',
    'parcel lebaran tegal',
    'buket snack tegal',
    'buket uang tegal',
    'kado wisuda tegal',
    'buket tegal',
    'buket slawi',
    'hampers tegal',
    'parcel tegal',
    'buket kelulusan tegal',
    'buket lamaran tegal',
    'florist tegal',
    'my bouquet tegal',
  ],
  authors: [{ name: 'My Bouquet Tegal' }],
  creator: 'My Bouquet Tegal',
  publisher: 'My Bouquet Tegal',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'COMCeGlwSB9WD0t6rOYGYyunHxOGUKHsa6R8X4PvXRA',
  },
  other: {
    'geo.region': 'ID-JT',
    'geo.placename': 'Tegal, Slawi, Jawa Tengah',
    'geo.position': '-6.9839;109.1396',
    'ICBM': '-6.9839, 109.1396',
  },
  openGraph: {
    title: 'My Bouquet Tegal | Buket Wisuda, Tunangan & Hampers Lebaran',
    description:
      'Toko buket wisuda, tunangan, snack, uang & hampers parcel lebaran di Tegal Slawi. Custom rapi sesuai budget, free kartu ucapan & fast order kilat via WhatsApp!',
    url: baseUrl,
    siteName: 'My Bouquet Tegal',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/logo_bucket.webp',
        width: 600,
        height: 600,
        alt: 'My Bouquet Tegal - Florist & Hampers Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Bouquet Tegal | Buket Wisuda, Tunangan & Hampers Lebaran',
    description:
      'Toko buket wisuda, tunangan, snack, uang & hampers parcel lebaran di Tegal Slawi. Custom rapi sesuai budget, free kartu ucapan & fast order kilat via WhatsApp!',
    images: ['/logo_bucket.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`scroll-smooth ${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased bg-[#FAF9F5] text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}