import React from 'react';
import { Product, StoreInfo, ContactInfo } from '@/types';
import { formatRupiah } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/icons';
import { X } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  store: StoreInfo;
  contact: ContactInfo;
  isOpen: boolean;
  onClose: () => void;
  onOrderClick: (product: Product) => void;
  relatedProducts?: Product[];
  onSelectRelated?: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  store,
  contact,
  isOpen,
  onClose,
  onOrderClick,
}: ProductDetailModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Close button */}
        <div className="absolute top-3 right-3 z-20">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/90 backdrop-blur-md text-neutral-600 hover:text-neutral-900 hover:bg-white shadow-md active:scale-95 transition cursor-pointer"
            aria-label="Tutup detail produk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content: Image, Name, Price, Description */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Product Image */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Title & Price */}
          <div className="space-y-1 sm:space-y-1.5">
            <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 leading-snug">
              {product.name}
            </h2>
            <div className="pt-0.5">
              <span className="text-[11px] text-neutral-400 block uppercase tracking-wider font-semibold">
                Harga
              </span>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-800 font-sans">
                {formatRupiah(product.price)}
              </p>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF9F5] border border-neutral-200/70 space-y-1.5">
              <h4 className="text-[11px] font-semibold text-neutral-700 uppercase tracking-wider">
                Deskripsi
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Sticky Action: Pesan Sekarang */}
        <div className="p-4 sm:p-5 border-t border-neutral-100 bg-white/95 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOrderClick(product);
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-2xl font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20 cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>Pesan Sekarang</span>
          </button>
        </div>
      </div>
    </div>
  );
}
