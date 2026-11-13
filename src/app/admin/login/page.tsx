'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Flower2, Lock, User, ArrowRight, AlertCircle, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect ke dashboard admin root
        router.push('/');
        router.refresh();
      } else {
        setError(data.message || 'Username atau password salah.');
      }
    } catch {
      setError('Terjadi kendala koneksi ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Top Bar Minimalis */}
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
            <Flower2 className="w-5 h-5 text-emerald-200" />
          </div>
          <span className="font-serif font-bold text-base sm:text-lg text-neutral-900 tracking-tight">
            My Bouquet Tegal
          </span>
        </div>

        <Link
          href="https://mybouquettegal.biz.id"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ke Website Utama</span>
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-xl shadow-neutral-200/60 border border-neutral-200/70 p-6 sm:p-8 space-y-6">
          {/* Header Title */}
          <div className="space-y-1.5 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-[11px] font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Portal Manajemen Florist</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Masuk Administrator
            </h1>
            <p className="text-xs text-neutral-500 font-light">
              Silakan login untuk mengelola katalog, kategori, &amp; pesanan
            </p>
          </div>

          {/* Error Notification */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-800 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span>Username</span>
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                placeholder="Masukkan username admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-emerald-700 focus:ring-3 focus:ring-emerald-700/15 text-xs sm:text-sm outline-hidden transition placeholder:text-neutral-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-emerald-700 focus:ring-3 focus:ring-emerald-700/15 text-xs sm:text-sm outline-hidden transition placeholder:text-neutral-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-900/15 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
            >
              <span>{loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Security Note */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
            <Lock className="w-3 h-3 text-neutral-400" />
            <span>Koneksi aman terenkripsi TLS &bull; Cloudflare</span>
          </div>
        </div>
      </main>

      {/* Footer Hak Cipta */}
      <footer className="w-full py-4 text-center text-xs text-neutral-400">
        <p>&copy; {new Date().getFullYear()} My Bouquet Tegal. Seluruh Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
}
