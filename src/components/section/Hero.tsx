import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { StoreInfo, ContactInfo } from '@/types';

interface HeroProps {
  store?: StoreInfo;
  contact?: ContactInfo;
}

export default function Hero({ store, contact }: HeroProps) {
  const waNumber = contact?.whatsappNumber || '6285742880000';
  const storeName = store?.name || 'My Bouquet Tegal';
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo Admin ${storeName}, saya ingin konsultasi buket / parcel untuk acara spesial saya... 🌿`
  )}`;

  return (
    <section className="relative min-h-[calc(100svh-4.5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F4F8F6] via-[#FAF9F5] to-white px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10 animate-glow" />
      <div className="absolute -bottom-10 right-5 w-64 h-64 bg-amber-50/70 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        {/* Top Pills */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs sm:text-sm font-medium tracking-wide shadow-xs mb-6">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Artisan Florist & Hampers Studio #1 di Tegal & Slawi</span>
        </div>

        {/* Brand Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-medium tracking-normal text-neutral-900 max-w-4xl leading-[1.12]">
          Kado Berkesan, <br className="hidden sm:inline" />
          <span className="relative inline-block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800">
            Dibuat Penuh Ketulusan
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-emerald-300/60 -z-10"
              viewBox="0 0 300 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 15C80 5 220 5 295 15"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Problem-Solution Hook */}
        <p className="mt-6 text-base sm:text-xl text-neutral-600 max-w-2xl font-light leading-relaxed">
          Bingung cari kado wisuda, ulang tahun, atau hampers hari raya yang <strong className="font-semibold text-neutral-800">cantik, tidak pasaran</strong>, dan <strong className="font-semibold text-neutral-800">bisa custom sesuai budget</strong>? Kami hadirkan buket rapi berkualitas mulai dari <strong>Rp 25.000</strong>.
        </p>

        {/* Pricing & Fast Info Bar */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-neutral-600 font-medium">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-neutral-200/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Mulai Rp 25rb - 500rb+</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-neutral-200/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Bisa Order Kilat (Same Day)</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-neutral-200/60 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Free Kartu Ucapan & Greeting Card</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/product"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-base shadow-lg shadow-emerald-700/20 active:scale-95 transition-all"
          >
            <span>Buka Katalog Lengkap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-base border border-neutral-200 shadow-sm active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Tanya Admin / Custom WA</span>
          </a>
        </div>

        {/* Visual Showcase Reel */}
        <div className="mt-14 w-full max-w-4xl relative">
          <div className="p-3 bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-neutral-200/70 shadow-xl shadow-emerald-950/5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-4/5 bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/hero/hero-bunga-segar.webp"
                  alt="Buket Bunga Segar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs sm:text-sm font-medium">Buket Bunga Segar</span>
                </div>
              </div>

              <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-4/5 bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/hero/hero-uang-boneka.webp"
                  alt="Buket Uang & Hadiah"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs sm:text-sm font-medium">Buket Uang & Boneka</span>
                </div>
              </div>

              <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-4/5 bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/hero/hero-snack-wisuda.webp"
                  alt="Buket Snack Wisuda"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs sm:text-sm font-medium">Buket Snack Favorit</span>
                </div>
              </div>

              <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-4/5 bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/hero/hero-parcel-hampers.webp"
                  alt="Hampers Parcel Mewah"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <span className="text-white text-xs sm:text-sm font-medium">Parcel & Hampers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
