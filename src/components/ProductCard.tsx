"use client";

import { ArrowUpRight, Bookmark } from "lucide-react";
import { cn, formatIdr } from "@/lib/utils";
import type { Product } from "@/types/editorial";
import { useSavedLooks } from "./SavedLooksProvider";

interface ProductCardProps {
  product: Product;
  sourcePage?: string;
  outfitId?: string;
}

export function ProductCard({
  product,
  sourcePage = "/",
  outfitId,
}: ProductCardProps) {
  const { isProductSaved, toggleProduct } = useSavedLooks();
  const saved = isProductSaved(product.slug);

  const affiliateHref = `/api/go/${product.slug}?source=${encodeURIComponent(
    sourcePage
  )}${outfitId ? `&outfit=${encodeURIComponent(outfitId)}` : ""}`;

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-stone">
        <img
          src={product.imageUrl}
          alt={`${product.brand} — ${product.name}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span className="bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper">
            #{product.itemNumber}
          </span>
          {product.badge && (
            <span className="bg-paper/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink backdrop-blur-sm">
              {product.badge}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleProduct(product.slug)}
          aria-label={saved ? "Hapus dari tersimpan" : "Simpan produk"}
          className={cn(
            "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 backdrop-blur-sm transition-colors",
            saved ? "text-ink" : "text-muted hover:text-ink"
          )}
        >
          <Bookmark className={cn("h-3.5 w-3.5", saved && "fill-current")} />
        </button>
      </div>

      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {product.brand}
            </span>
            <span className="font-mono text-xs font-medium text-ink">
              {formatIdr(product.priceIdr)}
            </span>
          </div>
          <h3 className="mt-1 text-sm font-medium leading-snug text-ink">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-muted">
            {product.color} · {product.material}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-rule pt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {product.merchantName}
          </span>
          <a
            href={affiliateHref}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.12em] text-ink"
          >
            Lihat Produk
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
