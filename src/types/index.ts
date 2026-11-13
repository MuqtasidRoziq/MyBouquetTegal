export type ProductType = 'bucket' | 'parcel';

export interface Category {
  id: string;
  name: string;
  slug: string;
  productType: ProductType;
  description?: string;
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

export interface Product {
  id: string;
  categoryId: string;
  productType: ProductType;
  name: string;
  description: string;
  slug: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

export interface StoreInfo {
  id: string;
  name: string;
  tagline: string;
  logoUrl: string;
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

export interface ContactInfo {
  id: string;
  whatsappNumber: string;
  chatWhatsappTemplate: string;
  instagramHandle: string;
  instagramUrl: string;
  address: string;
  googleMapsFrameUrl: string;
  operationalHours: string;
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

export interface Testimonial {
  id: string;
  customerName: string;
  eventType: string;
  rating: number;
  comment: string;
  dateText?: string;
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

export interface UserSession {
  id: string;
  username: string;
  name: string;
}
