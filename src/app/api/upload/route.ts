import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';
import { isD1Configured, saveD1Image } from '@/lib/d1';

export async function POST(request: NextRequest) {
  try {
    // 1. Verifikasi Session Admin
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { imageBase64, filename, folder = 'products' } = body;

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, message: 'Data gambar wajib dikirimkan' },
        { status: 400 }
      );
    }

    // Tentukan subfolder target (contoh: 'products' atau 'store')
    const sanitizedFolder = folder === 'store' ? 'store' : 'products';

    // 2. Ekstrak data binary dari Base64 Data URL
    // Format: "data:image/webp;base64,AAAA..." atau "data:image/jpeg;base64,..."
    const matches = imageBase64.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json(
        { success: false, message: 'Format Base64 gambar tidak valid' },
        { status: 400 }
      );
    }

    const rawExt = matches[1].toLowerCase();
    const extension = rawExt === 'jpeg' ? 'jpg' : rawExt; // misal webp
    const mimeType = `image/${rawExt}`;
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // 3. Buat identifier dan nama file unik
    const safeBaseName = (filename || 'produk')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const uniqueFilename = `${safeBaseName}-${Date.now()}.${extension}`;
    const imageId = `${sanitizedFolder}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    // 4. Jika terhubung ke D1 (Production Cloudflare), simpan ke database D1
    if (isD1Configured) {
      const savedToD1 = await saveD1Image({
        id: imageId,
        filename: uniqueFilename,
        folder: sanitizedFolder,
        mimeType,
        dataBase64: base64Data,
        sizeBytes: buffer.length,
      });

      if (!savedToD1) {
        throw new Error('Gagal menyimpan gambar ke database D1');
      }

      // Berikan URL publik yang dilayani oleh rute /api/images/[id]
      const publicUrl = `/api/images/${imageId}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: uniqueFilename,
        sizeBytes: buffer.length,
      });
    }

    // 5. Fallback Local Development (tulis file fisik ke disk jika D1 tidak diset)
    try {
      const targetDir = path.join(process.cwd(), 'public', 'uploads', sanitizedFolder);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const filePath = path.join(targetDir, uniqueFilename);
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${sanitizedFolder}/${uniqueFilename}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: uniqueFilename,
        sizeBytes: buffer.length,
      });
    } catch (diskErr) {
      console.warn('Local disk write failed, fallback to data URI:', diskErr);
      return NextResponse.json({
        success: true,
        url: imageBase64,
        filename: uniqueFilename,
        sizeBytes: buffer.length,
      });
    }
  } catch (error) {
    console.error('Error saving uploaded file:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menyimpan file gambar' },
      { status: 500 }
    );
  }
}
