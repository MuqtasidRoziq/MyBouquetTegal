import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { StoreInfo, ContactInfo } from '@/types';
import { WhatsAppIcon } from '@/components/icons';
import FadeIn from '@/components/ui/FadeIn';

interface HeroProps {
  store?: StoreInfo;
  contact?: ContactInfo;
}

export default function Hero({ store, contact }: HeroProps) {
  const waNumber = contact?.whatsappNumber || '6285742880000';
  const storeName = store?.name || 'My Bouquet Tegal';
  const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(
    `Halo Admin ${storeName}, saya ingin konsultasi buket / parcel untuk acara spesial saya... 🌿`
  )}`;

  return (
    <section className="relative min-h-[calc(100svh-4.5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F4F8F6] via-[#FAF9F5] to-white px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Decorative ambient elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -z-10 animate-glow" />
      <div className="absolute -bottom-10 right-5 w-64 h-64 bg-amber-50/70 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* Subtle Editorial Kicker */}
        <FadeIn delay={100} direction="down">
          <div className="flex items-center gap-2.5 mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-emerald-800">
            <span className="w-6 h-px bg-emerald-600/60" />
            <span>Artisan Florist &amp; Hampers Studio Tegal</span>
            <span className="w-6 h-px bg-emerald-600/60" />
          </div>
        </FadeIn>

        {/* Brand Headline */}
        <FadeIn delay={200} direction="up">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-normal text-neutral-900 max-w-3xl leading-[1.18]">
            Buket &amp; Hampers Spesial, <br className="hidden sm:inline" />
            <span className="relative inline-block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800">
              Dibuat Penuh Ketulusan
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-2.5 text-emerald-300/60 -z-10"
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
        </FadeIn>

        {/* Problem-Solution Hook */}
        <FadeIn delay={300} direction="up">
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-neutral-600 max-w-2xl font-light leading-relaxed">
            Cari <strong className="font-medium text-neutral-800">buket wisuda, buket tunangan, buket snack &amp; uang</strong>, atau <strong className="font-medium text-neutral-800">hampers parcel lebaran</strong> yang rapi, mewah, dan <strong className="font-medium text-neutral-800">bisa custom sesuai budget</strong>? Mulai dari <strong>Rp 35.000</strong> dengan pengerjaan kilat siap kirim area Tegal &amp; Sekitarnya.
          </p>
        </FadeIn>

        {/* Pricing & Fast Info Bar */}
        <FadeIn delay={400} direction="up">
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-xs md:text-sm text-neutral-600 font-medium">
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-neutral-200/60 shadow-2xs hover:border-emerald-300 transition">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mulai Rp 35rb - Bebas Custom</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-neutral-200/60 shadow-2xs hover:border-emerald-300 transition">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Bisa Order Kilat (Same Day)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-neutral-200/60 shadow-2xs hover:border-emerald-300 transition">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free Kartu Ucapan Custom</span>
            </div>
          </div>
        </FadeIn>

        {/* Call to Actions */}
        <FadeIn delay={500} direction="up">
          <div className="mt-7 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/product"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm sm:text-sm shadow-md shadow-emerald-700/15 active:scale-95 transition-all"
            >
              <span>Lihat Katalog Produk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 font-medium text-sm sm:text-sm border border-neutral-200 shadow-xs active:scale-95 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
              <span>Konsultasi Desain &amp; Order</span>
            </a>
          </div>
        </FadeIn>

        {/* Visual Showcase Reel */}
        <FadeIn delay={600} direction="up" className="w-full max-w-4xl">
          <div className="mt-10 sm:mt-12 w-full relative">
            <div className="p-2.5 sm:p-3 bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-neutral-200/70 shadow-xl shadow-emerald-950/5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-4/5 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/hero/hero-bunga-segar.webp"
                    alt="Buket Bunga Artificial & Tunangan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                    <span className="text-white text-xs sm:text-sm font-medium">Buket Bunga Artificial</span>
                  </div>
                </div>

                <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-4/5 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/hero/hero-uang-boneka.webp"
                    alt="Buket Uang & Boneka Wisuda"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                    <span className="text-white text-xs sm:text-sm font-medium">Buket Uang &amp; Wisuda</span>
                  </div>
                </div>

                <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-4/5 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/hero/hero-snack-wisuda.webp"
                    alt="Buket Snack Favorit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                    <span className="text-white text-xs sm:text-sm font-medium">Buket Snack Favorit</span>
                  </div>
                </div>

                <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-4/5 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/hero/hero-parcel-hampers.webp"
                    alt="Hampers Parcel Lebaran"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5 sm:p-3">
                    <span className="text-white text-xs sm:text-sm font-medium">Hampers Parcel Lebaran</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
