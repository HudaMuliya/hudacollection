import type { Row } from "@libsql/client";
import { getDbClient } from "./client";
import type {
  Article,
  Lookbook,
  Outfit,
  OutfitProductItem,
  Product,
} from "@/types/editorial";

function mapLookbook(row: Row): Lookbook {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    issueNumber: String(row.issue_number),
    season: String(row.season),
    subtitle: String(row.subtitle),
    description: String(row.description),
    coverImage: String(row.cover_image),
    stylist: String(row.stylist),
    photographer: String(row.photographer),
    publishedAt: String(row.published_at),
    featured: Number(row.featured) === 1,
  };
}

function mapProduct(row: Row): Product {
  return {
    id: String(row.id),
    itemNumber: String(row.item_number || "000"),
    slug: String(row.slug),
    name: String(row.name),
    brand: String(row.brand),
    category: String(row.category) as Product["category"],
    priceUsd: Number(row.price_usd),
    priceIdr: Number(row.price_idr),
    imageUrl: String(row.image_url),
    affiliateUrl: String(row.affiliate_url),
    merchantName: String(row.merchant_name),
    description: String(row.description),
    material: String(row.material),
    color: String(row.color),
    badge: row.badge ? String(row.badge) : null,
    featured: Number(row.featured) === 1,
  };
}

function mapOutfit(row: Row): Outfit {
  let tags: string[] = [];
  try {
    tags = JSON.parse(String(row.style_tags || "[]"));
  } catch {
    tags = [];
  }

  return {
    id: String(row.id),
    lookbookId: row.lookbook_id ? String(row.lookbook_id) : null,
    lookbookTitle: row.lookbook_title ? String(row.lookbook_title) : null,
    lookbookSlug: row.lookbook_slug ? String(row.lookbook_slug) : null,
    slug: String(row.slug),
    title: String(row.title),
    lookNumber: String(row.look_number),
    styleTags: tags,
    description: String(row.description),
    imageUrl: String(row.image_url),
    modelNote: row.model_note ? String(row.model_note) : null,
    featured: Number(row.featured) === 1,
  };
}

function mapArticle(row: Row): Article {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    category: String(row.category),
    issueNumber: String(row.issue_number),
    excerpt: String(row.excerpt),
    contentMarkdown: String(row.content_markdown),
    coverImage: String(row.cover_image),
    author: String(row.author),
    readTimeMinutes: Number(row.read_time_minutes),
    publishedAt: String(row.published_at),
    featured: Number(row.featured) === 1,
  };
}

export async function getLookbooks(limit?: number): Promise<Lookbook[]> {
  const db = getDbClient();
  const sql = limit
    ? "SELECT * FROM lookbooks ORDER BY featured DESC, published_at DESC LIMIT ?"
    : "SELECT * FROM lookbooks ORDER BY featured DESC, published_at DESC";
  const result = await db.execute({
    sql,
    args: limit ? [limit] : [],
  });
  return result.rows.map(mapLookbook);
}

export async function getLookbookBySlug(slug: string): Promise<{
  lookbook: Lookbook;
  outfits: Outfit[];
} | null> {
  const db = getDbClient();
  const lbRes = await db.execute({
    sql: "SELECT * FROM lookbooks WHERE slug = ? LIMIT 1",
    args: [slug],
  });

  if (lbRes.rows.length === 0) return null;
  const lookbook = mapLookbook(lbRes.rows[0]);

  const outfitsRes = await db.execute({
    sql: `SELECT o.*, l.title AS lookbook_title, l.slug AS lookbook_slug
          FROM outfits o
          LEFT JOIN lookbooks l ON o.lookbook_id = l.id
          WHERE o.lookbook_id = ?
          ORDER BY o.look_number ASC`,
    args: [lookbook.id],
  });

  const outfits = await Promise.all(
    outfitsRes.rows.map(async (row) => {
      const outfit = mapOutfit(row);
      outfit.items = await getOutfitProducts(outfit.id);
      return outfit;
    })
  );

  return { lookbook, outfits };
}

export async function getOutfits(options?: {
  tag?: string;
  featuredOnly?: boolean;
  limit?: number;
}): Promise<Outfit[]> {
  const db = getDbClient();
  const conditions: string[] = [];
  const args: (string | number)[] = [];

  if (options?.featuredOnly) {
    conditions.push("o.featured = 1");
  }
  if (options?.tag && options.tag !== "all") {
    conditions.push("o.style_tags LIKE ?");
    args.push(`%${options.tag}%`);
  }

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const limitSql = options?.limit ? "LIMIT ?" : "";
  if (options?.limit) args.push(options.limit);

  const res = await db.execute({
    sql: `SELECT o.*, l.title AS lookbook_title, l.slug AS lookbook_slug
          FROM outfits o
          LEFT JOIN lookbooks l ON o.lookbook_id = l.id
          ${where}
          ORDER BY o.featured DESC, o.look_number ASC
          ${limitSql}`,
    args,
  });

  return Promise.all(
    res.rows.map(async (row) => {
      const outfit = mapOutfit(row);
      outfit.items = await getOutfitProducts(outfit.id);
      return outfit;
    })
  );
}

