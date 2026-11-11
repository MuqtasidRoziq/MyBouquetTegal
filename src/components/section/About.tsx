import React from 'react';
import { Flower2, Heart, Sparkles, Award } from 'lucide-react';
import { StoreInfo } from '@/types';

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
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              <Flower2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tentang Studio Kami</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 tracking-normal leading-tight">
              Merangkai Cerita & Ketulusan dalam Setiap Buket
            </h2>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              <strong className="text-neutral-800 font-semibold">{brandName}</strong> berawal dari kecintaan terhadap keindahan seni merangkai bunga dan keinginan membantu setiap orang mengungkapkan rasa terima kasih, cinta, dan apresiasi melalui karya yang penuh estetika.
            </p>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              Bagi kami, buket bukan sekadar hadiah seremonial, melainkan jembatan emosi antara pengirim dan penerima. Oleh karena itu, kami selalu mengutamakan kerapian lipatan, pemilihan warna harmonis, dan keawetan bahan buket.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100">
                <div className="p-2 rounded-xl bg-emerald-100/60 text-emerald-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm">Artisan Touch</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Dikerjakan tangan profesional</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100">
                <div className="p-2 rounded-xl bg-emerald-100/60 text-emerald-700">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm">Premium Wrapping</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Kertas & pita berkualitas tinggi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden aspect-4/5 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/about/about-proses-artisan.webp"
                    alt="Proses Pembuatan Buket"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
                    100% Rapi & Elegan
                  </p>
                </div>
                <div className="rounded-3xl overflow-hidden aspect-4/5 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/about/about-kualitas-detail.webp"
                    alt="Detail Finishing Buket"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
