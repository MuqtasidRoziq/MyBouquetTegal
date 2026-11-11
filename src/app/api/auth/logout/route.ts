import { NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logout berhasil',
  });

  // Hapus cookie sesi admin
  response.cookies.delete(AUTH_COOKIE_NAME);

  return response;
}
