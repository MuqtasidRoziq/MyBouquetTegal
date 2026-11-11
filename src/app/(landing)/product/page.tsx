import React, { Suspense } from 'react';
import AllProducts from '@/components/section/AllProducts';

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
