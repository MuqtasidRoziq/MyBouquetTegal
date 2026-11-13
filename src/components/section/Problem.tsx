import { AlertCircle, Clock, DollarSign, Frown } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';

export default function Problem() {
  const problems = [
    {
      icon: <DollarSign className="w-5 h-5 text-rose-500" />,
      title: 'Budget Pas-pasan Tapi Ingin Mewah',
      desc: 'Banyak buket wisuda atau tunangan mematok harga mahal di luar budget mahasiswa atau kebutuhan perayaan.',
    },
    {
      icon: <Frown className="w-5 h-5 text-rose-500" />,
      title: 'Buket Kaku & Rangkaian Berantakan',
      desc: 'Pernah beli buket tapi lipatan cellophane kusut, susunan snack miring, atau wrapping mudah lepas saat acara?',
    },
    {
      icon: <Clock className="w-5 h-5 text-rose-500" />,
      title: 'Butuh Cepat, Toko Menolak Order Kilat',
      desc: 'Ada acara wisuda, sidang skripsi, atau kunjungan silaturahmi mendadak hari ini, tapi toko lain wajib PO berhari-hari.',
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
      title: 'Pilihan Hampers & Isi Buket Kaku',
      desc: 'Susah cari florist yang fleksibel menerima request pecahan uang, jenis snack favorit, atau isi parcel hampers hari raya.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-rose-700">
              <span className="w-5 h-px bg-rose-400" />
              <span>Tantangan Saat Cari Buket &amp; Hampers</span>
              <span className="w-5 h-px bg-rose-400" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 tracking-normal">
              Beli Buket &amp; Hampers Sering Tak Sesuai Ekspektasi?
            </h2>
            <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              Momen wisuda, lamaran tunangan, atau silaturahmi hari raya adalah perayaan berharga. Jangan biarkan buket yang kurang rapi mengurangi kesan istimewa Anda.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 120} direction="up">
              <div className="h-full p-6 rounded-2xl bg-neutral-50/70 border border-neutral-200/70 hover:border-rose-200 hover:bg-rose-50/20 hover:-translate-y-1 transition-all duration-300 group shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-rose-100/70 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
