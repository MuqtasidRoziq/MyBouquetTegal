'use client';

import React, { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  Layers,
  HelpCircle,
  MessageSquareQuote,
  Store,
  Phone,
  LogOut,
  ExternalLink,
  Flower2,
  X,
} from 'lucide-react';
import { StoreInfo } from '@/types';

interface SidebarProps {
  store?: StoreInfo | null;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  store,
  mobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard Ringkasan', icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: '/admin/products', label: 'Kelola Produk', icon: <Package className="w-5 h-5" /> },
    { href: '/admin/categories', label: 'Kelola Kategori', icon: <Layers className="w-5 h-5" /> },
    { href: '/admin/faq', label: 'Kelola FAQ', icon: <HelpCircle className="w-5 h-5" /> },
    { href: '/admin/testimoni', label: 'Testimoni Pembeli', icon: <MessageSquareQuote className="w-5 h-5" /> },
    { href: '/admin/profile', label: 'Profil Toko & Logo', icon: <Store className="w-5 h-5" /> },
    { href: '/admin/contact', label: 'Kontak & Lokasi Maps', icon: <Phone className="w-5 h-5" /> },
  ];

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
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-2xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-neutral-200 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header Brand */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              {store?.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={store.logoUrl}
                  alt="Logo"
                  className="w-9 h-9 rounded-full object-cover border border-emerald-600/30"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                  <Flower2 className="w-5 h-5" />
                </div>
              )}
              <div>
                <h2 className="font-serif font-bold text-base text-neutral-900 leading-tight">
                  {store?.name || 'My Bouquet'}
                </h2>
                <p className="text-[11px] text-emerald-700 font-medium">Panel Admin</p>
              </div>
            </Link>

            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="md:hidden p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-neutral-100 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-600 hover:text-neutral-900 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 border border-rose-200/60 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>
    </>
  );
}
