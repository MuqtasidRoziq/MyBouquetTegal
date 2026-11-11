'use client';

import React, { useState } from 'react';
import { Product, StoreInfo, ContactInfo } from '@/types';
import { buildWhatsAppOrderUrl, formatRupiah } from '@/lib/whatsapp';
import { X, MessageCircle, Calendar, FileText, User, ShoppingBag } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-rose-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-neutral-900">
                Pesan Langsung via WhatsApp
              </h3>
              <p className="text-[11px] text-neutral-500">
                Data akan otomatis disusun rapi ke chat admin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendWhatsApp} className="p-6 overflow-y-auto space-y-4 text-sm">
          {/* Selected Product Summary Card */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-150/70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">
                  {product.productType === 'parcel' ? 'Parcel / Hampers' : 'Buket'}
                </span>
                <span className="text-[11px] text-neutral-400">
                  {product.status === 'ready' ? 'Ready Stock' : 'Pre-Order'}
                </span>
              </div>
              <p className="font-serif font-bold text-neutral-900 text-sm truncate mt-1">
                {product.name}
              </p>
              <p className="text-xs font-semibold text-rose-600 mt-0.5">
                {formatRupiah(product.price)}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-neutral-400" />
                Nama Pemesan *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Rina Aulia"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-xs sm:text-sm outline-hidden transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-neutral-400" />
                Jumlah Pesanan
              </label>
              <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full text-center py-2 text-xs sm:text-sm outline-hidden font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              Rencana Tanggal Pakai / Kirim
            </label>
            <input
              type="text"
              placeholder="Contoh: Besok lusa / 15 November 2026"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-xs sm:text-sm outline-hidden transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-neutral-400" />
              Request Teks Kartu Ucapan (Gratis)
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: Happy Graduation Andi, S.T! Sukses selalu yaa..."
              value={greetingCardText}
              onChange={(e) => setGreetingCardText(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-xs sm:text-sm outline-hidden transition resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Catatan / Permintaan Khusus
            </label>
            <input
              type="text"
              placeholder="Contoh: Minta ganti wrapping warna ungu pastel ya min"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-xs sm:text-sm outline-hidden transition"
            />
          </div>

          {/* Price Calculation & Submit */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-neutral-500">Estimasi Total</p>
              <p className="text-lg font-bold text-rose-600">{totalEstimate}</p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-200 active:scale-95 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Buka WhatsApp Admin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
