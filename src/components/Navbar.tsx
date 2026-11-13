'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flower2, Menu, X } from 'lucide-react';
import { StoreInfo, ContactInfo } from '@/types';
import { WhatsAppIcon } from '@/components/icons';

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

  const waUrl = `https://api.whatsapp.com/send?phone=${contact.whatsappNumber}&text=${encodeURIComponent(
    `Halo Admin ${store.name}, saya ingin pesan buket / konsultasi kado spesial... 🌿`
  )}`;

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'py-2 sm:py-2.5 px-3 sm:px-6'
          : 'py-0 px-0'
      }`}
    >
      <header
        className={`mx-auto transition-all duration-300 ${
          scrolled
            ? 'max-w-6xl bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-full border border-neutral-200/80 shadow-md shadow-emerald-950/5 px-4 sm:px-5'
            : 'max-w-7xl bg-transparent border-b border-emerald-950/5 px-4 sm:px-6 lg:px-8'
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-14 sm:h-15' : 'h-16 sm:h-18'
          }`}
        >
          {/* KIRI: Logo Brand & Nama Toko (Tanpa Tagline) */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            {store.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={store.logoUrl}
                alt={store.name}
                className={`rounded-full object-cover border border-emerald-600/30 shadow-xs group-hover:scale-105 transition-all duration-300 ${
                  scrolled ? 'w-8.5 h-8.5 sm:w-8.5 sm:h-8.5' : 'w-9 h-9 sm:w-9.5 sm:h-9.5'
                }`}
              />
            ) : (
              <div
                className={`rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-all duration-300 ${
                  scrolled ? 'w-8.5 h-8.5 sm:w-8.5 sm:h-8.5' : 'w-9 h-9 sm:w-9.5 sm:h-9.5'
                }`}
              >
                <Flower2 className="w-4.5 h-4.5 text-emerald-100" />
              </div>
            )}
            <span
              className={`font-serif font-bold tracking-tight text-neutral-900 group-hover:text-emerald-800 transition-colors ${
                scrolled ? 'text-lg sm:text-lg' : 'text-xl sm:text-xl'
              }`}
            >
              {store.name}
            </span>
          </Link>

          {/* TENGAH: Menu Navigasi (Hanya Beranda, Produk, Bantuan) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
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
              className="inline-flex items-center gap-2 px-4 sm:px-4.5 py-2 sm:py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md active:scale-95 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Pesan Sekarang</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-neutral-800 hover:bg-emerald-50 focus:outline-hidden transition active:scale-95"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Pesan Sekarang via WA</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
