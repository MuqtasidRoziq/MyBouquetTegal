import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0]; // buang port jika ada (misal: admin.localhost:3000 -> admin.localhost)
  const { pathname } = request.nextUrl;

  // Lewatkan file static Next.js, images, dan favicon
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Cek apakah diakses dari subdomain admin (baik di local admin.localhost maupun production admin.mybouquettegal.biz.id)
  const isAdminSubdomain = hostname.startsWith('admin.');

  // =========================================================================
  // 1. JIKA DIAKSES DARI SUBDOMAIN ADMIN (admin.mybouquettegal.biz.id / admin.localhost)
  // =========================================================================
  if (isAdminSubdomain) {
    // Tentukan path internal yang sebenarnya ada di app router (/app/admin/...)
    // Jika user mengakses / -> /admin, /login -> /admin/login, /products -> /admin/products
    // Jika URL sudah ketik /admin/..., normalisasi
    const normalizedPath = pathname.startsWith('/admin')
      ? pathname
      : pathname === '/'
      ? '/admin'
      : `/admin${pathname}`;

    const isLoginPage = normalizedPath === '/admin/login';
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const session = token ? await verifySessionToken(token) : null;

    // Jika sudah login dan mencoba buka /login, redirect ke root subdomain admin (/)
    if (isLoginPage && session) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Jika belum login dan mengakses halaman selain /login, redirect ke /login
    if (!isLoginPage && !session) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      if (token) {
        response.cookies.delete(AUTH_COOKIE_NAME);
      }
      return response;
    }

    // Rewrite internal ke /admin folder sehingga di browser URL tetap bersih tanpa "/admin"
    // Contoh: URL browser tetap "https://admin.mybouquettegal.biz.id/dashboard", Next melayani "/admin/dashboard"
    return NextResponse.rewrite(new URL(normalizedPath, request.url));
  }

  // =========================================================================
  // 2. JIKA DIAKSES DARI DOMAIN UTAMA (mybouquettegal.biz.id / localhost)
  // =========================================================================
  // Jika ada request yang membuka /admin di domain utama, alihkan ke subdomain admin
  if (pathname.startsWith('/admin')) {
    // Ambil path setelah /admin (misal /admin/products -> /products, /admin/login -> /login, /admin -> /)
    const subPath = pathname.replace(/^\/admin/, '') || '/';

    // Jika di lokal (localhost), redirect ke admin.localhost
    const port = host.split(':')[1] ? `:${host.split(':')[1]}` : '';
    const adminHost = hostname === 'localhost' || hostname.endsWith('.localhost')
      ? `admin.localhost${port}`
      : `admin.${hostname}${port}`;

    const protocol = request.nextUrl.protocol || 'http:';
    return NextResponse.redirect(new URL(`${protocol}//${adminHost}${subPath}`));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
