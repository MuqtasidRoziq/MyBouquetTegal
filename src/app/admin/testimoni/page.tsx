'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, Plus, Trash2, CheckCircle, AlertCircle, RefreshCw, Star } from 'lucide-react';
import { Testimonial } from '@/types';

export default function AdminTestimoniPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customerName || !form.comment) {
      showFeedback('error', 'Nama pelanggan dan isi ulasan wajib diisi!');
      return;
    }

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'testimonial', data: form }),
      });

      if (res.ok) {
        showFeedback('success', 'Ulasan pembeli berhasil ditambahkan!');
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

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus testimoni ini?')) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}&type=testimonial`, { method: 'DELETE' });
      if (res.ok) {
        showFeedback('success', 'Testimoni berhasil dihapus');
        loadData();
      } else {
        showFeedback('error', 'Gagal menghapus testimoni');
      }
    } catch {
      showFeedback('error', 'Gagal menghapus testimoni');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl text-neutral-900">
            Kelola Testimoni Pembeli ({testimonials.length})
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Review dan rating kepuasan yang tampil di website utama
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

      {/* Form Tambah Testimoni */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
        <h2 className="font-serif font-bold text-lg text-neutral-900 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-emerald-700" />
          <span>Tambah Ulasan Pembeli Baru</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                Acara / Jenis Buket
              </label>
              <input
                type="text"
                placeholder="Contoh: Wisuda Poltek Harber"
                value={form.eventType}
                onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Komentar Ulasan *
            </label>
            <textarea
              rows={3}
              placeholder="Ceritakan kepuasan pembeli terhadap kerapian buket..."
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Simpan Testimoni</span>
          </button>
        </form>
      </div>

      {/* Grid Testimoni */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-3xl bg-white border border-neutral-200 shadow-2xs relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-neutral-400 hover:text-rose-600 p-1 rounded-lg"
                  title="Hapus ulasan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">“{t.comment}”</p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100">
              <h4 className="font-bold text-neutral-900 text-xs">{t.customerName}</h4>
              <p className="text-[10px] text-emerald-700 font-medium">{t.eventType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
