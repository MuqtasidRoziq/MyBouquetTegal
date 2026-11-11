'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Save, CheckCircle, AlertCircle, RefreshCw, MapPin } from 'lucide-react';

export default function AdminContactPage() {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [form, setForm] = useState({
    whatsappNumber: '',
    chatWhatsappTemplate: '',
    instagramHandle: '',
    instagramUrl: '',
    address: '',
    googleMapsFrameUrl: '',
    operationalHours: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/store');
      if (res.ok) {
        const d = await res.json();
        if (d.data?.contact) {
          setForm({
            whatsappNumber: d.data.contact.whatsappNumber || '',
            chatWhatsappTemplate: d.data.contact.chatWhatsappTemplate || '',
            instagramHandle: d.data.contact.instagramHandle || '',
            instagramUrl: d.data.contact.instagramUrl || '',
            address: d.data.contact.address || '',
            googleMapsFrameUrl: d.data.contact.googleMapsFrameUrl || '',
            operationalHours: d.data.contact.operationalHours || '',
          });
        }
      }
    } catch {
      showFeedback('error', 'Gagal memuat kontak toko');
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
        body: JSON.stringify({ contact: form }),
      });

      if (res.ok) {
        showFeedback('success', 'Kontak, WhatsApp & Lokasi Maps tersimpan!');
        loadData();
      } else {
        showFeedback('error', 'Gagal menyimpan kontak');
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
            Kontak, WhatsApp & Peta Lokasi
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Nomor tujuan order buket, jam operasional, dan titik workshop di Google Maps
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

      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-xs max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Nomor WhatsApp Toko (Awali 62) *
              </label>
              <input
                type="text"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Jam Operasional
              </label>
              <input
                type="text"
                value={form.operationalHours}
                onChange={(e) => setForm({ ...form, operationalHours: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                placeholder="Contoh: 08.00 - 20.00 WIB"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Username Instagram
              </label>
              <input
                type="text"
                value={form.instagramHandle}
                onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                placeholder="@mybouquettegal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Link URL Instagram
              </label>
              <input
                type="url"
                value={form.instagramUrl}
                onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
                placeholder="https://instagram.com/mybouquettegal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Alamat Lengkap Workshop
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-sm"
              placeholder="Contoh: Jl. Ahmad Yani No. 12, Slawi, Tegal"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Frame URL Google Maps (Embed src)</span>
            </label>
            <textarea
              rows={2}
              placeholder="https://www.google.com/maps/embed?pb=..."
              value={form.googleMapsFrameUrl}
              onChange={(e) => setForm({ ...form, googleMapsFrameUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-hidden text-xs font-mono resize-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Kontak & Maps</span>
          </button>
        </form>
      </div>
    </div>
  );
}
