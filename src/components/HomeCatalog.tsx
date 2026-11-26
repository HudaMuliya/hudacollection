"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/editorial";
import { ProductCard } from "./ProductCard";

interface HomeCatalogProps {
  products: Product[];
  initialQuery?: string;
  initialCategory?: string;
}

const CATEGORIES = [
  { id: "all", label: "Semua Kategori" },
  { id: "outerwear", label: "Outerwear" },
  { id: "tops", label: "Atasan" },
  { id: "trousers", label: "Bawahan" },
  { id: "footwear", label: "Alas Kaki" },
  { id: "accessories", label: "Aksesoris" },
];

type SortMode = "featured" | "number_asc" | "price_asc" | "price_desc";

const PAGE_SIZE = 8;

export function HomeCatalog({
  products,
  initialQuery = "",
  initialCategory = "all",
}: HomeCatalogProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortMode>("number_asc");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const filteredAndSorted = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    const cleanNum = trimmed.replace(/^#/, "");

    const filtered = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!trimmed) return true;

      return (
        p.itemNumber.toLowerCase().includes(cleanNum) ||
        `#${p.itemNumber}`.toLowerCase().includes(trimmed) ||
        p.name.toLowerCase().includes(trimmed) ||
        p.brand.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed)
      );
    });

    return [...filtered].sort((a, b) => {
      if (sort === "number_asc") {
        return a.itemNumber.localeCompare(b.itemNumber);
      }
      if (sort === "price_asc") {
        return a.priceIdr - b.priceIdr;
      }
      if (sort === "price_desc") {
        return b.priceIdr - a.priceIdr;
      }
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.itemNumber.localeCompare(b.itemNumber);
    });
  }, [products, query, category, sort]);

  const visibleProducts = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;

  const handleReset = () => {
    setQuery("");
    setCategory("all");
    setSort("number_asc");
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section id="catalog" className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        {/* Header Katalog */}
        <div className="flex flex-col justify-between gap-4 border-b border-rule pb-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              KATALOG PRODUK KURASI
            </span>
            <h2 className="mt-1 font-serif text-3xl tracking-[-0.02em] text-ink sm:text-5xl">
              Pilihan Terbaik untuk Kamu
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            MENAMPILKAN {visibleProducts.length} DARI {filteredAndSorted.length}{" "}
            PRODUK
          </p>
        </div>

        {/* Pencarian Nomor + Filter Kategori + Urutkan */}
        <div className="mt-8 flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="relative lg:col-span-6">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder="Cari produk berdasarkan nomor (misal: #001, 004) atau nama brand..."
                aria-label="Cari produk berdasarkan nomor atau kata kunci"
                className="w-full border border-rule bg-stone/40 py-3 pl-11 pr-10 font-mono text-xs text-ink placeholder:text-muted transition-colors focus:border-ink focus:bg-paper focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Hapus pencarian"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border border-rule bg-paper px-4 py-2.5 lg:col-span-3 lg:col-start-10">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Urutkan
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
                aria-label="Urutkan produk"
                className="cursor-pointer bg-transparent font-mono text-xs text-ink focus:outline-none"
              >
                <option value="number_asc">Nomor: #001 – #012</option>
                <option value="featured">Kurasi Pilihan</option>
                <option value="price_asc">Harga: Terendah</option>
                <option value="price_desc">Harga: Tertinggi</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setCategory(cat.id);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className={cn(
                    "border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                    active
                      ? "border-ink bg-ink text-paper"
                      : "border-rule bg-paper text-muted hover:border-ink hover:text-ink"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Daftar Produk */}
        {visibleProducts.length === 0 ? (
          <div className="my-20 border border-rule bg-stone/30 py-16 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              TIDAK ADA PRODUK YANG COCOK DENGAN PENCARIAN &ldquo;{query}&rdquo;
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="editorial-link mt-4 font-mono text-xs uppercase tracking-[0.16em] text-ink"
            >
              Reset Filter &amp; Pencarian
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                sourcePage="/"
              />
            ))}
          </div>
        )}

        {/* Load More / Pagination */}
        {filteredAndSorted.length > 0 && (
          <div className="mt-14 flex flex-col items-center gap-4 border-t border-rule pt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              MENAMPILKAN {visibleProducts.length} / {filteredAndSorted.length}{" "}
              PRODUK
            </p>
            {hasMore ? (
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + 4)}
                className="inline-flex items-center gap-2 border border-ink bg-ink px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-transparent hover:text-ink"
              >
                Muat Lebih Banyak
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
            ) : (
              filteredAndSorted.length > PAGE_SIZE && (
                <button
                  type="button"
                  onClick={() => setVisibleCount(PAGE_SIZE)}
                  className="editorial-link font-mono text-xs uppercase tracking-[0.16em] text-muted hover:text-ink"
                >
                  Tampilkan Lebih Sedikit
                </button>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
