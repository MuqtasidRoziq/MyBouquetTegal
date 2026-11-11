import { Product, Category, StoreInfo, ContactInfo, ProductType } from '@/types';
import {
  getD1Products,
  insertD1Product,
  updateD1Product,
  deleteD1Product,
  getD1StoreInfo,
  updateD1StoreInfo,
  getD1ContactInfo,
  updateD1ContactInfo,
  getD1Categories,
  getD1User,
  StoredUser,
} from './d1';

// ---------------- PRODUCTS ----------------
export async function getProducts(productType?: ProductType): Promise<Product[]> {
  const d1Products = await getD1Products(productType);
  return d1Products || [];
}

export async function addSingleProduct(product: Product): Promise<boolean> {
  return insertD1Product(product);
}

export async function updateSingleProduct(product: Product): Promise<boolean> {
  return updateD1Product(product);
}

export async function deleteSingleProduct(id: string): Promise<boolean> {
  return deleteD1Product(id);
}

// ---------------- STORE ----------------
export async function getStoreInfo(): Promise<StoreInfo> {
  const d1Store = await getD1StoreInfo();
  if (d1Store) return d1Store;

  return {
    id: 'default',
    name: 'My Bouquet Tegal',
    tagline: 'Artisan Florist & Hampers Studio Tegal',
    logoUrl: '',
  };
}

export async function saveStoreInfo(store: StoreInfo): Promise<boolean> {
  return updateD1StoreInfo(store);
}

// ---------------- CONTACT ----------------
export async function getContactInfo(): Promise<ContactInfo> {
  const d1Contact = await getD1ContactInfo();
  if (d1Contact) return d1Contact;

  return {
    id: 'default',
    whatsappNumber: process.env.DEFAULT_WHATSAPP_NUMBER || '6285742880000',
    chatWhatsappTemplate: 'Halo Admin My Bouquet Tegal! Saya mau pesan buket/parcel...',
    instagramHandle: '@mybouquettegal',
    instagramUrl: 'https://instagram.com/mybouquettegal',
    address: 'Slawi, Kab. Tegal',
    googleMapsFrameUrl: '',
    operationalHours: '08.00 - 20.00 WIB',
  };
}

export async function saveContactInfo(contact: ContactInfo): Promise<boolean> {
  return updateD1ContactInfo(contact);
}

// ---------------- CATEGORIES ----------------
export async function getCategories(productType?: ProductType): Promise<Category[]> {
  const d1Categories = await getD1Categories();
  if (!d1Categories) return [];
  return productType ? d1Categories.filter((c) => c.productType === productType) : d1Categories;
}

export async function addCategory(category: Category): Promise<boolean> {
  const { insertD1Category } = await import('./d1');
  return insertD1Category(category);
}

// ---------------- TESTIMONIALS & FAQS ----------------
export async function getTestimonials(): Promise<import('@/types').Testimonial[]> {
  const { getD1Testimonials } = await import('./d1');
  return getD1Testimonials();
}

export async function addTestimonial(t: import('@/types').Testimonial): Promise<boolean> {
  const { insertD1Testimonial } = await import('./d1');
  return insertD1Testimonial(t);
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const { deleteD1Testimonial } = await import('./d1');
  return deleteD1Testimonial(id);
}

export async function getFAQs(): Promise<import('@/types').FAQ[]> {
  const { getD1FAQs } = await import('./d1');
  return getD1FAQs();
}

export async function addFAQ(f: import('@/types').FAQ): Promise<boolean> {
  const { insertD1FAQ } = await import('./d1');
  return insertD1FAQ(f);
}

export async function deleteFAQ(id: string): Promise<boolean> {
  const { deleteD1FAQ } = await import('./d1');
  return deleteD1FAQ(id);
}

// ---------------- USERS (ADMIN CREDENTIALS) ----------------
export async function getUserByUsername(username: string): Promise<StoredUser | null> {
  return getD1User(username);
}
