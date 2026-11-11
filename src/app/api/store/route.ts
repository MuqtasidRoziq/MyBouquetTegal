import { NextRequest, NextResponse } from 'next/server';
import { getStoreInfo, saveStoreInfo, getContactInfo, saveContactInfo } from '@/lib/storage';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

// GET /api/store -> Mengambil info toko dan kontak
export async function GET() {
  try {
    const [store, contact] = await Promise.all([getStoreInfo(), getContactInfo()]);
    return NextResponse.json({
      success: true,
      data: { store, contact },
    });
  } catch (error) {
    console.error('Error fetching store info:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil informasi toko' },
      { status: 500 }
    );
  }
}

// PUT /api/store -> Memperbarui info toko dan kontak (Admin Only)
export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { store, contact } = body;

    if (store) {
      await saveStoreInfo(store);
    }
    if (contact) {
      const cleanContact = {
        ...contact,
        whatsappNumber: contact.whatsappNumber ? contact.whatsappNumber.replace(/\D/g, '') : '',
      };
      await saveContactInfo(cleanContact);
    }

    const [updatedStore, updatedContact] = await Promise.all([getStoreInfo(), getContactInfo()]);

    return NextResponse.json({
      success: true,
      data: { store: updatedStore, contact: updatedContact },
    });
  } catch (error) {
    console.error('Error updating store info:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui pengaturan toko' },
      { status: 500 }
    );
  }
}
