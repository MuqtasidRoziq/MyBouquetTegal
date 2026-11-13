import { Product, Category, StoreInfo, ContactInfo, ProductType } from '@/types';

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

export const isD1Configured = Boolean(ACCOUNT_ID && DATABASE_ID && API_TOKEN);

/**
 * Eksekusi query SQL langsung ke Cloudflare D1
 */
export async function queryD1<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  if (!isD1Configured) return [];

  const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql, params }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Cloudflare D1 query failed:', errorText);
    throw new Error(`D1 Query Error: ${response.statusText}`);
  }

  const result = await response.json();
  if (!result.success || !result.result || !result.result[0]) {
    if (result.errors && result.errors.length > 0) {
      console.error('Cloudflare D1 internal error:', result.errors);
    }
    return [];
  }

  return (result.result[0].results as T[]) || [];
}

// ---------------- PRODUCTS ----------------
export async function getD1Products(productType?: ProductType): Promise<Product[] | null> {
  if (!isD1Configured) return null;
  try {
    let sql = 'SELECT * FROM products WHERE deleted_at IS NULL';
    const params: unknown[] = [];

    if (productType) {
      sql += ' AND product_type = ?';
      params.push(productType);
    }
    sql += ' ORDER BY created_at DESC';

    const rows = await queryD1<{
      id: string;
      category_id: string;
      product_type: 'bucket' | 'parcel';
      name: string;
      description: string;
      slug: string;
      price: number;
      image_url: string;
      created_at: string;
      updated_at?: string | null;
      deleted_at?: string | null;
    }>(sql, params);

    return rows.map((r) => ({
      id: r.id,
      categoryId: r.category_id,
      productType: r.product_type,
      name: r.name,
      description: r.description,
      slug: r.slug,
      price: r.price,
      imageUrl: r.image_url,
      createdAt: r.created_at,
      updatedAt: r.updated_at || null,
      deletedAt: r.deleted_at || null,
    }));
  } catch (err) {
    console.error('D1 Query products failed:', err);
    return null;
  }
}

