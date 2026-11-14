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

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_D1_DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const D1_QUERY_URL = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${CLOUDFLARE_D1_DATABASE_ID}/query`;

async function executeD1(sql, params = []) {
  const res = await fetch(D1_QUERY_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql, params }),
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(`D1 Error: ${JSON.stringify(data.errors)}`);
  }
  return data.result?.[0]?.results || [];
}

const CAT_BUNGA = 'cat-1794667884892';
const CAT_SNACK = 'cat-1794667910096';
const CAT_UANG = 'cat-1794667811216';
const CAT_CUSTOM = 'cat-1794667870497';

const products = [
  {
    num: '01',
    name: 'Buket Mawar Pastel',
    category_id: CAT_BUNGA,
    price: 75000,
    desc: 'Buket bunga mawar bernuansa pastel lembut dengan wrap rapi, cocok untuk kado sidang atau ulang tahun.',
  },
  {
    num: '02',
    name: 'Buket Bunga Gradasi Lilac',
    category_id: CAT_BUNGA,
    price: 85000,
    desc: 'Perpaduan mawar ungu lilac segar dengan pita satin senada. Pilihan favorit untuk momen wisuda.',
  },
  {
    num: '03',
    name: 'Buket Mawar Soft Pink',
    category_id: CAT_BUNGA,
    price: 65000,
    desc: 'Bunga mawar pink manis bernuansa ceria, pas untuk hadiah wisuda teman atau sahabat.',
  },
  {
    num: '04',
    name: 'Buket Bunga Rustic Cream',
    category_id: CAT_BUNGA,
    price: 90000,
    desc: 'Buket bunga konsep rustic dengan wrapping warna cream elegan, cocok untuk hadiah tunangan.',
  },
  {
    num: '05',
    name: 'Buket Mawar Maroon Klasik',
    category_id: CAT_BUNGA,
    price: 95000,
    desc: 'Buket bunga mawar merah maroon elegan dengan wrapping mewah dan pita premium.',
  },
  {
    num: '06',
    name: 'Buket Mini Mawar',
    category_id: CAT_BUNGA,
    price: 45000,
    desc: 'Buket bunga simpel dan praktis dengan ukuran compact, tetap manis dan berkesan.',
  },
  {
    num: '07',
    name: 'Buket Cokelat & Snack Wisuda',
    category_id: CAT_SNACK,
    price: 70000,
    desc: 'Kombinasi snack dan cokelat favorit yang ditata rapi, sangat diminati untuk hadiah kelulusan.',
  },
  {
    num: '08',
    name: 'Buket Snack Beng-Beng',
    category_id: CAT_SNACK,
    price: 55000,
    desc: 'Buket snack lezat dengan kombinasi wafer dan cokelat, pilihan terjangkau dan disukai.',
  },
  {
    num: '09',
    name: 'Buket Snack Nabati & Chiki',
    category_id: CAT_SNACK,
    price: 60000,
    desc: 'Buket snack renyah bertema warna ceria, cocok untuk hadiah perayaan kelulusan.',
  },
  {
    num: '10',
    name: 'Buket Snack Cokelat SilverQueen',
    category_id: CAT_SNACK,
    price: 85000,
    desc: 'Buket berisi cokelat SilverQueen dan camilan manis, hadiah spesial untuk orang tersayang.',
  },
  {
    num: '11',
    name: 'Buket Uang 10 Lembar',
    category_id: CAT_UANG,
    price: 125000,
    desc: 'Buket uang asli dengan pengaman plastik rapi tanpa merusak lembaran uang, dipadukan bunga artifisial.',
  },
  {
    num: '12',
    name: 'Buket Uang Kipas Eksklusif',
    category_id: CAT_UANG,
    price: 150000,
    desc: 'Buket uang susun kipas cantik dengan wrapping premium emas dan putih.',
  },
  {
    num: '13',
    name: 'Buket Uang & Bunga Mawar',
    category_id: CAT_UANG,
    price: 175000,
    desc: 'Kombinasi lembaran uang rapi dan kuntum bunga mawar, sangat mewah untuk hadiah wisuda.',
  },
  {
    num: '14',
    name: 'Buket Uang & Boneka Wisuda',
    category_id: CAT_UANG,
    price: 165000,
    desc: 'Buket uang lengkap dengan boneka teddy wisuda bertoga dan kartu ucapan kustom.',
  },
  {
    num: '15',
    name: 'Buket Boneka Teddy Wisuda',
    category_id: CAT_CUSTOM,
    price: 80000,
    desc: 'Buket boneka beruang toga lucu dengan wrapping elegan, hadiah kelulusan paling diminati.',
  },
  {
    num: '16',
    name: 'Buket Balon Air Balloon Box',
    category_id: CAT_CUSTOM,
    price: 110000,
    desc: 'Buket balon transparan dengan dekorasi bunga di dalamnya, unik untuk kejutan ulang tahun.',
  },
  {
    num: '17',
    name: 'Buket Boneka & Mawar Biru',
    category_id: CAT_CUSTOM,
    price: 95000,
    desc: 'Kombinasi boneka wisuda dan mawar biru estetik dalam balutan wrapping premium.',
  },
  {
    num: '18',
    name: 'Buket Hijab Segi Empat',
    category_id: CAT_CUSTOM,
    price: 75000,
    desc: 'Buket hijab premium yang dibentuk menyerupai kelopak bunga indah, hadiah bermanfaat.',
  },
  {
    num: '19',
    name: 'Buket Foto Polaroid Kenangan',
    category_id: CAT_CUSTOM,
    price: 70000,
    desc: 'Buket custom dengan jepitan foto polaroid dan lampu LED mini, sangat berkesan personal.',
  },
  {
    num: '20',
    name: 'Buket Boneka Wisuda Spesial',
    category_id: CAT_CUSTOM,
    price: 105000,
    desc: 'Buket boneka wisuda ukuran besar dengan bunga pendukung dan wrapping bertingkat.',
  },
];

async function seed() {
  console.log('--- Memulai Seeding Produk & Gambar ke Cloudflare D1 ---');
  const now = new Date().toISOString();

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const imageFilename = `produk-${p.num}.webp`;
    const imagePath = path.join(process.cwd(), 'public', 'uploads', 'products', imageFilename);

    if (!fs.existsSync(imagePath)) {
      console.warn(`File gambar ${imagePath} tidak ditemukan, lewati.`);
      continue;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const base64Data = imageBuffer.toString('base64');
    const imageId = `products-${Date.now()}-${p.num}-${Math.random().toString(36).substring(2, 6)}`;
    const imageUrl = `/api/images/${imageId}`;

    // 1. Simpan gambar ke uploaded_images
    await executeD1(
      `INSERT INTO uploaded_images (id, filename, folder, mime_type, data_base64, size_bytes, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [imageId, imageFilename, 'products', 'image/webp', base64Data, imageBuffer.length, now]
    );

    // 2. Simpan produk ke products
    const productId = `prod-${Date.now()}-${p.num}`;
    const slug = p.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    await executeD1(
      `INSERT INTO products (id, category_id, product_type, name, description, slug, price, image_url, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [productId, p.category_id, 'bucket', p.name, p.desc, slug, p.price, imageUrl, now]
    );

    console.log(`[${i + 1}/${products.length}] Berhasil simpan: ${p.name} -> ${imageUrl}`);
  }

  console.log('--- Seeding Selesai Sukses! ---');
}

seed().catch((err) => {
  console.error('Seeding gagal:', err);
  process.exit(1);
});
