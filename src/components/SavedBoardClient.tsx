"use client";

import Link from "next/link";
import { ArrowUpRight, Trash2 } from "lucide-react";
import { useSavedLooks } from "@/components/SavedLooksProvider";
import { formatUsd } from "@/lib/utils";
import type { Outfit, Product } from "@/types/editorial";

interface SavedBoardClientProps {
  allOutfits: Outfit[];
  allProducts: Product[];
}

export function SavedBoardClient({
  allOutfits,
  allProducts,
}: SavedBoardClientProps) {
  const { outfitSlugs, productSlugs, toggleOutfit, toggleProduct } =
    useSavedLooks();

  const savedOutfits = allOutfits.filter((o) => outfitSlugs.includes(o.slug));
  const savedProducts = allProducts.filter((p) =>
    productSlugs.includes(p.slug)
  );
  const totalCount = savedOutfits.length + savedProducts.length;

  if (totalCount === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          YOUR SAVED BOARD IS CURRENTLY EMPTY
        </p>
        <p className="mt-2 text-sm text-muted">
          Tap the bookmark icon on any outfit or piece across hudacollection to
          curate your personal moodboard.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/outfits"
            className="border border-ink bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            Explore Outfits
          </Link>
          <Link
            href="/shop"
            className="border border-rule px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
          >
            Browse Pieces
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-16">
      {savedOutfits.length > 0 && (
        <section>
          <h2 className="border-b border-rule pb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            SAVED OUTFITS ({savedOutfits.length})
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {savedOutfits.map((outfit) => (
              <article key={outfit.id} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                  <Link href={`/outfits/${outfit.slug}`}>
                    <img
                      src={outfit.imageUrl}
                      alt={outfit.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </Link>
                  <span className="absolute left-3 top-3 bg-paper/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
                    {outfit.lookNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleOutfit(outfit.slug)}
                    aria-label="Remove outfit from saved"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-paper/90 text-muted backdrop-blur-sm transition-colors hover:text-ink"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl tracking-[-0.02em] text-ink">
                    <Link href={`/outfits/${outfit.slug}`}>{outfit.title}</Link>
                  </h3>
                  <Link
                    href={`/outfits/${outfit.slug}`}
                    className="editorial-link shrink-0 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.14em] text-ink"
                  >
                    Inspect
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {savedProducts.length > 0 && (
        <section>
          <h2 className="border-b border-rule pb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            SAVED PIECES ({savedProducts.length})
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {savedProducts.map((product) => (
              <article key={product.id} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                  <img
                    src={product.imageUrl}
                    alt={`${product.brand} — ${product.name}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <button
                    type="button"
                    onClick={() => toggleProduct(product.slug)}
                    aria-label="Remove piece from saved"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-paper/90 text-muted backdrop-blur-sm transition-colors hover:text-ink"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                      {product.brand}
                    </span>
                    <span className="font-mono text-xs text-ink">
                      {formatUsd(product.priceUsd)}
                    </span>
                  </div>
                  <h3 className="mt-1 text-sm font-medium text-ink">
                    {product.name}
                  </h3>
                  <div className="mt-3 flex items-center justify-between border-t border-rule pt-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      {product.merchantName}
                    </span>
                    <a
                      href={`/api/go/${product.slug}?source=/saved`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.14em] text-ink"
                    >
                      Acquire
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

