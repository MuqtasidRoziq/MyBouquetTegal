import React from 'react';
import { Sparkles, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';

export default function Solution() {
  const solutions = [
    {
      icon: <Sparkles className="w-5 h-5 text-emerald-700" />,
      title: 'Desain Artisan Rapi & Estetik',
      desc: 'Setiap buket dirangkai teliti oleh florist profesional dengan teknik wrapping modern tanpa lipatan cacat.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
      title: 'Bebas Custom Sesuai Budget',
      desc: 'Mulai dari Rp 25.000 hingga buket sultan, kami sesuaikan pilihan bunga, snack, uang, atau boneka dengan budget Anda.',
    },
    {
      icon: <Zap className="w-5 h-5 text-emerald-700" />,
      title: 'Layanan Order Kilat (Same-Day)',
      desc: 'Acara dadakan hari ini? Kami siap buatkan buket ready express dengan pengerjaan cepat dan tetap rapi.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-emerald-700" />,
      title: 'Free Greeting Card & Request Ucapan',
      desc: 'Lengkap dengan kartu ucapan eksklusif agar pesan ketulusan Anda tersampaikan sempurna ke si penerima.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F4F8F6] to-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Solusi dari My Bouquet Tegal</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 tracking-normal">
            Hadirkan Senyuman Spesial Tanpa Rasa Khawatir
          </h2>
          <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
            Kami memastikan setiap pesanan dibuat penuh cinta, rapi, dan tepat waktu untuk melengkapi momen berharga Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-emerald-950/10 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-900/5 transition-all group"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
