export type ProductType = 'bucket' | 'parcel';

export interface Category {
  id: string;
  name: string;
  slug: string;
  productType: ProductType;
  description?: string;
}

export type ProductStatus = 'ready' | 'preorder' | 'soldout';

export interface Product {
  id: string;
  categoryId: string;
  productType: ProductType;
  name: string;
  slug: string;
  price: number;
  description: string;
  imageUrl: string;
  badge?: string;
  status: ProductStatus;
  isFeatured?: boolean;
  createdAt: string;
}

export interface StoreInfo {
  id: string;
  name: string;
  tagline: string;
  logoUrl: string;
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
}

export interface Testimonial {
  id: string;
  customerName: string;
  eventType: string;
  rating: number;
  comment: string;
  dateText?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  sortOrder?: number;
}

export interface UserSession {
  id: string;
  username: string;
  name: string;
}
