'use client';

import React, { useState } from 'react';
import { Product, StoreInfo, ContactInfo } from '@/types';
import { buildWhatsAppOrderUrl, formatRupiah } from '@/lib/whatsapp';
import { X, Calendar, FileText, User, ShoppingBag } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons';

interface OrderModalProps {
  product: Product | null;
  store: StoreInfo;
  contact: ContactInfo;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({
  product,
  store,
  contact,
  isOpen,
  onClose,
}: OrderModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [greetingCardText, setGreetingCardText] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen || !product) return null;

  const totalEstimate = formatRupiah(product.price * quantity);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppOrderUrl(
      contact.whatsappNumber,
      {
        product,
        customerName,
        quantity,
        deliveryDate,
        greetingCardText,
        notes,
      },
      store.name
    );
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-100 bg-[#FAF9F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <WhatsAppIcon className="w-4 h-4 fill-emerald-700" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 leading-tight">
                Form Pesan WhatsApp
              </h3>
              <p className="text-[11px] text-neutral-500">
                Format order otomatis tersusun rapi ke chat admin
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
            aria-label="Tutup form pemesanan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendWhatsApp} className="p-4 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-4 text-sm">
          {/* Selected Product Summary Card */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-serif font-bold text-neutral-900 text-xs sm:text-sm truncate">
                {product.name}
              </p>
              <p className="text-xs sm:text-sm font-bold text-emerald-800 font-sans mt-0.5">
                {formatRupiah(product.price)}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-neutral-400" />
                Nama Pemesan *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Rina Aulia"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden transition bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-neutral-400" />
                Jumlah Pesanan
              </label>
              <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 sm:py-2.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-bold text-xs sm:text-sm transition cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full text-center py-2 sm:py-2.5 text-xs sm:text-sm outline-hidden font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 sm:py-2.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-bold text-xs sm:text-sm transition cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              Rencana Tanggal Pakai / Kirim
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden transition bg-white text-neutral-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-neutral-400" />
              Request Teks Kartu Ucapan (Gratis)
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Happy Graduation Andi, S.T! Sukses selalu..."
              value={greetingCardText}
              onChange={(e) => setGreetingCardText(e.target.value)}
              className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden transition resize-none bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Catatan / Permintaan Khusus
            </label>
            <input
              type="text"
              placeholder="Contoh: Minta tema warna ungu / pita putih"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 sm:py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden transition bg-white"
            />
          </div>

          {/* Price Calculation & Submit */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] text-neutral-500">Estimasi Total</p>
              <p className="text-base sm:text-lg font-bold text-emerald-800 font-sans">{totalEstimate}</p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm shadow-md shadow-emerald-700/20 active:scale-95 transition cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
              <span>Pesan Sekarang</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
