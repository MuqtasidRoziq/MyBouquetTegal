import { NextRequest, NextResponse } from 'next/server';
import { getD1Image } from '@/lib/d1';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return new NextResponse('Image ID missing', { status: 400 });
    }

    const image = await getD1Image(id);
    if (!image || !image.dataBase64) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const buffer = Buffer.from(image.dataBase64, 'base64');

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': image.mimeType || 'image/webp',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving dynamic image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
