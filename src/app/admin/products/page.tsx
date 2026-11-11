'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Trash2,
  Edit2,
  Save,
  Sparkles,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Search,
} from 'lucide-react';
import { Product, Category, ProductStatus, ProductType } from '@/types';
import { formatRupiah } from '@/lib/whatsapp';
import ImageUpload from '@/components/ui/ImageUpload';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [form, setForm] = useState({
    name: '',
    categoryId: 'cat-1',
    productType: 'bucket' as ProductType,
    price: '',
    description: '',
    imageUrl: '',
    badge: '',
    status: 'ready' as ProductStatus,
    isFeatured: false,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
      ]);
      if (pRes.ok) {
        const d = await pRes.json();
        setProducts(d.data || []);
      }
      if (cRes.ok) {
        const d = await cRes.json();
        setCategories(d.data || []);
        if (d.data?.length > 0 && !form.categoryId) {
          setForm((prev) => ({ ...prev, categoryId: d.data[0].id }));
        }
      }
    } catch {
      showFeedback('error', 'Gagal memuat data produk');
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
    if (!form.name || !form.price || !form.imageUrl) {
      showFeedback('error', 'Nama, harga, dan foto produk wajib diisi!');
      return;
    }

    try {
      const payload = {
        ...form,
        price: parseInt(form.price.toString().replace(/\D/g, '')) || 0,
      };

      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showFeedback('success', editingId ? 'Produk berhasil diperbarui!' : 'Produk berhasil ditambahkan!');
        setIsFormOpen(false);
        setEditingId(null);
        setForm({
          name: '',
          categoryId: categories[0]?.id || 'cat-1',
          productType: 'bucket',
          price: '',
          description: '',
          imageUrl: '',
          badge: '',
          status: 'ready',
          isFeatured: false,
        });
        loadData();
      } else {
        const d = await res.json();
        showFeedback('error', d.message || 'Gagal menyimpan produk');
      }
    } catch {
      showFeedback('error', 'Terjadi kesalahan sistem');
    }
  };

  const handleEdit = (prod: Product) => {
    setEditingId(prod.id);
    setForm({
      name: prod.name,
      categoryId: prod.categoryId,
      productType: prod.productType,
      price: prod.price.toString(),
      description: prod.description || '',
      imageUrl: prod.imageUrl,
      badge: prod.badge || '',
      status: prod.status,
      isFeatured: prod.isFeatured || false,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus produk "${name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', 'Produk berhasil dihapus');
        loadData();
      } else {
        showFeedback('error', 'Gagal menghapus produk');
      }
    } catch {
      showFeedback('error', 'Gagal menghapus produk');
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-neutral-900">
            Kelola Produk ({products.length})
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Daftar buket bunga, snack, uang, dan parcel hampers aktif
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            title="Refresh data"
            className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setForm({
                name: '',
                categoryId: categories[0]?.id || 'cat-1',
                productType: 'bucket',
                price: '',
                description: '',
                imageUrl: '',
                badge: '',
                status: 'ready',
                isFeatured: false,
              });
              setIsFormOpen(!isFormOpen);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>{isFormOpen ? 'Tutup Form' : 'Tambah Produk Baru'}</span>
          </button>
        </div>
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

      {/* FORM TAMBAH / EDIT PRODUK */}
      {isFormOpen && (
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
          <h2 className="font-serif font-bold text-lg text-neutral-900 mb-6">
            {editingId ? 'Edit Data Produk' : 'Tambah Produk Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Nama Produk *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Buket Mawar Merah Segar Premium"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Harga (Rp) *
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 65000"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Kategori
                </label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.productType})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  Status Stok
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as ProductStatus })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                >
                  <option value="ready">Ready Stock (Siap Kirim)</option>
                  <option value="po">Pre-Order (PO)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Foto Produk *
              </label>
              <ImageUpload
                value={form.imageUrl}
                onChange={(url: string) => setForm({ ...form, imageUrl: url })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Deskripsi Buket
              </label>
              <textarea
                rows={3}
                placeholder="Rincian bunga/snack, jenis wrapping, warna pita..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isFeatured"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="w-4 h-4 text-emerald-700 rounded-sm focus:ring-emerald-500 border-neutral-300"
              />
              <label htmlFor="isFeatured" className="text-sm font-medium text-neutral-800 cursor-pointer">
                Tampilkan di Koleksi Unggulan Homepage
              </label>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-xs transition"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Simpan Perubahan' : 'Terbitkan Produk'}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 font-semibold text-sm hover:bg-neutral-200 transition"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SEARCH & TABLE */}
      <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-neutral-100">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-hidden focus:border-emerald-600"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-neutral-400 text-sm">
            Belum ada produk yang cocok.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50/80 border-b border-neutral-200 text-xs text-neutral-500 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Produk</th>
                  <th className="px-4 py-3">Tipe</th>
                  <th className="px-4 py-3">Harga</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-neutral-50/60 transition">
                    <td className="px-4 py-3 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-neutral-900 leading-tight">{prod.name}</p>
                        {prod.isFeatured && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full mt-1">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            Unggulan Home
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs capitalize text-neutral-600 font-medium">
                      {prod.productType}
                    </td>
                    <td className="px-4 py-3 font-semibold text-emerald-800">
                      {formatRupiah(prod.price)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          prod.status === 'ready'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {prod.status === 'ready' ? 'Ready' : 'Pre-Order'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(prod)}
                        className="p-1.5 rounded-lg text-neutral-600 hover:text-emerald-800 hover:bg-emerald-50 transition"
                        title="Edit Produk"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="p-1.5 rounded-lg text-neutral-600 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Hapus Produk"
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
    </div>
  );
}
