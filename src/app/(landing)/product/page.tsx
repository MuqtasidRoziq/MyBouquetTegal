import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import AllProducts from '@/components/section/AllProducts';

export const metadata: Metadata = {
  title: 'Katalog Buket Wisuda, Tunangan & Hampers Lebaran',
  description:
    'Pilihan lengkap buket wisuda, tunangan/lamaran, buket uang, buket snack & parcel hampers lebaran custom di Tegal Slawi.',
  alternates: {
    canonical: '/product',
  },
  openGraph: {
    title: 'Katalog Buket Wisuda, Tunangan & Hampers Lebaran | My Bouquet Tegal',
    description:
      'Koleksi lengkap buket wisuda, buket tunangan, snack, uang, dan hampers parcel lebaran di Tegal & Slawi.',
  },
};

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-neutral-500">
          <div className="animate-spin w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-sm">Memuat katalog lengkap...</p>
        </div>
      }
    >
      <AllProducts />
    </Suspense>
  );
}
