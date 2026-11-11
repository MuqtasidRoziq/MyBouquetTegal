import React from 'react';
import { AlertCircle, Clock, DollarSign, Frown } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      icon: <DollarSign className="w-5 h-5 text-rose-500" />,
      title: 'Budget Terbatas Tapi Ingin Mewah',
      desc: 'Banyak florist mematok harga tinggi untuk buket wisuda atau kado ulang tahun, membuat kantong mahasiswa & umum terasa berat.',
    },
    {
      icon: <Frown className="w-5 h-5 text-rose-500" />,
      title: 'Desain Kaku & Hasil Kurang Rapi',
      desc: 'Pernah beli buket tapi lipatan kertas kusut, bunga gampang rontok, atau penataan snack tidak seimbang? Sangat merusak momen spesial.',
    },
    {
      icon: <Clock className="w-5 h-5 text-rose-500" />,
      title: 'Butuh Cepat, Florist Tolak Orderan',
      desc: 'Acara mendadak hari ini tapi toko buket lain wajib pre-order berhari-hari sebelumnya dan tidak mau terima pesanan kilat.',
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
      title: 'Susah Request Isi & Warna Sesuai Selera',
      desc: 'Mau custom uang, snack favorit, boneka wisuda kampus sendiri, tapi florist lain hanya menyediakan paket kaku yang sudah jadi.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Sering Mengalami Masalah Ini?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 tracking-normal">
            Cari Kado & Buket Idaman Seringkali Bikin Ragu & Kecewa
          </h2>
          <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
            Momen wisuda, ultah sahabat, atau hari raya hanya datang sekali. Jangan biarkan kado yang kurang pas merusak kebahagiaan orang tercinta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-50/70 border border-neutral-200/70 hover:border-rose-200 hover:bg-rose-50/20 transition-all group"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
