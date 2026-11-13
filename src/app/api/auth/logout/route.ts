import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: 'Logout berhasil',
  });

  const host = request.headers.get('host') || '';
  const isProduction = process.env.NODE_ENV === 'production' && !host.includes('localhost');
  const cookieDomain = isProduction && host.endsWith('mybouquettegal.biz.id')
    ? '.mybouquettegal.biz.id'
    : undefined;

  // Hapus cookie sesi admin
  response.cookies.delete({
    name: AUTH_COOKIE_NAME,
    path: '/',
    domain: cookieDomain,
  });

  return response;
}
