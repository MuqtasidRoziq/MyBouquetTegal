import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStoreInfo, getContactInfo } from '@/lib/storage';

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store, contact] = await Promise.all([getStoreInfo(), getContactInfo()]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar store={store} contact={contact} />
      <main className="flex-1">{children}</main>
      <Footer store={store} contact={contact} />
    </div>
  );
}
