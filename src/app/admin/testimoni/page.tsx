'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquareQuote,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Star,
  X,
  Save,
} from 'lucide-react';
import { Testimonial } from '@/types';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';

export default function AdminTestimoniPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    customerName: '',
    eventType: 'Buket Wisuda & Hadiah',
    rating: 5,
    comment: '',
    dateText: 'Baru saja',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const d = await res.json();
        setTestimonials(d.data?.testimonials || []);
      }
    } catch {
      showFeedback('error', 'Gagal memuat daftar testimoni');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleOpenAddModal = () => {
    setForm({
      customerName: '',
      eventType: 'Buket Wisuda & Hadiah',
      rating: 5,
      comment: '',
      dateText: 'Baru saja',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !form.comment) {
      showFeedback('error', 'Nama pelanggan dan ulasan wajib diisi!');
      return;
    }

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'testimonial', data: form }),
      });

      if (res.ok) {
        showFeedback('success', `Testimoni dari "${form.customerName}" berhasil ditambahkan!`);
        setIsModalOpen(false);
        setForm({
          customerName: '',
          eventType: 'Buket Wisuda & Hadiah',
          rating: 5,
          comment: '',
          dateText: 'Baru saja',
        });
        loadData();
      } else {
        showFeedback('error', 'Gagal menambahkan testimoni');
      }
    } catch {
      showFeedback('error', 'Terjadi kesalahan sistem');
    }
  };

  const confirmDeleteTesti = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/testimonials?id=${deleteModal.id}&type=testimonial`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showFeedback('success', 'Ulasan testimoni berhasil dihapus!');
        setDeleteModal({ isOpen: false, id: '', name: '' });
        loadData();
      } else {
        showFeedback('error', 'Gagal menghapus testimoni');
      }
    } catch {
      showFeedback('error', 'Gagal menghapus testimoni');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-neutral-900">
            Kelola Testimoni Pembeli ({testimonials.length})
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Review dan rating kepuasan yang tampil di carousel website utama
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            title="Refresh data"
            className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Testimoni</span>
          </button>
        </div>
      </div>

      {/* Floating Alert Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-medium border animate-in slide-in-from-top-2 duration-300 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* TABLE DATA TESTIMONI */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Daftar Ulasan &amp; Rating Pelanggan
          </span>
          <span className="text-xs text-neutral-400">Total {testimonials.length} ulasan</span>
        </div>

        {testimonials.length === 0 ? (
          <div className="p-12 text-center text-neutral-400 text-sm">
            Belum ada testimoni pembeli yang tersimpan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50/80 border-b border-neutral-200 text-xs text-neutral-500 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3.5">Pelanggan</th>
                  <th className="px-4 py-3.5">Rating</th>
                  <th className="px-4 py-3.5 w-1/2">Ulasan</th>
                  <th className="px-4 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-neutral-50/70 transition">
                    <td className="px-4 py-3.5 align-top">
                      <p className="font-semibold text-neutral-900 text-xs sm:text-sm">
                        {t.customerName}
                      </p>
                      <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                        {t.eventType}
                      </p>
                      {t.dateText && (
                        <p className="text-[10px] text-neutral-400">{t.dateText}</p>
                      )}
                    </td>
                    <td className="px-4 py-3.5 align-top">
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 align-top text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
                      “{t.comment}”
                    </td>
                    <td className="px-4 py-3.5 align-top text-right">
                      <button
                        onClick={() =>
                          setDeleteModal({
                            isOpen: true,
                            id: t.id,
                            name: `Ulasan dari ${t.customerName}`,
                          })
                        }
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="Hapus Testimoni"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL FORM TAMBAH TESTIMONI */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl border border-neutral-100 flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300"
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                  <MessageSquareQuote className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-base sm:text-lg text-neutral-900">
                    Tambah Ulasan Pembeli
                  </h2>
                  <p className="text-[11px] sm:text-xs text-neutral-500">
                    Testimoni untuk carousel depan website
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-4 flex-1">
              <form id="testi-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                      Nama Customer *
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Dinda K., Slawi"
                      value={form.customerName}
                      onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                      Acara / Pesanan
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Wisuda UPS Tegal"
                      value={form.eventType}
                      onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Rating Bintang
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang - Sangat Puas)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Bintang - Puas)</option>
                    <option value={3}>⭐⭐⭐ (3 Bintang - Cukup)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Komentar Ulasan *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ceritakan kepuasan pembeli terhadap kerapian ikatan buket dan pelayanannya..."
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm resize-none"
                    required
                  />
                </div>
              </form>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                form="testi-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition cursor-pointer active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Testimoni</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        title="Hapus Ulasan Testimoni?"
        message="Ulasan ini tidak akan lagi tampil di carousel cerita pelanggan."
        itemName={deleteModal.name}
        isLoading={isDeleting}
        onConfirm={confirmDeleteTesti}
        onCancel={() => setDeleteModal({ isOpen: false, id: '', name: '' })}
      />
    </div>
  );
}
