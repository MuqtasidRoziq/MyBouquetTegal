import { NextRequest, NextResponse } from 'next/server';
import { getCategories, addCategory } from '@/lib/storage';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';
import { Category } from '@/types';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil kategori' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { name, productType, description } = await request.json();
    if (!name) {
      return NextResponse.json({ success: false, message: 'Nama kategori wajib diisi' }, { status: 400 });
    }

    const categories = await getCategories();
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      productType: productType === 'parcel' ? 'parcel' : 'bucket',
      description,
    };

    await addCategory(newCategory);

    return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat kategori' },
      { status: 500 }
    );
  }
}
