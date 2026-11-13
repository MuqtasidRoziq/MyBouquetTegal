'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  Layers,
  HelpCircle,
  MessageSquareQuote,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Store,
  Phone,
  PlusCircle,
  TrendingUp,
} from 'lucide-react';
import { Product, Category, Testimonial, FAQ, StoreInfo } from '@/types';

export default function DashboardOverviewPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [store, setStore] = useState<StoreInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [prodRes, catRes, testiRes, storeRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/testimonials'),
          fetch('/api/store'),
        ]);

        if (prodRes.ok) {
          const d = await prodRes.json();
          setProducts(d.data || []);
        }
        if (catRes.ok) {
          const d = await catRes.json();
          setCategories(d.data || []);
        }
        if (testiRes.ok) {
          const d = await testiRes.json();
          setTestimonials(d.data?.testimonials || []);
          setFaqs(d.data?.faqs || []);
        }
        if (storeRes.ok) {
          const d = await storeRes.json();
          if (d.data?.store) setStore(d.data.store);
        }
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  // 6 Modul Dashboard - Ditampilkan 2 kolom di HP dan 3-4 kolom di desktop
  const menuModules = [
    {
      title: 'Katalog Produk',
      badge: 'Produk',
      count: products.length,
      unit: 'Item',
      desc: 'Buket bunga, uang, snack & parcel',
      icon: Package,
      href: '/admin/products',
      btnLabel: 'Buka Produk',
      colorTheme: 'emerald',
      actionHref: '/admin/products',
    },
    {
      title: 'Kategori Produk',
      badge: 'Kategori',
      count: categories.length,
      unit: 'Kategori',
      desc: 'Kelompok buket wisuda & event',
      icon: Layers,
      href: '/admin/categories',
      btnLabel: 'Buka Kategori',
      colorTheme: 'teal',
      actionHref: '/admin/categories',
    },
    {
      title: 'Ulasan & Testimoni',
      badge: 'Testimoni',
      count: testimonials.length,
      unit: 'Ulasan',
      desc: 'Rating kepuasan & cerita pelanggan',
      icon: MessageSquareQuote,
      href: '/admin/testimoni',
      btnLabel: 'Buka Testimoni',
      colorTheme: 'amber',
      actionHref: '/admin/testimoni',
    },
    {
      title: 'Tanya Jawab FAQ',
      badge: 'Bantuan',
      count: faqs.length,
      unit: 'Pertanyaan',
      desc: 'Pertanyaan umum seputar order',
      icon: HelpCircle,
      href: '/admin/faq',
      btnLabel: 'Buka FAQ',
      colorTheme: 'indigo',
      actionHref: '/admin/faq',
    },
    {
      title: 'Kontak & Peta Maps',
      badge: 'Lokasi & CS',
      count: 'Aktif',
      unit: 'WhatsApp & Maps',
      desc: 'No WA fast-response & koordinat GPS',
      icon: Phone,
      href: '/admin/contact',
      btnLabel: 'Buka Kontak',
      colorTheme: 'blue',
      actionHref: '/admin/contact',
    },
    {
      title: 'Profil & Identitas',
      badge: 'Brand Toko',
      count: 'Aktif',
      unit: 'Logo & Slogan',
      desc: 'Nama studio, logo, dan identitas toko',
      icon: Store,
      href: '/admin/profile',
      btnLabel: 'Buka Profil',
      colorTheme: 'rose',
      actionHref: '/admin/profile',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          bg: 'bg-emerald-500/10 text-emerald-800',
          border: 'border-emerald-200/80 hover:border-emerald-400',
          badge: 'bg-emerald-100/80 text-emerald-800',
          btn: 'bg-emerald-800 hover:bg-emerald-900 text-white',
        };
      case 'teal':
        return {
          bg: 'bg-teal-500/10 text-teal-800',
          border: 'border-teal-200/80 hover:border-teal-400',
          badge: 'bg-teal-100/80 text-teal-800',
          btn: 'bg-teal-800 hover:bg-teal-900 text-white',
        };
      case 'amber':
        return {
          bg: 'bg-amber-500/10 text-amber-800',
          border: 'border-amber-200/80 hover:border-amber-400',
          badge: 'bg-amber-100/80 text-amber-800',
          btn: 'bg-amber-800 hover:bg-amber-900 text-white',
        };
      case 'indigo':
        return {
          bg: 'bg-indigo-500/10 text-indigo-800',
          border: 'border-indigo-200/80 hover:border-indigo-400',
          badge: 'bg-indigo-100/80 text-indigo-800',
          btn: 'bg-indigo-800 hover:bg-indigo-900 text-white',
        };
      case 'blue':
        return {
          bg: 'bg-blue-500/10 text-blue-800',
          border: 'border-blue-200/80 hover:border-blue-400',
          badge: 'bg-blue-100/80 text-blue-800',
          btn: 'bg-blue-800 hover:bg-blue-900 text-white',
        };
      case 'rose':
      default:
        return {
          bg: 'bg-rose-500/10 text-rose-800',
          border: 'border-rose-200/80 hover:border-rose-400',
          badge: 'bg-rose-100/80 text-rose-800',
          btn: 'bg-rose-800 hover:bg-rose-900 text-white',
        };
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-5 sm:p-7 text-white relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Florist Command Center</span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              {store?.name || 'My Bouquet Tegal'}
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl font-light">
              Kelola seluruh konten, foto buket, ulasan testimoni, dan konfigurasi toko langsung dari perangkat Anda.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-xs border border-white/20 transition active:scale-95"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Header Bagian Kartu Modul */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-bold text-lg sm:text-xl text-neutral-900">
            Menu &amp; Modul Pengelolaan
          </h2>
          <p className="text-xs text-neutral-500">
            Akses langsung ke semua fitur pengelolaan toko
          </p>
        </div>
      </div>

      {/* Grid 2 Kolom di Handphone (grid-cols-2) dan 3 Kolom di Layar Lebar */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
        {menuModules.map((m, idx) => {
          const Icon = m.icon;
          const styles = getColorClasses(m.colorTheme);

          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl sm:rounded-3xl border ${styles.border} p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group`}
            >
              <div>
                {/* Header Card: Icon & Badge */}
                <div className="flex items-center justify-between gap-1 mb-3">
                  <div className={`p-2 sm:p-2.5 rounded-xl ${styles.bg}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles.badge} truncate`}>
                    {m.badge}
                  </span>
                </div>

                {/* Counter / Value */}
                <div className="my-2 sm:my-3">
                  <div className="text-xl sm:text-3xl font-serif font-bold text-neutral-900 leading-none">
                    {loading ? '...' : m.count}
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 font-medium truncate">
                    {m.unit}
                  </p>
                </div>

                {/* Title & Desc */}
                <h3 className="font-semibold text-neutral-900 text-xs sm:text-base leading-snug truncate">
                  {m.title}
                </h3>
                <p className="hidden sm:block text-xs text-neutral-500 mt-1 font-light line-clamp-2">
                  {m.desc}
                </p>
              </div>

              {/* Action Button: Jelas & Langsung Buka Modul */}
              <div className="mt-4 pt-3 border-t border-neutral-100">
                <Link
                  href={m.href}
                  className={`w-full inline-flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-3 rounded-xl ${styles.btn} text-[11px] sm:text-xs font-semibold shadow-2xs active:scale-95 transition-all`}
                >
                  <span>{m.btnLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
