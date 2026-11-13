'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Flower2,
  Gift,
  X,
  Save,
} from 'lucide-react';
import { Category, ProductType } from '@/types';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
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
    name: '',
    productType: 'bucket' as ProductType,
    description: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const d = await res.json();
        setCategories(d.data || []);
      }
    } catch {
      showFeedback('error', 'Gagal memuat kategori');
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
    setForm({ name: '', productType: 'bucket', description: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      showFeedback('error', 'Nama kategori wajib diisi!');
      return;
    }

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        showFeedback('success', `Kategori "${form.name}" berhasil ditambahkan!`);
        setIsModalOpen(false);
        setForm({ name: '', productType: 'bucket', description: '' });
        loadData();
      } else {
        const d = await res.json();
        showFeedback('error', d.message || 'Gagal menambahkan kategori');
      }
    } catch {
      showFeedback('error', 'Terjadi kesalahan sistem');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-neutral-900">
            Kelola Kategori Produk ({categories.length})
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Pengelompokan jenis buket (wisuda, snack, uang, dsb) dan parcel hampers
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
            <span>Tambah Kategori</span>
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

      {/* TABLE DATA KATEGORI */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Daftar Kategori Terdaftar
          </span>
          <span className="text-xs text-neutral-400">Total {categories.length} kategori</span>
        </div>

        {categories.length === 0 ? (
          <div className="p-12 text-center text-neutral-400 text-sm">
            Belum ada kategori yang terdaftar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50/80 border-b border-neutral-200 text-xs text-neutral-500 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3.5">Nama Kategori</th>
                  <th className="px-4 py-3.5">Tipe Produk</th>
                  <th className="px-4 py-3.5">Deskripsi</th>
                  <th className="px-4 py-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-neutral-50/70 transition">
                    <td className="px-4 py-3.5 flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 shrink-0">
                        {c.productType === 'bucket' ? (
                          <Flower2 className="w-4 h-4" />
                        ) : (
                          <Gift className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900 text-xs sm:text-sm">
                          {c.name}
                        </p>
                        <p className="text-[11px] text-neutral-400 font-mono">slug: {c.slug}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs capitalize text-neutral-700 font-medium">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold text-[11px]">
                        {c.productType === 'bucket' ? 'Buket' : 'Parcel Hampers'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-neutral-500 max-w-xs truncate">
                      {c.description || '-'}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50/60 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Aktif
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL TAMBAH KATEGORI */}
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
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-base sm:text-lg text-neutral-900">
                    Tambah Kategori Baru
                  </h2>
                  <p className="text-[11px] sm:text-xs text-neutral-500">
                    Kelompokkan buket atau parcel
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
              <form id="category-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Nama Kategori *
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Buket Bunga Wisuda"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Tipe Produk
                  </label>
                  <select
                    value={form.productType}
                    onChange={(e) =>
                      setForm({ ...form, productType: e.target.value as ProductType })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                  >
                    <option value="bucket">Buket (Bunga/Snack/Uang/Boneka)</option>
                    <option value="parcel">Parcel &amp; Hampers Hari Raya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Keterangan Singkat
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Keterangan kategori buket/parcel..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm resize-none"
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
                form="category-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition cursor-pointer active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Kategori</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
