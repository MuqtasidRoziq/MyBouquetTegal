CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, name TEXT NOT NULL, created_at TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS store (id TEXT PRIMARY KEY, name TEXT NOT NULL, tagline TEXT, logo_url TEXT);

CREATE TABLE IF NOT EXISTS contact (id TEXT PRIMARY KEY, whatsapp_number TEXT NOT NULL, chat_whatsapp_template TEXT, instagram_handle TEXT, instagram_url TEXT, address TEXT, google_maps_frame_url TEXT, operational_hours TEXT);

CREATE TABLE IF NOT EXISTS categories (id TEXT PRIMARY KEY, name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, product_type TEXT NOT NULL, description TEXT);

CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, category_id TEXT NOT NULL, product_type TEXT NOT NULL, name TEXT NOT NULL, slug TEXT NOT NULL, price INTEGER NOT NULL, description TEXT, image_url TEXT NOT NULL, badge TEXT, status TEXT NOT NULL DEFAULT 'ready', is_featured INTEGER DEFAULT 0, created_at TEXT NOT NULL, FOREIGN KEY (category_id) REFERENCES categories(id));

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  comment TEXT NOT NULL,
  date_text TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);
