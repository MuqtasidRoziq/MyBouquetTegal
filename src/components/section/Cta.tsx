import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StoreInfo, ContactInfo } from '@/types';
import { WhatsAppIcon } from '@/components/icons';

interface CtaProps {
  store?: StoreInfo;
  contact?: ContactInfo;
}

export default function Cta({ store, contact }: CtaProps) {
  const storeName = store?.name || 'My Bouquet Tegal';
  const whatsappNumber = contact?.whatsappNumber || '6285742880000';
  const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
    `Halo Admin ${storeName}, saya ingin pesan buket untuk acara saya... 🌿`
  )}`;

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-emerald-300/90">
          <span className="w-5 h-px bg-emerald-400/40" />
          <span>Konsultasi Bebas Biaya</span>
          <span className="w-5 h-px bg-emerald-400/40" />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium tracking-normal leading-snug max-w-2xl mx-auto">
          Ingin Custom Buket atau Pesan Hampers Hari Ini?
        </h2>

        <p className="max-w-xl mx-auto text-emerald-100/80 text-xs sm:text-sm font-light leading-relaxed">
          Konsultasikan kebutuhan buket wisuda, tunangan, snack, uang, atau hampers parcel Anda secara gratis bersama tim kami.
        </p>

        {/* Action Buttons: Proporsional, rapi & ergonomis */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-emerald-950 font-medium text-xs sm:text-sm shadow-sm hover:shadow transition-all active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-700" />
            <span>Chat WhatsApp Admin</span>
          </a>

          <Link
            href="/product"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-600/40 text-emerald-100 hover:text-white font-medium text-xs sm:text-sm transition-all active:scale-95"
          >
            <span>Buka Katalog Produk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
