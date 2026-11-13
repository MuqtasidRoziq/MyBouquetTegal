import React from 'react';
import { Product } from '@/types';
import { formatRupiah } from '@/lib/whatsapp';
import { Eye } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons';

interface ProductCardProps {
  product: Product;
  onOrderClick: (product: Product) => void;
  onDetailClick?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onOrderClick,
  onDetailClick,
}: ProductCardProps) {
  return (
    <div
      onClick={() => onDetailClick && onDetailClick(product)}
      className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-emerald-400 shadow-2xs hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Image Container: 100% clean without any badges */}
      <div className="relative aspect-4/3 sm:aspect-square w-full overflow-hidden bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View Overlay on hover (desktop) */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-neutral-800 text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-emerald-700" />
            <span>Lihat Detail</span>
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="font-serif text-sm sm:text-base font-bold text-neutral-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price & Order Action (Stacked on Mobile, Row on Desktop to NEVER overlap price) */}
        <div className="mt-3 pt-2.5 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] text-neutral-400 block uppercase tracking-wider font-semibold">
              Harga
            </span>
            <span className="text-sm sm:text-base font-bold text-emerald-800 font-sans block leading-tight">
              {formatRupiah(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOrderClick(product);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95 shrink-0 bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
            <span>Pesan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
