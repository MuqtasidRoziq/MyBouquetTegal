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

export const metadata: Metadata = {
  title: 'My Bouquet Tegal - Artisan Florist, Gift & Hampers Tegal',
  description:
    'Studio buket bunga segar & artificial, buket snack & uang, serta parcel hampers premium di Tegal & Slawi. Desain rapi, harga bersahabat, fast order via WhatsApp.',
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
  openGraph: {
    title: 'My Bouquet Tegal - Artisan Florist, Gift & Hampers Tegal',
    description:
      'Pesan buket bunga, buket snack/uang wisuda, serta hampers parcel di Tegal & Slawi.',
    type: 'website',
    images: [
      {
        url: '/logo_bucket.webp',
        width: 600,
        height: 600,
        alt: 'Logo My Bouquet Tegal',
      },
    ],
  },
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