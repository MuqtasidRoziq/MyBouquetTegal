'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { StoreInfo } from '@/types';
import { Flower2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [store, setStore] = useState<StoreInfo | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/store')
      .then((res) => res.json())
      .then((d) => {
        if (d?.data?.store) setStore(d.data.store);
      })
      .catch(() => {});
  }, []);

  // Jika sedang di halaman login, tampilkan layar penuh tanpa sidebar / navbar admin
  // Mendukung baik /admin/login (direct) maupun /login (rewrite via admin subdomain)
  const isLoginPage = pathname === '/admin/login' || pathname === '/login' || pathname.endsWith('/login');
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-neutral-800 flex font-sans">
      {/* Sidebar Navigasi Admin (Desktop Sidebar & Mobile Bottom App Bar) */}
      <Sidebar
        store={store}
        mobileMenuOpen={mobileMenuOpen}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Mobile Top Header (Ringkas & Bersih) */}
        <header className="md:hidden bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-4 h-14 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            {store?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={store.logoUrl}
                alt="Logo"
                className="w-7 h-7 rounded-lg object-cover border border-emerald-600/30"
              />
            ) : (
              <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
                <Flower2 className="w-4 h-4" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-serif font-bold text-neutral-900 text-xs sm:text-sm leading-tight truncate max-w-[170px]">
                {store?.name || 'My Bouquet Tegal'}
              </span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span className="text-[10px] text-neutral-500 font-medium">Panel Admin</span>
              </div>
            </div>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 active:scale-95 transition"
          >
            <span>Lihat Toko</span>
            <ExternalLink className="w-3 h-3 text-emerald-600" />
          </Link>
        </header>

        {/* Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
