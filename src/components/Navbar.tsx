'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flower2, Menu, X } from 'lucide-react';
import { StoreInfo, ContactInfo } from '@/types';

// SVG Icon WhatsApp Asli Resmi
function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

// Alternatif Full WhatsApp Path SVG (Lebih akurat icon WhatsApp)
function OfficialWhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.472-8.413z" />
    </svg>
  );
}

interface NavbarProps {
  store: StoreInfo;
  contact: ContactInfo;
}

export default function Navbar({ store, contact }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/product', label: 'Produk' },
    { href: '/bantuan', label: 'Bantuan' },
  ];

  const waUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    `Halo Admin ${store.name}, saya ingin pesan buket / konsultasi kado spesial... 🌿`
  )}`;

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'py-2.5 sm:py-3.5 px-3 sm:px-6'
          : 'py-0 px-0'
      }`}
    >
      <header
        className={`mx-auto transition-all duration-300 ${
          scrolled
            ? 'max-w-6xl bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-full border border-neutral-200/80 shadow-lg shadow-emerald-950/5 px-4 sm:px-6'
            : 'max-w-7xl bg-transparent border-b border-emerald-950/5 px-4 sm:px-6 lg:px-8'
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-14 sm:h-16' : 'h-18 sm:h-20'
          }`}
        >
          {/* KIRI: Logo Brand & Nama Toko (Tanpa Tagline) */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            {store.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={store.logoUrl}
                alt={store.name}
                className={`rounded-full object-cover border border-emerald-600/30 shadow-xs group-hover:scale-105 transition-all duration-300 ${
                  scrolled ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-9 h-9 sm:w-10 sm:h-10'
                }`}
              />
            ) : (
              <div
                className={`rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-all duration-300 ${
                  scrolled ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-9 h-9 sm:w-10 sm:h-10'
                }`}
              >
                <Flower2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-100" />
              </div>
            )}
            <span
              className={`font-serif font-bold tracking-tight text-neutral-900 group-hover:text-emerald-800 transition-colors ${
                scrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
              }`}
            >
              {store.name}
            </span>
          </Link>

          {/* TENGAH: Menu Navigasi (Hanya Beranda, Produk, Bantuan) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors relative py-1 ${
                    isActive
                      ? 'text-emerald-800 font-semibold'
                      : 'text-neutral-700 hover:text-emerald-800 font-normal'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* KANAN: Button Pesan Sekarang dengan Icon WhatsApp */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md active:scale-95 transition-all"
            >
              <OfficialWhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Pesan Sekarang</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-700 hover:bg-emerald-50 focus:outline-hidden transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-100 py-3 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm rounded-xl transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-emerald-700 text-white font-medium text-xs shadow-xs active:scale-95 transition"
              >
                <OfficialWhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Pesan Sekarang via WA</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
