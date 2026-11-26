export interface Lookbook {
  id: string;
  slug: string;
  title: string;
  issueNumber: string;
  season: string;
  subtitle: string;
  description: string;
  coverImage: string;
  stylist: string;
  photographer: string;
  publishedAt: string;
  featured: boolean;
}

export interface Product {
  id: string;
  itemNumber: string;
  slug: string;
  name: string;
  brand: string;
  category: "outerwear" | "tops" | "trousers" | "footwear" | "accessories";
  priceUsd: number;
  priceIdr: number;
  imageUrl: string;
  affiliateUrl: string;
  merchantName: string;
  description: string;
  material: string;
  color: string;
  badge: string | null;
  featured: boolean;
}

export interface OutfitProductItem {
  product: Product;
  positionX: number;
  positionY: number;
  fitNote: string | null;
}

export interface Outfit {
  id: string;
  lookbookId: string | null;
  lookbookTitle?: string | null;
  lookbookSlug?: string | null;
  slug: string;
  title: string;
  lookNumber: string;
  styleTags: string[];
  description: string;
  imageUrl: string;
  modelNote: string | null;
  featured: boolean;
  items?: OutfitProductItem[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  issueNumber: string;
  excerpt: string;
  contentMarkdown: string;
  coverImage: string;
  author: string;
  readTimeMinutes: number;
  publishedAt: string;
  featured: boolean;
}
