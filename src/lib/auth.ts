import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { UserSession } from '@/types';

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'mybouquettegal-super-secret-jwt-key-2026'
);

export const AUTH_COOKIE_NAME = 'mbt_admin_session';

/**
 * Hash password menggunakan bcrypt
 */
export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

/**
 * Verifikasi password
 */
export async function verifyPassword(plainText: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plainText, hashed);
}

/**
 * Buat JWT token untuk session admin
 */
export async function createSessionToken(user: UserSession): Promise<string> {
  return new SignJWT({
    id: user.id,
    username: user.username,
    name: user.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Sesi berlaku 7 hari
    .sign(JWT_SECRET);
}

/**
 * Verifikasi dan decode token JWT
 */
export async function verifySessionToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: payload.id as string,
      username: payload.username as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}
