'use client';

import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  X,
  Save,
} from 'lucide-react';
import { FAQ } from '@/types';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal';

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
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
    question: '',
    answer: '',
    category: 'Pemesanan',
    sortOrder: 1,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) {
        const d = await res.json();
        setFaqs(d.data?.faqs || []);
      }
    } catch {
      showFeedback('error', 'Gagal memuat daftar FAQ');
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
    setForm({ question: '', answer: '', category: 'Pemesanan', sortOrder: faqs.length + 1 });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.answer) {
      showFeedback('error', 'Pertanyaan dan jawaban wajib diisi!');
      return;
    }

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'faq', data: form }),
      });

      if (res.ok) {
        showFeedback('success', 'Pertanyaan FAQ baru berhasil ditambahkan!');
        setIsModalOpen(false);
        setForm({ question: '', answer: '', category: 'Pemesanan', sortOrder: faqs.length + 1 });
        loadData();
      } else {
        showFeedback('error', 'Gagal menambahkan FAQ');
      }
    } catch {
      showFeedback('error', 'Terjadi kesalahan sistem');
    }
  };

  const confirmDeleteFAQ = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/testimonials?id=${deleteModal.id}&type=faq`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showFeedback('success', 'Pertanyaan FAQ berhasil dihapus!');
        setDeleteModal({ isOpen: false, id: '', name: '' });
        loadData();
      } else {
        showFeedback('error', 'Gagal menghapus FAQ');
      }
    } catch {
      showFeedback('error', 'Gagal menghapus FAQ');
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
            Kelola Tanya Jawab (FAQ) ({faqs.length})
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Daftar pertanyaan yang tampil di homepage dan pusat bantuan
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
            <span>Tambah FAQ</span>
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

      {/* TABLE DATA FAQ */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Daftar Pertanyaan &amp; Jawaban
          </span>
          <span className="text-xs text-neutral-400">Total {faqs.length} pertanyaan</span>
        </div>

        {faqs.length === 0 ? (
          <div className="p-12 text-center text-neutral-400 text-sm">
            Belum ada FAQ yang tersimpan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50/80 border-b border-neutral-200 text-xs text-neutral-500 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3.5 w-1/3">Pertanyaan</th>
                  <th className="px-4 py-3.5">Jawaban</th>
                  <th className="px-4 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {faqs.map((f) => (
                  <tr key={f.id} className="hover:bg-neutral-50/70 transition">
                    <td className="px-4 py-3.5 align-top">
                      <p className="font-semibold text-neutral-900 text-xs sm:text-sm leading-snug">
                        {f.question}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 uppercase tracking-wider">
                        {f.category || 'Umum'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 align-top text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                      {f.answer}
                    </td>
                    <td className="px-4 py-3.5 align-top text-right">
                      <button
                        onClick={() =>
                          setDeleteModal({ isOpen: true, id: f.id, name: f.question })
                        }
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="Hapus FAQ"
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

      {/* MODAL FORM TAMBAH FAQ */}
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
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-base sm:text-lg text-neutral-900">
                    Tambah Pertanyaan Baru
                  </h2>
                  <p className="text-[11px] sm:text-xs text-neutral-500">
                    Tanya jawab informasi buket &amp; pemesanan
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
              <form id="faq-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Pertanyaan *
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Apakah bisa request bunga artificial?"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                    Jawaban Lengkap *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tuliskan jawaban yang ramah, jelas, dan informatif..."
                    value={form.answer}
                    onChange={(e) => setForm({ ...form, answer: e.target.value })}
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
                form="faq-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition cursor-pointer active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Simpan ke FAQ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        title="Hapus Pertanyaan FAQ?"
        message="Pertanyaan ini tidak akan lagi muncul di halaman website dan bantuan."
        itemName={deleteModal.name}
        isLoading={isDeleting}
        onConfirm={confirmDeleteFAQ}
        onCancel={() => setDeleteModal({ isOpen: false, id: '', name: '' })}
      />
    </div>
  );
}
