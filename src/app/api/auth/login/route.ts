import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, createSessionToken, verifyPassword } from '@/lib/auth';
import { getUserByUsername } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username dan password wajib diisi' },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim().toLowerCase();

    // 1. Ambil data user dari tabel Cloudflare D1
    const dbUser = await getUserByUsername(cleanUsername);

    if (!dbUser) {
      return NextResponse.json(
        { success: false, message: 'Username atau password salah' },
        { status: 401 }
      );
    }

    // 2. Verifikasi hash password bcrypt
    const isMatch = await verifyPassword(password, dbUser.passwordHash);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Username atau password salah' },
        { status: 401 }
      );
    }

    // 3. Buat JWT session token
    const token = await createSessionToken({
      id: dbUser.id,
      username: dbUser.username,
      name: dbUser.name,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login berhasil',
      user: {
        id: dbUser.id,
        username: dbUser.username,
        name: dbUser.name,
      },
    });

    // 4. Set ke HTTP-only cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    return response;
  } catch (error) {
    console.error('Error in login API:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
