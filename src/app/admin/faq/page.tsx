'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Trash2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { FAQ } from '@/types';

export default function AdminFAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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
        showFeedback('success', 'FAQ baru berhasil ditambahkan!');
        setForm({ question: '', answer: '', category: 'Pemesanan', sortOrder: faqs.length + 1 });
        loadData();
      } else {
        showFeedback('error', 'Gagal menambahkan FAQ');
      }
    } catch {
      showFeedback('error', 'Terjadi kesalahan sistem');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus pertanyaan FAQ ini?')) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}&type=faq`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', 'FAQ berhasil dihapus');
        loadData();
      } else {
        showFeedback('error', 'Gagal menghapus FAQ');
      }
    } catch {
      showFeedback('error', 'Gagal menghapus FAQ');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-neutral-900">
            Kelola Tanya Jawab (FAQ) ({faqs.length})
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Daftar pertanyaan yang tampil di homepage dan halaman bantuan
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

      {/* Form Tambah FAQ */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
        <h2 className="font-serif font-bold text-lg text-neutral-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-emerald-700" />
          <span>Tambah Pertanyaan Baru</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Pertanyaan *
            </label>
            <input
              type="text"
              placeholder="Contoh: Apakah bisa request warna buket bunga?"
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
              rows={3}
              placeholder="Tuliskan jawaban yang ramah dan informatif..."
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Simpan ke FAQ</span>
          </button>
        </form>
      </div>

      {/* List FAQ */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-2xs divide-y divide-neutral-100">
        {faqs.map((f) => (
          <div key={f.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-semibold text-neutral-900 text-sm sm:text-base">{f.question}</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">{f.answer}</p>
            </div>
            <button
              onClick={() => handleDelete(f.id)}
              className="text-neutral-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition"
              title="Hapus FAQ"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