export async function getOutfitBySlug(slug: string): Promise<Outfit | null> {
  const db = getDbClient();
  const res = await db.execute({
    sql: `SELECT o.*, l.title AS lookbook_title, l.slug AS lookbook_slug
          FROM outfits o
          LEFT JOIN lookbooks l ON o.lookbook_id = l.id
          WHERE o.slug = ?
          LIMIT 1`,
    args: [slug],
  });

  if (res.rows.length === 0) return null;
  const outfit = mapOutfit(res.rows[0]);
  outfit.items = await getOutfitProducts(outfit.id);
  return outfit;
}

export async function getOutfitProducts(
  outfitId: string
): Promise<OutfitProductItem[]> {
  const db = getDbClient();
  const res = await db.execute({
    sql: `SELECT op.position_x, op.position_y, op.fit_note, p.*
          FROM outfit_products op
          INNER JOIN products p ON op.product_id = p.id
          WHERE op.outfit_id = ?
          ORDER BY op.position_y ASC`,
    args: [outfitId],
  });

  return res.rows.map((row) => ({
    product: mapProduct(row),
    positionX: Number(row.position_x),
    positionY: Number(row.position_y),
    fitNote: row.fit_note ? String(row.fit_note) : null,
  }));
}

export type ProductSortOption =
  | "featured"
  | "number_asc"
  | "price_asc"
  | "price_desc";

export async function getProducts(options?: {
  category?: string;
  query?: string;
  featuredOnly?: boolean;
  sort?: ProductSortOption;
  limit?: number;
  offset?: number;
}): Promise<Product[]> {
  const db = getDbClient();
  const conditions: string[] = [];
  const args: (string | number)[] = [];

  if (options?.category && options.category !== "all") {
    conditions.push("category = ?");
    args.push(options.category);
  }
  if (options?.query && options.query.trim().length > 0) {
    const raw = options.query.trim();
    const cleanNum = raw.replace(/^#/, "");
    const q = `%${raw}%`;
    const numQ = `%${cleanNum}%`;
    conditions.push(
      "(item_number LIKE ? OR name LIKE ? OR brand LIKE ? OR description LIKE ?)"
    );
    args.push(numQ, q, q, q);
  }
  if (options?.featuredOnly) {
    conditions.push("featured = 1");
  }

  let orderBy = "ORDER BY featured DESC, item_number ASC";
  if (options?.sort === "number_asc") {
    orderBy = "ORDER BY item_number ASC";
  } else if (options?.sort === "price_asc") {
    orderBy = "ORDER BY price_idr ASC";
  } else if (options?.sort === "price_desc") {
    orderBy = "ORDER BY price_idr DESC";
  }

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const limitSql = options?.limit ? "LIMIT ?" : "";
  if (options?.limit) args.push(options.limit);
  const offsetSql = options?.offset ? "OFFSET ?" : "";
  if (options?.offset) args.push(options.offset);

  const res = await db.execute({
    sql: `SELECT * FROM products ${where} ${orderBy} ${limitSql} ${offsetSql}`,
    args,
  });

  return res.rows.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = getDbClient();
  const res = await db.execute({
    sql: "SELECT * FROM products WHERE slug = ? LIMIT 1",
    args: [slug],
  });
  return res.rows.length > 0 ? mapProduct(res.rows[0]) : null;
}

export async function getArticles(options?: {
  category?: string;
  limit?: number;
}): Promise<Article[]> {
  const db = getDbClient();
  const conditions: string[] = [];
  const args: (string | number)[] = [];

  if (options?.category && options.category !== "all") {
    conditions.push("category = ?");
    args.push(options.category);
  }

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const limitSql = options?.limit ? "LIMIT ?" : "";
  if (options?.limit) args.push(options.limit);

  const res = await db.execute({
    sql: `SELECT * FROM articles ${where} ORDER BY featured DESC, published_at DESC ${limitSql}`,
    args,
  });

  return res.rows.map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const db = getDbClient();
  const res = await db.execute({
    sql: "SELECT * FROM articles WHERE slug = ? LIMIT 1",
    args: [slug],
  });
  return res.rows.length > 0 ? mapArticle(res.rows[0]) : null;
}

export async function recordAffiliateClick(params: {
  id: string;
  productId: string;
  outfitId?: string | null;
  sourcePage: string;
}): Promise<void> {
  const db = getDbClient();
  await db.execute({
    sql: `INSERT INTO affiliate_clicks (id, product_id, outfit_id, source_page)
          VALUES (?, ?, ?, ?)`,
    args: [
      params.id,
      params.productId,
      params.outfitId ?? null,
      params.sourcePage,
    ],
  });
}
