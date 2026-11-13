import { NextRequest, NextResponse } from 'next/server';
import { getProducts, updateSingleProduct, deleteSingleProduct } from '@/lib/storage';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

// PUT /api/products/[id] -> Update produk (Admin Only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const products = await getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Produk tidak ditemukan' }, { status: 404 });
    }

    const current = products[index];
    const updatedProduct = {
      ...current,
      name: body.name ?? current.name,
      categoryId: body.categoryId ?? current.categoryId,
      productType: body.productType ?? current.productType,
      description: body.description !== undefined ? body.description : current.description,
      imageUrl: body.imageUrl ?? current.imageUrl,
      price: body.price !== undefined ? Number(body.price) : current.price,
      slug: body.name
        ? body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : current.slug,
      id: current.id,
      updatedAt: new Date().toISOString(),
    };

    await updateSingleProduct(updatedProduct);

    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui produk' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] -> Hapus produk (Admin Only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const products = await getProducts();
    const filtered = products.filter((p) => p.id !== id);

    if (filtered.length === products.length) {
      return NextResponse.json({ success: false, message: 'Produk tidak ditemukan' }, { status: 404 });
    }

    await deleteSingleProduct(id);

    return NextResponse.json({ success: true, message: 'Produk berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus produk' },
      { status: 500 }
    );
  }
}
