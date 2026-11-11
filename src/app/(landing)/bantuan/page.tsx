import React from 'react';
import FAQ from '@/components/section/FAQ';
import Contact from '@/components/section/Contact';
import Cta from '@/components/section/Cta';
import { getStoreInfo, getContactInfo, getFAQs } from '@/lib/storage';
import { HelpCircle, MessageCircle, Clock } from 'lucide-react';

export default async function BantuanPage() {
  const [store, contact, faqs] = await Promise.all([
    getStoreInfo(),
    getContactInfo(),
    getFAQs(),
  ]);

  const waUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    `Halo Admin ${store.name}, saya butuh informasi / bantuan order buket... 🌿`
  )}`;

  return (
    <>
      {/* Header Banner Bantuan */}
      <section className="bg-gradient-to-b from-[#F4F8F6] to-[#FAF9F5] py-14 sm:py-20 border-b border-emerald-950/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 text-emerald-800 text-xs sm:text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>Pusat Bantuan & Layanan Konsumen</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 tracking-normal leading-tight">
            Ada yang Bisa Kami Bantu?
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto font-light leading-relaxed">
            Temukan jawaban pertanyaan seputar pemesanan buket & parcel, atau langsung hubungi admin WhatsApp kami untuk konsultasi custom.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp Admin</span>
            </a>
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-neutral-200 text-xs sm:text-sm text-neutral-700 shadow-2xs">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Jam Buka: {contact.operationalHours}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ */}
      <FAQ faqs={faqs} />

      {/* Kontak & Lokasi Maps */}
      <Contact store={store} contact={contact} />

      {/* Penutup */}
      <Cta store={store} contact={contact} />
    </>
  );
}
