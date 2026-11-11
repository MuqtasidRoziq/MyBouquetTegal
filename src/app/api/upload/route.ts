import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

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
    const targetDir = path.join(process.cwd(), 'public', 'uploads', sanitizedFolder);

    // Pastikan direktori tujuan ada
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // 2. Ekstrak data binary dari Base64 Data URL
    // Format: "data:image/webp;base64,AAAA..." atau "data:image/jpeg;base64,..."
    const matches = imageBase64.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json(
        { success: false, message: 'Format Base64 gambar tidak valid' },
        { status: 400 }
      );
    }

    const extension = matches[1] === 'jpeg' ? 'jpg' : matches[1]; // misal webp
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // 3. Buat nama file unik fisik (.webp)
    const safeBaseName = (filename || 'produk')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const uniqueFilename = `${safeBaseName}-${Date.now()}.${extension}`;
    const filePath = path.join(targetDir, uniqueFilename);

    // 4. Tulis file fisik ke folder public/uploads/{folder}
    fs.writeFileSync(filePath, buffer);

    // 5. Kembalikan URL publik file fisik
    const publicUrl = `/uploads/${sanitizedFolder}/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      sizeBytes: buffer.length,
    });
  } catch (error) {
    console.error('Error saving uploaded file:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menyimpan file gambar' },
      { status: 500 }
    );
  }
}
