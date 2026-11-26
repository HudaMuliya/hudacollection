-- hudacollection Editorial Fashion & Affiliate Commerce Schema
-- Compatible with Turso (libSQL) and local SQLite

CREATE TABLE IF NOT EXISTS lookbooks (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  issue_number TEXT NOT NULL,
  season TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  stylist TEXT NOT NULL,
  photographer TEXT NOT NULL,
  published_at TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS outfits (
  id TEXT PRIMARY KEY,
  lookbook_id TEXT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  look_number TEXT NOT NULL,
  style_tags TEXT NOT NULL DEFAULT '[]',
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  model_note TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (lookbook_id) REFERENCES lookbooks(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  item_number TEXT NOT NULL DEFAULT '000',
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  price_usd INTEGER NOT NULL,
  price_idr INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  merchant_name TEXT NOT NULL,
  description TEXT NOT NULL,
  material TEXT NOT NULL,
  color TEXT NOT NULL,
  badge TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS outfit_products (
  id TEXT PRIMARY KEY,
  outfit_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  position_x REAL NOT NULL DEFAULT 50,
  position_y REAL NOT NULL DEFAULT 50,
  fit_note TEXT,
  FOREIGN KEY (outfit_id) REFERENCES outfits(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  issue_number TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  author TEXT NOT NULL,
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  published_at TEXT NOT NULL,
  featured INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  outfit_id TEXT,
  source_page TEXT NOT NULL,
  clicked_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_lookbooks_slug ON lookbooks(slug);
CREATE INDEX IF NOT EXISTS idx_outfits_slug ON outfits(slug);
CREATE INDEX IF NOT EXISTS idx_outfits_lookbook ON outfits(lookbook_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_item_number ON products(item_number);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_outfit_products_outfit ON outfit_products(outfit_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_product ON affiliate_clicks(product_id);
