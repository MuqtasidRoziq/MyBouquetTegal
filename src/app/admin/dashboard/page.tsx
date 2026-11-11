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

  const stats = [
    {
      title: 'Total Produk',
      value: products.length,
      desc: 'Buket & Parcel terdaftar',
      icon: <Package className="w-5 h-5 text-emerald-700" />,
      href: '/admin/products',
      bg: 'bg-emerald-50 border-emerald-200/70',
    },
    {
      title: 'Kategori Produk',
      value: categories.length,
      desc: 'Kelompok buket & parcel',
      icon: <Layers className="w-5 h-5 text-teal-700" />,
      href: '/admin/categories',
      bg: 'bg-teal-50 border-teal-200/70',
    },
    {
      title: 'Testimoni Pembeli',
      value: testimonials.length,
      desc: 'Ulasan & rating bintang',
      icon: <MessageSquareQuote className="w-5 h-5 text-amber-700" />,
      href: '/admin/testimoni',
      bg: 'bg-amber-50 border-amber-200/70',
    },
    {
      title: 'Tanya Jawab FAQ',
      value: faqs.length,
      desc: 'Informasi aktif di website',
      icon: <HelpCircle className="w-5 h-5 text-indigo-700" />,
      href: '/admin/faq',
      bg: 'bg-indigo-50 border-indigo-200/70',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 rounded-l-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Selamat Datang di Studio Panel</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            Dashboard {store?.name || 'My Bouquet Tegal'}
          </h1>
          <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl font-light">
            Kelola katalog buket, foto produk, kategori, testimoni pembeli, serta informasi kontak toko Anda dari satu tempat.
          </p>
        </div>
      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, idx) => (
          <Link
            key={idx}
            href={s.href}
            className={`p-6 rounded-2xl border ${s.bg} hover:shadow-md transition-all group flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-neutral-600 tracking-wider">
                {s.title}
              </span>
              <div className="p-2 rounded-xl bg-white shadow-2xs group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-serif font-bold text-neutral-900">
                {loading ? '...' : s.value}
              </div>
              <p className="text-xs text-neutral-500 mt-1">{s.desc}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-200/50 flex items-center justify-between text-xs font-semibold text-neutral-700 group-hover:text-emerald-800">
              <span>Buka Modul</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-neutral-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-neutral-900">
                Profil & Logo Brand
              </h3>
              <p className="text-xs text-neutral-500">Ubah nama studio, logo header, dan slogan</p>
            </div>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed font-light">
            Pastikan logo toko Anda selalu tampil jernih di navbar pengunjung dan footer website.
          </p>
          <Link
            href="/admin/profile"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:underline"
          >
            <span>Pengaturan Profil Toko</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-neutral-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-800">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-neutral-900">
                Kontak, WhatsApp & Maps
              </h3>
              <p className="text-xs text-neutral-500">Nomor pemesanan dan titik jemput workshop</p>
            </div>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed font-light">
            Pengunjung langsung diarahkan ke nomor WhatsApp ini saat menekan tombol pesan pada buket pilihan.
          </p>
          <Link
            href="/admin/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:underline"
          >
            <span>Pengaturan Kontak & Peta</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
