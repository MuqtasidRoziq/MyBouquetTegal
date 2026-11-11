'use client';

import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimoniProps {
  testimonials?: Testimonial[];
}

export default function Testimoni({ testimonials = [] }: TestimoniProps) {
  // Fallback default jika database kosong
  const displayTestimonials: Testimonial[] =
    testimonials.length > 0
      ? testimonials
      : [
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
        ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cerita Pelanggan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 tracking-normal">
            Dipercaya Ratusan Pelanggan di Tegal & Slawi
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base font-light">
            Ketulusan setiap ikatan buket terbukti dari senyuman dan kepuasan para sahabat My Bouquet Tegal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayTestimonials.slice(0, 6).map((testi) => (
            <div
              key={testi.id}
              className="p-6 rounded-3xl bg-[#FAF9F5] border border-neutral-200/70 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(testi.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-neutral-700 text-sm leading-relaxed italic">
                  “{testi.comment}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200/50 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-neutral-900 text-sm">
                    {testi.customerName}
                  </h4>
                  <p className="text-xs text-emerald-700 font-medium">
                    {testi.eventType}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
