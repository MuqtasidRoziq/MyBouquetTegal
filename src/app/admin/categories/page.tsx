'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Plus, Trash2, CheckCircle, AlertCircle, RefreshCw, Flower2, Gift } from 'lucide-react';
import { Category, ProductType } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
        showFeedback('success', 'Kategori baru berhasil ditambahkan!');
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-neutral-900">
            Kelola Kategori Produk ({categories.length})
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Pengelompokan jenis buket (wisuda, snack, uang, dsb) dan parcel hampers
          </p>
        </div>

        <button
          onClick={loadData}
          title="Refresh data"
          className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 transition self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm font-medium border ${
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

      {/* Form Tambah Kategori */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
        <h2 className="font-serif font-bold text-lg text-neutral-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-emerald-700" />
          <span>Tambah Kategori Baru</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                onChange={(e) => setForm({ ...form, productType: e.target.value as ProductType })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
              >
                <option value="bucket">Buket (Bunga/Snack/Uang)</option>
                <option value="parcel">Parcel & Hampers</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Keterangan Singkat
            </label>
            <input
              type="text"
              placeholder="Deskripsi singkat kategori..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Simpan Kategori</span>
          </button>
        </form>
      </div>

      {/* Grid Kategori List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                  {c.productType === 'bucket' ? (
                    <Flower2 className="w-4 h-4" />
                  ) : (
                    <Gift className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm">{c.name}</h3>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-medium">
                    {c.productType}
                  </span>
                </div>
              </div>
            </div>
            {c.description && (
              <p className="mt-3 text-xs text-neutral-500 font-light">{c.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
