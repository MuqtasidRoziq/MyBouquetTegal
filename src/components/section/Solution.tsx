import React from 'react';
import { Sparkles, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function Solution() {
  const solutions = [
    {
      icon: <Sparkles className="w-5 h-5 text-emerald-700" />,
      title: 'Wrapping Rapi & Detail Estetik',
      desc: 'Setiap buket dirangkai presisi dengan teknik lipatan modern, kokoh, dan tahan lama untuk sesi foto momen terbaik Anda.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
      title: 'Bebas Custom Sesuai Budget',
      desc: 'Mulai dari Rp 35.000 hingga parcel mewah, kami sesuaikan pilihan bunga artificial, snack, uang, atau hampers dengan anggaran Anda.',
    },
    {
      icon: <Zap className="w-5 h-5 text-emerald-700" />,
      title: 'Bisa Order Kilat (Same-Day)',
      desc: 'Wisuda atau acara keluarga dadakan hari ini? Kami siap sediakan buket ready stock dan pesanan kilat siap ambil atau kirim.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-emerald-700" />,
      title: 'Free Kartu Ucapan Eksklusif',
      desc: 'Setiap buket & parcel sudah dilengkapi kartu ucapan cetak rapi agar pesan ucapan selamat atau doa Anda tersampaikan hangat.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F4F8F6] to-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-emerald-800">
              <span className="w-5 h-px bg-emerald-600/60" />
              <span>Keunggulan My Bouquet Tegal</span>
              <span className="w-5 h-px bg-emerald-600/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 tracking-normal">
              Solusi Rangkaian Buket &amp; Parcel Tanpa Khawatir
            </h2>
            <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              Kami memastikan setiap ikatan buket dan kemasan hampers dibuat penuh perhatian, rapi, dan tepat waktu untuk melengkapi hari istimewa Anda.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 120} direction="up">
              <div className="h-full p-6 rounded-2xl bg-white border border-emerald-950/10 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-neutral-900 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
