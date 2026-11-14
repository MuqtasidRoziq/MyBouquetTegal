import Link from 'next/link';
import { Flower2, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center px-4 py-16 text-neutral-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-100 text-emerald-800 shadow-sm mx-auto">
          <Flower2 className="w-10 h-10 text-emerald-700 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50/80 px-3 py-1 rounded-full border border-emerald-200/60">
            Error 404
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-sm mx-auto">
            Maaf, halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-900/15 transition active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
