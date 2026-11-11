import React from 'react';
import { Product } from '@/types';
import { formatRupiah } from '@/lib/whatsapp';
import { MessageCircle, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOrderClick: (product: Product) => void;
}

export default function ProductCard({ product, onOrderClick }: ProductCardProps) {
  const isAvailable = product.status !== 'soldout';

  return (
    <div className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-emerald-300 shadow-2xs hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 flex flex-col justify-between">
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges on top of image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-800/90 backdrop-blur-xs text-white shadow-xs">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              {product.badge}
            </span>
          )}
        </div>

        {/* Status indicator on top right */}
        <div className="absolute top-3 right-3">
          {product.status === 'ready' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-600/90 backdrop-blur-xs text-white shadow-xs">
              <CheckCircle2 className="w-3 h-3" />
              Ready
            </span>
          )}
          {product.status === 'preorder' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-600/90 backdrop-blur-xs text-white shadow-xs">
              <Clock className="w-3 h-3" />
              PO
            </span>
          )}
          {product.status === 'soldout' && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-700/80 backdrop-blur-xs text-white">
              Habis
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price & Order Action */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-neutral-400 block uppercase tracking-wider font-semibold">Harga</span>
            <span className="text-base sm:text-lg font-bold text-emerald-800 font-sans">
              {formatRupiah(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onOrderClick(product)}
            disabled={!isAvailable}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all active:scale-95 ${
              isAvailable
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Pesan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
