'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Package,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Product, Category, ProductType } from '@/types';
import { formatRupiah } from '@/lib/whatsapp';
import ImageUpload from '@/components/ui/ImageUpload';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // State untuk modal konfirmasi hapus
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string; name: string }>({
    isOpen: false,
    id: '',
    name: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    categoryId: 'cat-1',
    productType: 'bucket' as ProductType,
    price: '',
    description: '',
    imageUrl: '',
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

  const handleOpenAddModal = () => {
    setEditingId(null);
    setForm({
      name: '',
      categoryId: categories[0]?.id || 'cat-1',
      productType: 'bucket',
      price: '',
      description: '',
      imageUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod: Product) => {
    setEditingId(prod.id);
    setForm({
      name: prod.name,
      categoryId: prod.categoryId,
      productType: prod.productType,
      price: prod.price.toString(),
      description: prod.description || '',
      imageUrl: prod.imageUrl,
    });
    setIsModalOpen(true);
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
        showFeedback(
          'success',
          editingId ? 'Produk berhasil diperbarui!' : 'Produk baru berhasil ditambahkan!'
        );
        setIsModalOpen(false);
        setEditingId(null);
        loadData();
      } else {
        const d = await res.json();
        showFeedback('error', d.message || 'Gagal menyimpan produk');
      }
    } catch {
      showFeedback('error', 'Terjadi kesalahan sistem');
    }
  };

  const confirmDeleteProduct = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products/${deleteModal.id}`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', `Produk "${deleteModal.name}" berhasil dihapus!`);
        setDeleteModal({ isOpen: false, id: '', name: '' });
        loadData();
      } else {
        showFeedback('error', 'Gagal menghapus produk');
      }
    } catch {
      showFeedback('error', 'Gagal menghapus produk');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  // Hitung total halaman & slice produk per 10 item
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Reset ke halaman 1 saat pencarian berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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
            className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk</span>
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

      {/* TABLE DATA PRODUK */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari produk buket / parcel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-hidden focus:border-emerald-600"
            />
          </div>
          <span className="text-xs text-neutral-400">
            Total {filteredProducts.length} produk ditampilkan
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-neutral-400 text-sm">
            Belum ada produk yang cocok.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50/80 border-b border-neutral-200 text-xs text-neutral-500 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3.5">Produk</th>
                    <th className="px-4 py-3.5">Tipe</th>
                    <th className="px-4 py-3.5">Harga</th>
                    <th className="px-4 py-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {paginatedProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-neutral-50/70 transition">
                      <td className="px-4 py-3 flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover border border-neutral-200/80 shrink-0 shadow-2xs"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-neutral-900 text-xs sm:text-sm leading-tight truncate max-w-xs">
                            {prod.name}
                          </p>
                          <p className="text-[11px] text-neutral-400 truncate max-w-xs mt-0.5">
                            {prod.description || 'Tidak ada deskripsi'}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs capitalize text-neutral-600 font-medium">
                        <span className="px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200/60">
                          {prod.productType}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-emerald-800 text-xs sm:text-sm">
                        {formatRupiah(prod.price)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            className="p-1.5 rounded-lg text-neutral-600 hover:text-emerald-800 hover:bg-emerald-50 transition cursor-pointer"
                            title="Edit Produk"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteModal({ isOpen: true, id: prod.id, name: prod.name })
                            }
                            className="p-1.5 rounded-lg text-neutral-600 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Hapus Produk"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-600">
              <div>
                Menampilkan{' '}
                <span className="font-semibold text-neutral-900">
                  {filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                </span>{' '}
                sampai{' '}
                <span className="font-semibold text-neutral-900">
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                </span>{' '}
                dari <span className="font-semibold text-neutral-900">{filteredProducts.length}</span> produk
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5 self-center sm:self-auto">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-white cursor-pointer transition"
                    title="Halaman Pertama"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-white cursor-pointer transition"
                    title="Halaman Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="px-3 py-1 font-semibold text-neutral-900">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-white cursor-pointer transition"
                    title="Halaman Berikutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:hover:bg-white cursor-pointer transition"
                    title="Halaman Terakhir"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* MODAL FORM TAMBAH / EDIT PRODUK */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl border border-neutral-100 flex flex-col max-h-[92vh] sm:max-h-[88vh] animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-base sm:text-lg text-neutral-900">
                    {editingId ? 'Edit Data Produk' : 'Tambah Produk Baru'}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-neutral-500">
                    Lengkapi informasi buket atau parcel
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

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto py-4 pr-1 space-y-4 flex-1">
              <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                      Nama Produk *
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Buket Mawar Merah Segar"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Deskripsi Lengkap Produk
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tuliskan keterangan detail wrapping buket, jenis bunga/isian snack, free kartu ucapan, cara request custom, dll..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Foto Produk *
                  </label>
                  <ImageUpload
                    value={form.imageUrl}
                    onChange={(url) => setForm({ ...form, imageUrl: url })}
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer (Always visible at bottom) */}
            <div className="flex items-center justify-end gap-3 pt-3.5 border-t border-neutral-100 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                form="product-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition cursor-pointer active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Simpan Perubahan' : 'Terbitkan Produk'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        title="Hapus Produk?"
        message="Produk yang dihapus tidak akan lagi muncul di katalog toko."
        itemName={deleteModal.name}
        isLoading={isDeleting}
        onConfirm={confirmDeleteProduct}
        onCancel={() => setDeleteModal({ isOpen: false, id: '', name: '' })}
      />
    </div>
  );
}
