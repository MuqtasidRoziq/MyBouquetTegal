'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flower2, Lock, User, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-linear-to-b from-stone-50 via-[#F8F9FA] to-stone-100 flex items-center justify-center p-4 sm:p-6 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Background Decorative Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      {/* Main Single Login Card */}
      <div className="relative w-full max-w-[400px] bg-white rounded-3xl shadow-xl shadow-neutral-200/50 border border-neutral-200/80 p-7 sm:p-9 space-y-6">
        {/* Brand Icon & Heading */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-13 h-13 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-lg shadow-emerald-900/15 ring-4 ring-emerald-50">
            <Flower2 className="w-7 h-7 text-emerald-200" />
          </div>
          <div className="pt-2">
            <h1 className="font-serif text-2xl sm:text-[26px] font-bold text-neutral-900 tracking-tight">
              My Bouquet Tegal
            </h1>
            <p className="text-xs text-neutral-500 font-light mt-0.5">
              Silakan masuk ke akun admin Anda
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-800 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-neutral-400" />
              <span>Username</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                autoComplete="username"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-emerald-700 focus:ring-3 focus:ring-emerald-700/15 text-xs sm:text-sm outline-hidden transition placeholder:text-neutral-400"
              />
            </div>
          </div>

          {/* Password Field with Show/Hide Toggle Eye */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-11 py-3 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:border-emerald-700 focus:ring-3 focus:ring-emerald-700/15 text-xs sm:text-sm outline-hidden transition placeholder:text-neutral-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-neutral-600 rounded-lg transition"
                aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-emerald-800" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-900/15 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
          >
            <span>{loading ? 'Memverifikasi...' : 'Masuk'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
