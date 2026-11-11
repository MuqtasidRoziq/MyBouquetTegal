import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// Parse .env manual tanpa dependency luar
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        let val = trimmed.substring(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  });
}

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!ACCOUNT_ID || !DATABASE_ID || !API_TOKEN) {
  console.error('❌ Error: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, atau CLOUDFLARE_API_TOKEN belum diatur di .env');
  process.exit(1);
}

// Data input seeder mentah (Plain Text)
const ADMIN_USER = {
  id: 'user-admbouquet',
  username: 'admbouquet',
  plainPassword: 'AdmBouquet123#',
  name: 'Admin MyBouquetTegal',
};

async function seedAdmin() {
  console.log('🌱 Menjalankan Seeder Akun Admin ke Cloudflare D1...');

  // 1. Hash password menggunakan bcrypt
  console.log(`🔒 Melakukan hashing password mentah "${ADMIN_USER.plainPassword}" untuk user "${ADMIN_USER.username}"...`);
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(ADMIN_USER.plainPassword, salt);
  console.log('✅ Password berhasil di-hash menjadi:', passwordHash);

  const createdAt = new Date().toISOString();

  // 2. Kirim query INSERT / UPDATE ke Cloudflare D1
  const sql = `
    INSERT INTO users (id, username, password_hash, name, created_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(username) DO UPDATE SET 
      password_hash = excluded.password_hash,
      name = excluded.name;
  `;

  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql,
        params: [
          ADMIN_USER.id,
          ADMIN_USER.username.toLowerCase(),
          passwordHash,
          ADMIN_USER.name,
          createdAt,
        ],
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('\n🎉 SEEDER BERHASIL DIEKSEKUSI KE DATABASE CLOUDFLARE D1!');
      console.log('--------------------------------------------------');
      console.log(`👤 Username : ${ADMIN_USER.username}`);
      console.log(`🔑 Password Input (Plain)  : ${ADMIN_USER.plainPassword}`);
      console.log(`🛡️  Password di Database   : ${passwordHash} (Tersimpan dalam bentuk Hash Bcrypt)`);
      console.log(`🏷️  Nama Lengkap           : ${ADMIN_USER.name}`);
      console.log('--------------------------------------------------');
    } else {
      console.error('❌ Gagal menjalankan seeder di D1:', data.errors);
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ Gagal menghubungi API Cloudflare:', err);
    process.exit(1);
  }
}

seedAdmin();
