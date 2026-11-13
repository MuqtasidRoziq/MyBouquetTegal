'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ as FAQType } from '@/types';
import FadeIn from '@/components/ui/FadeIn';

interface FAQProps {
  faqs?: FAQType[];
}

export default function FAQ({ faqs = [] }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const displayFaqs: FAQType[] =
    faqs.length > 0
      ? faqs
      : [
          {
            id: '1',
            question: 'Berapa lama proses pembuatan buket / parcel?',
            answer:
              'Untuk koleksi ready stock bisa langsung dikirim atau diambil dalam 1-2 jam. Untuk custom snack, uang, atau buket bunga segar request khusus, pengerjaan berkisar 3-6 jam atau disarankan pesan H-1.',
          },
          {
            id: '2',
            question: 'Apakah bisa order mendadak di hari yang sama (Same-Day)?',
            answer:
              'Bisa banget! Kami memiliki katalog buket ready-stock siap kirim setiap harinya. Silakan langsung hubungi admin WhatsApp untuk mengecek ketersediaan hari ini.',
          },
          {
            id: '3',
            question: 'Apakah bisa custom isi buket sesuai budget saya?',
            answer:
              'Tentu bisa! Anda bisa konsultasi budget, misalnya Rp 35.000 atau Rp 100.000, lalu tim kami akan merancang susunan buket terbaik yang muat dalam budget tersebut.',
          },
          {
            id: '4',
            question: 'Apakah sudah termasuk kartu ucapan?',
            answer:
              'Gratis! Setiap pemesanan buket atau parcel di My Bouquet Tegal sudah termasuk kartu ucapan (greeting card) eksklusif dan bisa kami bantu print/tulis pesan ketulusan Anda.',
          },
          {
            id: '5',
            question: 'Bisa dikirim ke area mana saja?',
            answer:
              'Kami melayani pengiriman kurir lokal ke seluruh wilayah Kota Tegal, Slawi, Adiwerna, Kramat, Dukuhturi, Tarub, dan sekitarnya, serta opsi pick-up langsung di workshop.',
          },
        ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF9F5]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-emerald-800">
              <span className="w-5 h-px bg-emerald-600/60" />
              <span>Tanya Jawab</span>
              <span className="w-5 h-px bg-emerald-600/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 tracking-normal">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="mt-3 text-neutral-600 text-sm sm:text-base font-light">
              Informasi lengkap seputar pemesanan, kustomisasi, hingga pengiriman buket di Tegal &amp; Slawi.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-3">
          {displayFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <FadeIn key={faq.id} delay={index * 80} direction="up">
                <div className="bg-white rounded-2xl border border-neutral-200/70 overflow-hidden transition-all shadow-2xs">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-neutral-50/50 transition cursor-pointer"
                  >
                    <span className="font-medium text-neutral-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-emerald-700 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-neutral-600 text-xs sm:text-sm leading-relaxed border-t border-neutral-100 pt-3 font-light animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}