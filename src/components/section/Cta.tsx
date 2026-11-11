import React from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { StoreInfo, ContactInfo } from '@/types';

interface CtaProps {
  store?: StoreInfo;
  contact?: ContactInfo;
}

export default function Cta({ store, contact }: CtaProps) {
  const storeName = store?.name || 'My Bouquet Tegal';
  const whatsappNumber = contact?.whatsappNumber || '6285742880000';
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Halo Admin ${storeName}, saya ingin pesan buket untuk acara saya... 🌿`
  )}`;

  return (
    <section className="py-20 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Siap Melayani Pesanan Anda</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-normal leading-tight">
          Ingin Custom Buket atau Tanya Stok Hari Ini?
        </h2>

        <p className="max-w-2xl mx-auto text-emerald-100/90 text-sm sm:text-base font-light leading-relaxed">
          Konsultasikan kebutuhan buket wisuda, kado ulang tahun, atau parcel hampers Anda secara gratis dengan tim florist kami.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-emerald-950 font-semibold text-base shadow-lg transition-all"
          >
            <MessageCircle className="w-5 h-5 text-emerald-700" />
            <span>Chat WhatsApp Admin</span>
          </a>

          <Link
            href="/product"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-600/50 text-white font-semibold text-base transition-all"
          >
            <span>Buka Katalog Produk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
