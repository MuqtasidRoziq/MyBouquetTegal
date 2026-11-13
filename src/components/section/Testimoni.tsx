'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimoniProps {
  testimonials?: Testimonial[];
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    customerName: 'Anindya Putri',
    eventType: 'Wisuda UPS Tegal',
    rating: 5,
    comment:
      'Buket mawarnya rapi banget! Kertas wrapping-nya tebal dan warnanya mewah. Temenku seneng banget pas dikasih pas wisuda. Recommended florist di Tegal!',
    dateText: '2 minggu lalu',
  },
  {
    id: '2',
    customerName: 'Rizky Pratama',
    eventType: 'Anniversary Gift',
    rating: 5,
    comment:
      'Pesan H-1 tapi adminnya ramah banget dan mau bantu custom buket cokelat + boneka sesuai request. Pengerjaannya kilat tapi hasilnya tetep aesthetic.',
    dateText: '1 bulan lalu',
  },
  {
    id: '3',
    customerName: 'Siti Nurhaliza',
    eventType: 'Hampers Hari Raya',
    rating: 5,
    comment:
      'Parcel hampers lebaran di My Bouquet Tegal packaging-nya exclusive banget. Pitanya rapi dan isian kuenya premium. Keluarga besar suka!',
    dateText: '3 minggu lalu',
  },
  {
    id: '4',
    customerName: 'Dimas Setiawan',
    eventType: 'Ulang Tahun Pacar',
    rating: 5,
    comment:
      'Buket uang tarik rapi dan aman banget lembarannya. Pacar saya kaget dan happy banget pas ditarik perlahan. Pelayanan juara pokoknya!',
    dateText: '3 hari lalu',
  },
  {
    id: '5',
    customerName: 'dr. Farah Maulida',
    eventType: 'Sumpah Dokter',
    rating: 5,
    comment:
      'Bunga artificial kualitas import-nya mirip banget sama bunga asli tapi awet selamanya buat kenang-kenangan. Makasih banyak My Bouquet Tegal!',
    dateText: '1 minggu lalu',
  },
];

export default function Testimoni({ testimonials = [] }: TestimoniProps) {
  const data = testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;
  const count = data.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Autoplay setiap 4 detik (pause saat hover atau sentuh)
  useEffect(() => {
    if (isPaused || count <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, count]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Posisi modular circular (-2, -1, 0, 1, 2)
  const getRelativePosition = (index: number) => {
    let diff = (index - currentIndex) % count;
    if (diff > Math.floor(count / 2)) diff -= count;
    if (diff < -Math.floor((count - 1) / 2)) diff += count;
    return diff;
  };

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-neutral-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header editorial bersih & autentik khas My Bouquet Tegal */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-emerald-800">
            <span className="w-5 h-px bg-emerald-600/60" />
            <span>Cerita Pelanggan</span>
            <span className="w-5 h-px bg-emerald-600/60" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 tracking-normal">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base font-light">
            Ketulusan setiap ikatan buket terbukti dari senyuman dan kepuasan para sahabat My Bouquet Tegal.
          </p>
        </div>

        {/* Carousel Slider */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card Viewport */}
          <div className="relative h-[340px] sm:h-[320px] flex items-center justify-center overflow-visible">
            {data.map((item, index) => {
              const pos = getRelativePosition(index);
              const isCenter = pos === 0;
              const isLeft = pos === -1;
              const isRight = pos === 1;

              // Transform murni CSS transform
              let transformStyle = '';
              let opacityStyle = 'opacity-0 pointer-events-none scale-75';
              let zIndex = 0;
              let blurStyle = 'blur-none';

              if (isCenter) {
                transformStyle = 'translate-x-0 scale-100';
                opacityStyle = 'opacity-100 pointer-events-auto';
                zIndex = 30;
                blurStyle = 'blur-none';
              } else if (isLeft) {
                transformStyle = '-translate-x-[55%] sm:-translate-x-[70%] lg:-translate-x-[78%] scale-[0.9]';
                opacityStyle = 'opacity-40 hover:opacity-75 pointer-events-auto cursor-pointer';
                zIndex = 20;
                blurStyle = 'blur-[1.5px] hover:blur-none';
              } else if (isRight) {
                transformStyle = 'translate-x-[55%] sm:translate-x-[70%] lg:translate-x-[78%] scale-[0.9]';
                opacityStyle = 'opacity-40 hover:opacity-75 pointer-events-auto cursor-pointer';
                zIndex = 20;
                blurStyle = 'blur-[1.5px] hover:blur-none';
              } else if (pos < -1) {
                transformStyle = '-translate-x-[115%] scale-75';
              } else if (pos > 1) {
                transformStyle = 'translate-x-[115%] scale-75';
              }

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isLeft) prevSlide();
                    if (isRight) nextSlide();
                  }}
                  className={`absolute w-[92%] max-w-[420px] sm:max-w-[460px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${transformStyle} ${opacityStyle} ${blurStyle}`}
                  style={{ zIndex }}
                >
                  <div
                    className={`w-full h-[290px] sm:h-[280px] p-6 sm:p-7 rounded-2xl flex flex-col justify-between transition-all duration-500 bg-[#FAF9F5] border ${
                      isCenter
                        ? 'border-neutral-300 shadow-lg shadow-neutral-900/5'
                        : 'border-neutral-200/70 shadow-2xs'
                    }`}
                  >
                    <div>
                      {/* Bintang rating & verified badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified</span>
                        </div>
                      </div>

                      {/* Komentar teks */}
                      <p className="text-neutral-700 text-sm sm:text-base leading-relaxed italic line-clamp-4">
                        “{item.comment}”
                      </p>
                    </div>

                    {/* Informasi pelanggan */}
                    <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-neutral-900 text-sm sm:text-base">
                          {item.customerName}
                        </h4>
                        <p className="text-xs text-emerald-700 font-medium mt-0.5">
                          {item.eventType}
                        </p>
                      </div>

                      {item.dateText && (
                        <span className="text-xs text-neutral-400 font-normal">
                          {item.dateText}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigasi Minimalis & Bersih */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              aria-label="Testimoni Sebelumnya"
              className="w-10 h-10 rounded-full border border-neutral-200 bg-white text-neutral-700 hover:text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {data.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Ulasan ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === index
                      ? 'w-6 bg-emerald-700'
                      : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Testimoni Berikutnya"
              className="w-10 h-10 rounded-full border border-neutral-200 bg-white text-neutral-700 hover:text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50 flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Petunjuk swipe di HP */}
          <p className="mt-3 text-center text-xs text-neutral-400 md:hidden">
            Geser kartu untuk melihat testimoni lainnya
          </p>
        </div>
      </div>
    </section>
  );
}
