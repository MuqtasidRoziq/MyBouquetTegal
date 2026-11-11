'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { StoreInfo } from '@/types';
import { Menu } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store, setStore] = useState<StoreInfo | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch('/api/store')
      .then((res) => res.json())
      .then((d) => {
        if (d?.data?.store) setStore(d.data.store);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50/70 text-neutral-800 flex font-sans">
      {/* Sidebar Navigasi Admin */}
      <Sidebar
        store={store}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden bg-white border-b border-neutral-200/80 px-4 h-14 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl text-neutral-600 hover:bg-neutral-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-serif font-bold text-neutral-900 text-sm">
            {store?.name || 'My Bouquet Tegal'}
          </span>
          <div className="w-8" />
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
