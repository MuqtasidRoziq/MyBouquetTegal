'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, Category, ProductType, StoreInfo, ContactInfo } from '@/types';
import ProductCard from '@/components/ui/ProductCard';
import CategoryFilter from '@/components/ui/CategoryFilter';
import OrderModal from '@/components/ui/OrderModal';
import ProductDetailModal from '@/components/ui/ProductDetailModal';
import { Search, Sparkles, Filter, Layers, Flower2, Gift } from 'lucide-react';

export default function AllProducts() {
  const searchParams = useSearchParams();
  const initialType = searchParams ? (searchParams.get('type') as ProductType | null) : null;

  const [store, setStore] = useState<StoreInfo>({
    id: 'default',
    name: 'My Bouquet Tegal',
    tagline: 'Artisan Florist & Gift Studio Tegal',
    logoUrl: '/logo_bucket.webp',
  });
  const [contact, setContact] = useState<ContactInfo>({
    id: 'default',
    whatsappNumber: '6285742880000',
    chatWhatsappTemplate: '',
    instagramHandle: '@mybouquettegal',
    instagramUrl: 'https://instagram.com/mybouquettegal',
    address: 'Slawi, Kabupaten Tegal, Jawa Tengah',
    googleMapsFrameUrl: '',
    operationalHours: '08.00 - 20.00 WIB',
  });

  const [selectedType, setSelectedType] = useState<'all' | ProductType>(
    initialType === 'bucket' || initialType === 'parcel' ? initialType : 'all'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductForOrder, setSelectedProductForOrder] = useState<Product | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes, storeRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/store'),
        ]);

        if (prodRes.ok) {
          const p = await prodRes.json();
          if (p.data) setProducts(p.data);
        }
        if (catRes.ok) {
          const c = await catRes.json();
          if (c.data) setCategories(c.data);
        }
        if (storeRes.ok) {
          const s = await storeRes.json();
          if (s.data?.store) setStore(s.data.store);
          if (s.data?.contact) setContact(s.data.contact);
        }
      } catch (err) {
        console.error('Gagal mengambil data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleOpenOrder = (product: Product) => {
    setSelectedProductForOrder(product);
    setIsOrderModalOpen(true);
  };

  const handleOpenDetail = (product: Product) => {
    setSelectedProductForDetail(product);
    setIsDetailModalOpen(true);
  };

  const relatedProducts = selectedProductForDetail
    ? products.filter((p) => p.id !== selectedProductForDetail.id)
    : [];

  // Filter logika
  const filteredProducts = products.filter((item) => {
    if (selectedType !== 'all' && item.productType !== selectedType) {
      return false;
    }
    if (selectedCategory !== 'all' && item.categoryId !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q) ?? false;
      return matchName || matchDesc;
    }
    return true;
  });

  const availableCategories =
    selectedType === 'all'
      ? categories
      : categories.filter((c) => c.productType === selectedType);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-emerald-800">
            <span className="w-5 h-px bg-emerald-600/60" />
            <span>Koleksi Terlengkap</span>
            <span className="w-5 h-px bg-emerald-600/60" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-normal text-neutral-900 leading-tight">
            Temukan Kado Buket & Parcel Sempurna
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 font-light">
            Jelajahi berbagai kreasi buket wisuda, tunangan, snack, uang, serta parcel hampers untuk segala momen spesial Anda.
          </p>
        </div>

        {/* E-Commerce Filter Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-neutral-200/80 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Tipe Selector: Buket vs Parcel */}
            <div className="flex items-center bg-neutral-100/90 p-1 rounded-2xl w-full md:w-auto">
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedCategory('all');
                }}
                className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedType === 'all'
                    ? 'bg-white text-emerald-900 shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Semua Produk
              </button>

              <button
                onClick={() => {
                  setSelectedType('bucket');
                  setSelectedCategory('all');
                }}
                className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedType === 'bucket'
                    ? 'bg-white text-emerald-900 shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Flower2 className="w-3.5 h-3.5" />
                <span>Buket</span>
              </button>

              <button
                onClick={() => {
                  setSelectedType('parcel');
                  setSelectedCategory('all');
                }}
                className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedType === 'parcel'
                    ? 'bg-white text-emerald-900 shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Gift className="w-3.5 h-3.5" />
                <span>Parcel & Hampers</span>
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative flex-1 md:max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari buket wisuda, snack, mawar, dll..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Sub-kategori Chips */}
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <CategoryFilter
              categories={availableCategories}
              activeCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs sm:text-sm text-neutral-500">
            Menampilkan <strong className="text-neutral-800 font-semibold">{filteredProducts.length}</strong> produk
            {selectedType !== 'all' && (
              <span> kategori <strong className="text-emerald-800 capitalize">{selectedType}</strong></span>
            )}
          </p>
        </div>

        {/* Grid List Products */}
        {loading ? (
          <div className="text-center py-20 bg-white/60 rounded-3xl border border-neutral-200/60 p-8">
            <div className="animate-spin w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full mx-auto mb-3" />
            <p className="text-neutral-500 text-sm">Menyiapkan katalog pilihan...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200/80 p-8">
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-neutral-800 mb-1">
              Produk Tidak Ditemukan
            </h3>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto mb-6">
              Tidak ada buket yang sesuai dengan kata kunci atau filter yang Anda pilih.
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrderClick={handleOpenOrder}
                onDetailClick={handleOpenDetail}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Detail Produk */}
      <ProductDetailModal
        product={selectedProductForDetail}
        store={store}
        contact={contact}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onOrderClick={handleOpenOrder}
        relatedProducts={relatedProducts}
        onSelectRelated={(prod) => setSelectedProductForDetail(prod)}
      />

      {/* Modal Pemesanan WA Cepat */}
      <OrderModal
        product={selectedProductForOrder}
        store={store}
        contact={contact}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
}
