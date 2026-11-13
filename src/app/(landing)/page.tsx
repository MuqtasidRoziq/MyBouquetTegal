import React from 'react';
import Hero from '@/components/section/Hero';
import Problem from '@/components/section/Problem';
import Solution from '@/components/section/Solution';
import Products from '@/components/section/Products';
import About from '@/components/section/About';
import Testimoni from '@/components/section/Testimoni';
import FAQ from '@/components/section/FAQ';
import Contact from '@/components/section/Contact';
import Cta from '@/components/section/Cta';
import { getProducts, getStoreInfo, getContactInfo, getTestimonials, getFAQs } from '@/lib/storage';

export default async function HomePage() {
  const [products, store, contact, testimonials, faqs] = await Promise.all([
    getProducts(),
    getStoreInfo(),
    getContactInfo(),
    getTestimonials(),
    getFAQs(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Florist',
    name: store.name || 'My Bouquet Tegal',
    image: 'https://mybouquettegal.com/logo_bucket.webp',
    telephone: contact.whatsappNumber ? `+${contact.whatsappNumber}` : '+6285742880000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tegal',
      addressRegion: 'Jawa Tengah',
      addressCountry: 'ID',
      streetAddress: contact.address || 'Slawi, Kab. Tegal',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.9839,
      longitude: 109.1396,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    priceRange: 'Rp 25.000 - Rp 500.000+',
    url: 'https://mybouquettegal.com',
  };

  return (
    <>
      {/* Schema.org Structured Data for Local Business SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Banner */}
      <Hero store={store} contact={contact} />

      {/* 2. Problem Section */}
      <Problem />

      {/* 3. Solution Section */}
      <Solution />

      {/* 4. Products Unggulan */}
      <Products products={products} store={store} contact={contact} />

      {/* 5. Tentang Florist */}
      <About store={store} />

      {/* 6. Testimoni Pembeli */}
      <Testimoni testimonials={testimonials} />

      {/* 7. FAQ Tanya Jawab */}
      <FAQ faqs={faqs} />

      {/* 8. Lokasi Workshop & Peta */}
      <Contact store={store} contact={contact} />

      {/* 9. Penutup Call to Action */}
      <Cta store={store} contact={contact} />
    </>
  );
}
