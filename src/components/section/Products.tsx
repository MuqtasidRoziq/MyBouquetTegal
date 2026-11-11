'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, StoreInfo, ContactInfo } from '@/types';
import ProductCard from '@/components/ui/ProductCard';
import OrderModal from '@/components/ui/OrderModal';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';

interface ProductsProps {
  products?: Product[];
  store?: StoreInfo;
  contact?: ContactInfo;
}

export default function Products({ products = [], store, contact }: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fallbackStore: StoreInfo = store || {
    id: 'default',
    name: 'My Bouquet Tegal',
    tagline: 'Artisan Florist & Gift Studio Tegal',
    logoUrl: '/logo_bucket.webp',
  };

  const fallbackContact: ContactInfo = contact || {
    id: 'default',
    whatsappNumber: '6285742880000',
    chatWhatsappTemplate: '',
    instagramHandle: '@mybouquettegal',
    instagramUrl: 'https://instagram.com/mybouquettegal',
    address: 'Slawi, Kabupaten Tegal, Jawa Tengah',
    googleMapsFrameUrl: '',
    operationalHours: '08.00 - 20.00 WIB',
  };

  const displayProducts = products.slice(0, 6);

  const handleOrder = (prod: Product) => {
    setSelectedProduct(prod);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Koleksi Favorit Konsumen</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 tracking-normal">
              Pilihan Buket & Parcel Terpopuler
            </h2>
            <p className="text-neutral-600 max-w-xl text-sm sm:text-base font-light">
              Mulai dari buket bunga segar artificial, buket snack wisuda, buket uang, hingga parcel mewah siap kirim.
            </p>
          </div>

          <Link
            href="/product"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-emerald-50 text-emerald-900 font-semibold text-sm border border-emerald-950/15 shadow-2xs transition-all self-start md:self-auto group"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            <span>Lihat Semua Katalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        {displayProducts.length === 0 ? (
          <div className="text-center py-12 bg-white/60 rounded-3xl border border-neutral-200/60 p-8">
            <p className="text-neutral-500 text-sm">Sedang memuat koleksi buket terbaik...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrderClick={handleOrder}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA to catalog */}
        <div className="mt-12 text-center">
          <Link
            href="/product"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-800/10 transition-all"
          >
            <span>Buka 50+ Pilihan Buket Lainnya</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        product={selectedProduct}
        store={fallbackStore}
        contact={fallbackContact}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
