'use client';

import React, { useState, useEffect } from 'react';
import { Store, Save, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [form, setForm] = useState({
    name: '',
    tagline: '',
    logoUrl: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/store');
      if (res.ok) {
        const d = await res.json();
        if (d.data?.store) {
          setForm({
            name: d.data.store.name || '',
            tagline: d.data.store.tagline || '',
            logoUrl: d.data.store.logoUrl || '',
          });
        }
      }
    } catch {
      showFeedback('error', 'Gagal memuat profil toko');
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/store', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store: form }),
      });

      if (res.ok) {
        showFeedback('success', 'Profil toko & logo berhasil disimpan!');
        loadData();
      } else {
        showFeedback('error', 'Gagal menyimpan profil');
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
            Profil Toko & Branding
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Pengaturan nama studio buket, slogan, dan logo brand resmi
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

      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Logo Studio Toko
            </label>
            <ImageUpload
              value={form.logoUrl}
              onChange={(url: string) => setForm({ ...form, logoUrl: url })}
              label="Logo Brand Toko (Format WebP/PNG/JPG)"
              folder="store"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Nama Brand Toko *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Tagline / Slogan Toko
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
              placeholder="Contoh: Artisan Florist & Gift Studio Tegal"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Profil Toko</span>
          </button>
        </form>
      </div>
    </div>
  );
}
