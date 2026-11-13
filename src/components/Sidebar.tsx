'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  Layers,
  Phone,
  HelpCircle,
  MessageSquareQuote,
  Store,
  LogOut,
  ExternalLink,
  Flower2,
  X,
  MoreHorizontal,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { StoreInfo } from '@/types';

interface SidebarProps {
  store?: StoreInfo | null;
  mobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
  onOpenMobileMenu?: () => void;
}

export default function Sidebar({
  store,
  mobileMenuOpen = false,
  onCloseMobileMenu,
  onOpenMobileMenu,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Tepat 4 Menu Utama yang tampil langsung di Bilah Navigasi Bawah Mobile
  const primaryNav = [
    { href: '/admin/dashboard', label: 'Dashboard Ringkasan', shortLabel: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Kelola Produk', shortLabel: 'Produk', icon: Package },
    { href: '/admin/categories', label: 'Kelola Kategori', shortLabel: 'Kategori', icon: Layers },
    { href: '/admin/contact', label: 'Kontak & Maps', shortLabel: 'Kontak', icon: Phone },
  ];

  // Menu Sekunder / Opsi Lain (muncul di sidebar desktop dan di dalam Bottom Sheet "Opsi Lain")
  const secondaryNav = [
    { href: '/admin/profile', label: 'Profil Toko & Logo', shortLabel: 'Profil Toko', icon: Store, desc: 'Nama brand, logo, & slogan' },
    { href: '/admin/faq', label: 'Kelola FAQ', shortLabel: 'Tanya Jawab (FAQ)', icon: HelpCircle, desc: 'Pertanyaan umum pemesanan' },
    { href: '/admin/testimoni', label: 'Testimoni Pembeli', shortLabel: 'Testimoni', icon: MessageSquareQuote, desc: 'Ulasan & bintang kepuasan' },
  ];

  // Cek apakah halaman yang dibuka adalah bagian dari menu sekunder
  const isSecondaryActive = secondaryNav.some((item) => pathname === item.href);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <>
      {/* =========================================================================
          1. DESKTOP SIDEBAR (MD & LG SCREENS)
      ========================================================================= */}
      <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 bg-white border-r border-neutral-200/80 sticky top-0 h-screen shrink-0 select-none z-30">
        <div>
          {/* Header Brand */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-3 group">
              {store?.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={store.logoUrl}
                  alt="Logo"
                  className="w-10 h-10 rounded-2xl object-cover border border-emerald-600/20 shadow-2xs group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
                  <Flower2 className="w-5 h-5" />
                </div>
              )}
              <div className="min-w-0">
                <h2 className="font-serif font-bold text-sm lg:text-base text-neutral-900 leading-tight truncate">
                  {store?.name || 'My Bouquet Tegal'}
                </h2>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span className="text-[11px] text-emerald-800 font-semibold tracking-wide uppercase">
                    Admin Panel
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigasi Desktop Terkelompok */}
          <div className="p-3.5 space-y-6">
            <div>
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Menu Utama
              </p>
              <nav className="space-y-1">
                {primaryNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80'
                      }`}
                    >
                      <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                      <span className="flex-1">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Opsi &amp; Konten Lain
              </p>
              <nav className="space-y-1">
                {secondaryNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80'
                      }`}
                    >
                      <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                      <span className="flex-1">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-100 space-y-2 bg-neutral-50/50">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200/80 shadow-2xs transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              <span>Lihat Website Toko</span>
            </span>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200/70 transition cursor-pointer active:scale-98"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Akun (Logout)</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          2. MOBILE BOTTOM APP BAR (DASHBOARD, PRODUK, KATEGORI, KONTAK, OPSI LAIN)
      ========================================================================= */}
      <nav
        aria-label="Navigasi Bawah Admin Mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 z-40 py-1.5 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] select-none"
      >
        <div className="grid grid-cols-5 items-center max-w-md mx-auto px-1">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all ${
                  isActive
                    ? 'text-emerald-800 font-bold'
                    : 'text-neutral-400 hover:text-neutral-700 font-medium'
                }`}
              >
                <div
                  className={`relative p-1.5 rounded-xl transition-all ${
                    isActive ? 'bg-emerald-50 text-emerald-800' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <span className="absolute -top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-700" />
                  )}
                </div>
                <span className="text-[10px] leading-tight mt-0.5 truncate w-full text-center">
                  {item.shortLabel}
                </span>
              </Link>
            );
          })}

          {/* Tombol 'Opsi Lain' */}
          <button
            onClick={onOpenMobileMenu}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all cursor-pointer ${
              isSecondaryActive || mobileMenuOpen
                ? 'text-emerald-800 font-bold'
                : 'text-neutral-400 hover:text-neutral-700 font-medium'
            }`}
          >
            <div
              className={`relative p-1.5 rounded-xl transition-all ${
                isSecondaryActive || mobileMenuOpen ? 'bg-emerald-50 text-emerald-800' : ''
              }`}
            >
              <MoreHorizontal className="w-5 h-5" />
              {isSecondaryActive && (
                <span className="absolute -top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-700" />
              )}
            </div>
            <span className="text-[10px] leading-tight mt-0.5 truncate w-full text-center">
              Opsi Lain
            </span>
          </button>
        </div>
      </nav>

      {/* =========================================================================
          3. MOBILE DRAWER SHEET ("OPSI LAIN")
      ========================================================================= */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-neutral-900/50 z-50 md:hidden backdrop-blur-2xs transition-opacity"
            onClick={onCloseMobileMenu}
          />

          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl border-t border-neutral-200 z-50 md:hidden p-5 max-w-lg mx-auto shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                {store?.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={store.logoUrl}
                    alt="Logo"
                    className="w-7 h-7 rounded-lg object-cover border border-emerald-600/30"
                  />
                ) : (
                  <Flower2 className="w-6 h-6 text-emerald-800" />
                )}
                <div>
                  <h3 className="font-serif font-bold text-sm text-neutral-900">
                    Opsi &amp; Menu Tambahan
                  </h3>
                  <p className="text-[11px] text-neutral-500">Pilih menu yang ingin Anda kelola</p>
                </div>
              </div>
              <button
                onClick={onCloseMobileMenu}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3 space-y-1.5">
              {secondaryNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobileMenu}
                    className={`flex items-center gap-3.5 p-3 rounded-2xl transition ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border border-neutral-200/60'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-white text-emerald-800 shadow-2xs'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs sm:text-sm leading-tight">{item.shortLabel}</p>
                      <p className={`text-[11px] mt-0.5 truncate ${isActive ? 'text-emerald-100' : 'text-neutral-500'}`}>
                        {item.desc}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-emerald-200' : 'text-neutral-400'}`} />
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-neutral-100 space-y-2">
              <Link
                href="/"
                target="_blank"
                onClick={onCloseMobileMenu}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Lihat Website Toko</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200/70 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Akun (Logout)</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
