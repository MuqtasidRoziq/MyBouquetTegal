import { Flower2, Heart, Sparkles, Award } from 'lucide-react';
import { StoreInfo } from '@/types';
import FadeIn from '@/components/ui/FadeIn';

interface AboutProps {
  store?: StoreInfo;
}

export default function About({ store }: AboutProps) {
  const brandName = store?.name || 'My Bouquet Tegal';
  const tagline = store?.tagline || 'Artisan Florist & Gift Studio Tegal';

  return (
    <section className="py-20 bg-white border-y border-neutral-100" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Narrative */}
          <FadeIn direction="right" className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-emerald-800">
              <span className="w-5 h-px bg-emerald-600/60" />
              <span>Tentang Studio Kami</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 tracking-normal leading-tight">
              Merangkai Cerita &amp; Ketulusan dalam Setiap Buket
            </h2>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              <strong className="text-neutral-800 font-semibold">{brandName}</strong> berawal dari dedikasi seni merangkai buket dan hampers modern di Tegal &amp; Slawi. Kami membantu setiap pelanggan mengungkapkan apresiasi, rasa bangga wisuda, momen lamaran tunangan, hingga silaturahmi hari raya melalui karya yang rapi dan elegan.
            </p>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              Bagi kami, buket bukan sekadar hadiah seremonial, melainkan simbol kebahagiaan antara pengirim dan penerima. Oleh karena itu, kami selalu mengutamakan kerapian lipatan cellophane, pemilihan warna harmonis, serta material buket artificial &amp; kemasan hampers yang awet dan kokoh.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 hover:border-emerald-200 transition">
                <div className="p-2 rounded-xl bg-emerald-100/60 text-emerald-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm">Artisan Touch</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Dikerjakan tangan profesional</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 hover:border-emerald-200 transition">
                <div className="p-2 rounded-xl bg-emerald-100/60 text-emerald-700">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm">Premium Wrapping</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Kertas & pita berkualitas tinggi</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Image Collage */}
          <FadeIn direction="left" delay={200} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden aspect-4/5 shadow-md group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/about/about-proses-artisan.webp"
                    alt="Proses Pembuatan Buket"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 rounded-3xl bg-emerald-800 text-white shadow-md">
                  <Heart className="w-6 h-6 text-emerald-300 mb-2" />
                  <p className="font-serif text-lg font-medium leading-snug">
                    “Dibuat dengan hati, dihadiahkan dengan bangga.”
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-5 rounded-3xl bg-[#FAF0F2] border border-rose-100">
                  <p className="text-xs font-semibold text-rose-800 uppercase tracking-wider mb-1">
                    Komitmen Kualitas
                  </p>
                  <p className="font-serif text-2xl font-bold text-neutral-900">
                    100% Rapi &amp; Elegan
                  </p>
                </div>
                <div className="rounded-3xl overflow-hidden aspect-4/5 shadow-md group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/about/about-kualitas-detail.webp"
                    alt="Detail Finishing Buket"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
