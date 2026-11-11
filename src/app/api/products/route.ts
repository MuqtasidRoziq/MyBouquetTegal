import { NextRequest, NextResponse } from 'next/server';
import { getProducts, addSingleProduct } from '@/lib/storage';
import { Product } from '@/types';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

// GET /api/products -> Mengambil semua produk (Public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const productType = searchParams.get('type') as 'bucket' | 'parcel' | null;
    const search = searchParams.get('search');

    let products = await getProducts(productType || undefined);

    if (categoryId && categoryId !== 'all') {
      products = products.filter((p) => p.categoryId === categoryId);
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data produk' },
      { status: 500 }
    );
  }
}

// POST /api/products -> Menambah produk baru (Admin Only)
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, categoryId, productType, price, description, imageUrl, badge, status, isFeatured } = body;

    if (!name || !categoryId || !price) {
      return NextResponse.json(
        { success: false, message: 'Nama, kategori, dan harga wajib diisi' },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      categoryId,
      productType: productType === 'parcel' ? 'parcel' : 'bucket',
      price: Number(price),
      description: description || '',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
      badge: badge || undefined,
      status: status || 'ready',
      isFeatured: Boolean(isFeatured),
      createdAt: new Date().toISOString(),
    };

    const { addSingleProduct } = await import('@/lib/storage');
    await addSingleProduct(newProduct);

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menambahkan produk' },
      { status: 500 }
    );
  }
}
