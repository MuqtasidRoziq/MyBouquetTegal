import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hanya periksa rute yang diawali dengan /admin
  if (pathname.startsWith('/admin')) {
    // Kecualikan halaman login admin
    if (pathname === '/admin/login') {
      const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
      if (token) {
        const session = await verifySessionToken(token);
        if (session) {
          // Jika sudah login, redirect langsung ke dashboard admin
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      }
      return NextResponse.next();
    }

    // Untuk halaman dashboard admin, pastikan cookie valid
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const session = await verifySessionToken(token);
    if (!session) {
      // Token tidak valid atau expired
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete(AUTH_COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};