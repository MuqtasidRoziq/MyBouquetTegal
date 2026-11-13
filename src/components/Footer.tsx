import React from 'react';
import Link from 'next/link';
import { StoreInfo, ContactInfo } from '@/types';
import { MapPin, Phone, Clock, Flower2, Heart, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  store: StoreInfo;
  contact: ContactInfo;
}

export default function Footer({ store, contact }: FooterProps) {
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              {store.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={store.logoUrl}
                  alt={store.name}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-200">
                  <Flower2 className="w-5 h-5" />
                </div>
              )}
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {store.name}
              </span>
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed">
              Studio buket &amp; hampers artisan di Tegal &amp; Slawi. Melayani pesanan buket wisuda, tunangan/lamaran, buket uang, boneka, snack, serta hampers parcel lebaran &amp; hari raya dengan hasil rapi dan estetik.
            </p>

            <div className="pt-2 text-xs text-neutral-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Buka Setiap Hari ({contact.operationalHours || '08.00 - 20.00 WIB'})</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase font-sans">
              Navigasi
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/product" className="hover:text-emerald-400 transition-colors">
                  Katalog Semua Produk
                </Link>
              </li>
              <li>
                <Link href="/product?type=bucket" className="hover:text-emerald-400 transition-colors">
                  Buket Bunga & Hadiah
                </Link>
              </li>
              <li>
                <Link href="/product?type=parcel" className="hover:text-emerald-400 transition-colors">
                  Parcel & Hampers
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-emerald-400 transition-colors">
                  Tanya Jawab (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak & Social Media */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase font-sans">
              Kontak Kami
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>{contact.address || 'Slawi, Kabupaten Tegal, Jawa Tengah'}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  +{contact.whatsappNumber}
                </a>
              </li>
              {contact.instagramHandle && (
                <li className="flex items-center gap-2.5">
                  <svg
                    className="w-4 h-4 text-emerald-400 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <a
                    href={contact.instagramUrl || `https://instagram.com/${contact.instagramHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    {contact.instagramHandle}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Pengiriman & Layanan */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase font-sans">
              Layanan Pengiriman
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Melayani pengiriman kurir lokal khusus area Kota Tegal, Slawi, Adiwerna, Dukuhturi, Lebaksiu, Pangkah, Brebes, dan Pemalang.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                Self Pick-up
              </span>
              <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                Gosend / GrabExpress
              </span>
              <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                Kurir Toko
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 {store.name}. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="hover:text-neutral-400 transition">
              Portal Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