export async function insertD1Product(product: Product): Promise<boolean> {
  if (!isD1Configured) return false;
  try {
    await queryD1(
      `INSERT INTO products (id, category_id, product_type, name, description, slug, price, image_url, created_at, updated_at, deleted_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product.id,
        product.categoryId,
        product.productType,
        product.name,
        product.description,
        product.slug,
        product.price,
        product.imageUrl,
        product.createdAt || new Date().toISOString(),
        product.updatedAt || null,
        product.deletedAt || null,
      ]
    );
    return true;
  } catch (err) {
    console.error('Insert D1 Product failed:', err);
    return false;
  }
}

export async function updateD1Product(product: Product): Promise<boolean> {
  if (!isD1Configured) return false;
  try {
    await queryD1(
      `UPDATE products SET 
        category_id = ?, 
        product_type = ?,
        name = ?, 
        description = ?, 
        slug = ?, 
        price = ?, 
        image_url = ?, 
        updated_at = ?
       WHERE id = ?`,
      [
        product.categoryId,
        product.productType,
        product.name,
        product.description,
        product.slug,
        product.price,
        product.imageUrl,
        new Date().toISOString(),
        product.id,
      ]
    );
    return true;
  } catch (err) {
    console.error('Update D1 Product failed:', err);
    return false;
  }
}

export async function deleteD1Product(id: string): Promise<boolean> {
  if (!isD1Configured) return false;
  try {
    await queryD1(
      `UPDATE products SET deleted_at = ? WHERE id = ?`,
      [new Date().toISOString(), id]
    );
    return true;
  } catch (err) {
    console.error('Delete D1 Product failed:', err);
    return false;
  }
}

// ---------------- STORE & CONTACT ----------------
export async function getD1StoreInfo(): Promise<StoreInfo | null> {
  if (!isD1Configured) return null;
  try {
    const rows = await queryD1<{
      id: string;
      name: string;
      tagline: string;
      logo_url: string;
    }>('SELECT * FROM store WHERE id = ? LIMIT 1', ['default']);

    if (rows.length === 0) return null;
    return {
      id: rows[0].id,
      name: rows[0].name,
      tagline: rows[0].tagline || '',
      logoUrl: rows[0].logo_url || '',
    };
  } catch {
    return null;
  }
}

export async function updateD1StoreInfo(store: StoreInfo): Promise<boolean> {
  if (!isD1Configured) return false;
  try {
    await queryD1(
      `UPDATE store SET name = ?, tagline = ?, logo_url = ? WHERE id = ?`,
      [store.name, store.tagline, store.logoUrl, 'default']
    );
    return true;
  } catch {
    return false;
  }
}

export async function getD1ContactInfo(): Promise<ContactInfo | null> {
  if (!isD1Configured) return null;
  try {
    const rows = await queryD1<{
      id: string;
      whatsapp_number: string;
      chat_whatsapp_template: string;
      instagram_handle: string;
      instagram_url: string;
      address: string;
      google_maps_frame_url: string;
      operational_hours: string;
    }>('SELECT * FROM contact WHERE id = ? LIMIT 1', ['default']);

    if (rows.length === 0) return null;
    const r = rows[0];
    return {
      id: r.id,
      whatsappNumber: r.whatsapp_number,
      chatWhatsappTemplate: r.chat_whatsapp_template || '',
      instagramHandle: r.instagram_handle || '',
      instagramUrl: r.instagram_url || '',
      address: r.address || '',
      googleMapsFrameUrl: r.google_maps_frame_url || '',
      operationalHours: r.operational_hours || '',
    };
  } catch {
    return null;
  }
}

export async function updateD1ContactInfo(contact: ContactInfo): Promise<boolean> {
  if (!isD1Configured) return false;
  try {
    await queryD1(
      `UPDATE contact SET 
        whatsapp_number = ?, 
        chat_whatsapp_template = ?, 
        instagram_handle = ?, 
        instagram_url = ?, 
        address = ?, 
        google_maps_frame_url = ?, 
        operational_hours = ? 
       WHERE id = ?`,
      [
        contact.whatsappNumber,
        contact.chatWhatsappTemplate,
        contact.instagramHandle,
        contact.instagramUrl,
        contact.address,
        contact.googleMapsFrameUrl,
        contact.operationalHours,
        'default',
      ]
    );
    return true;
  } catch {
    return false;
  }
}

// ---------------- CATEGORIES ----------------
export async function getD1Categories(): Promise<Category[] | null> {
  if (!isD1Configured) return null;
  try {
    const rows = await queryD1<{
      id: string;
      name: string;
      slug: string;
      product_type: 'bucket' | 'parcel';
      description: string | null;
    }>('SELECT * FROM categories');

    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      productType: r.product_type,
      description: r.description || undefined,
    }));
  } catch {
    return null;
  }
}

export async function insertD1Category(category: Category): Promise<boolean> {
  if (!isD1Configured) return false;
  try {
    await queryD1(
      `INSERT INTO categories (id, name, slug, product_type, description) VALUES (?, ?, ?, ?, ?)`,
      [category.id, category.name, category.slug, category.productType, category.description || null]
    );
    return true;
  } catch (err) {
    console.error('Insert D1 Category failed:', err);
    return false;
  }
}

// ---------------- TESTIMONIALS & FAQS ----------------
export async function getD1Testimonials(): Promise<import('@/types').Testimonial[]> {
  if (!isD1Configured) return [];
  try {
    const rows = await queryD1<{
      id: string;
      customer_name: string;
      event_type: string;
      rating: number;
      comment: string;
      date_text: string | null;
    }>('SELECT * FROM testimonials ORDER BY created_at DESC');

    return rows.map((r) => ({
      id: r.id,
      customerName: r.customer_name,
      eventType: r.event_type,
      rating: r.rating,
      comment: r.comment,
      dateText: r.date_text || undefined,
    }));
  } catch {
    return [];
  }
}

export async function insertD1Testimonial(t: import('@/types').Testimonial): Promise<boolean> {
  if (!isD1Configured) return false;
  try {
    await queryD1(
      `INSERT INTO testimonials (id, customer_name, event_type, rating, comment, date_text, created_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
      [t.id, t.customerName, t.eventType, t.rating, t.comment, t.dateText || null]
    );
    return true;
  } catch (err) {
    console.error('Insert testimonial failed:', err);
    return false;
  }
}

export async function deleteD1Testimonial(id: string): Promise<boolean> {
  if (!isD1Configured) return false;
  try {
    await queryD1('DELETE FROM testimonials WHERE id = ?', [id]);
    return true;
  } catch {
    return false;
  }
}

export async function getD1FAQs(): Promise<import('@/types').FAQ[]> {
  if (!isD1Configured) return [];
  try {
    const rows = await queryD1<{
      id: string;
      question: string;
      answer: string;
      category: string | null;
      sort_order: number | null;
    }>('SELECT * FROM faqs ORDER BY sort_order ASC');

    return rows.map((r) => ({
      id: r.id,
      question: r.question,
      answer: r.answer,
      category: r.category || undefined,
      sortOrder: r.sort_order || undefined,
    }));
  } catch {
    return [];
  }
}

export async function insertD1FAQ(f: import('@/types').FAQ): Promise<boolean> {
  if (!isD1Configured) return false;
  try {
    await queryD1(
      `INSERT INTO faqs (id, question, answer, category, sort_order, created_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))`,
      [f.id, f.question, f.answer, f.category || 'Umum', f.sortOrder || 0]
    );
    return true;
  } catch (err) {
    console.error('Insert FAQ failed:', err);
    return false;
  }
}

export async function deleteD1FAQ(id: string): Promise<boolean> {
  if (!isD1Configured) return false;
  try {
    await queryD1('DELETE FROM faqs WHERE id = ?', [id]);
    return true;
  } catch {
    return false;
  }
}

// ---------------- USERS (ADMIN CREDENTIALS) ----------------
export interface StoredUser {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
}

export async function getD1User(username: string): Promise<StoredUser | null> {
  if (!isD1Configured) return null;
  try {
    const rows = await queryD1<{
      id: string;
      username: string;
      password_hash: string;
      name: string;
    }>('SELECT * FROM users WHERE username = ? LIMIT 1', [username]);

    if (rows.length === 0) return null;
    return {
      id: rows[0].id,
      username: rows[0].username,
      passwordHash: rows[0].password_hash,
      name: rows[0].name,
    };
  } catch {
    return null;
  }
}
