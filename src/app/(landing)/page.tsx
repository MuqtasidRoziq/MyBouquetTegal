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

  return (
    <>
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
