"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Bookmark } from "lucide-react";
import { cn, formatUsd } from "@/lib/utils";
import type { Outfit } from "@/types/editorial";
import { useSavedLooks } from "./SavedLooksProvider";

interface ShopTheLookInteractiveProps {
  outfit: Outfit;
}

export function ShopTheLookInteractive({
  outfit,
}: ShopTheLookInteractiveProps) {
  const items = outfit.items ?? [];
  const [activeId, setActiveId] = useState<string | null>(
    items[0]?.product.id ?? null
  );
  const { isOutfitSaved, toggleOutfit } = useSavedLooks();
  const saved = isOutfitSaved(outfit.slug);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
      {/* Editorial Photograph with Interactive Hotspot Pins */}
      <div className="lg:col-span-7">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone">
          <img
            src={outfit.imageUrl}
            alt={outfit.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute left-4 top-4 bg-paper/90 px-3 py-1.5 backdrop-blur-sm">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
              {outfit.lookNumber}
            </span>
          </div>

          <button
            type="button"
            onClick={() => toggleOutfit(outfit.slug)}
            aria-label={saved ? "Remove outfit from saved" : "Save outfit"}
            className="absolute right-4 top-4 inline-flex items-center gap-1.5 bg-paper/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink backdrop-blur-sm transition-colors hover:bg-paper"
          >
            <Bookmark className={cn("h-3.5 w-3.5", saved && "fill-current")} />
            <span>{saved ? "Saved" : "Save Look"}</span>
          </button>

          {/* Hotspot Pins */}
          {items.map((item, idx) => {
            const isActive = activeId === item.product.id;
            return (
              <button
                key={item.product.id}
                type="button"
                onClick={() => setActiveId(item.product.id)}
                onMouseEnter={() => setActiveId(item.product.id)}
                style={{
                  left: `${item.positionX}%`,
                  top: `${item.positionY}%`,
                }}
                aria-label={`Inspect ${item.product.name}`}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[10px] transition-all duration-300",
                  isActive
                    ? "scale-110 bg-ink text-paper ring-4 ring-paper/60"
                    : "bg-paper/90 text-ink hover:scale-110"
                )}
              >
                0{idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Curated Outfit Breakdown */}
      <div className="lg:col-span-5 flex flex-col">
        <div className="border-b border-rule pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {outfit.lookbookSlug && (
              <Link
                href={`/lookbook/${outfit.lookbookSlug}`}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-ink"
              >
                {outfit.lookbookTitle}
              </Link>
            )}
            <span className="text-muted">·</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {items.length} CURATED PIECES
            </span>
          </div>

          <h2 className="mt-3 font-serif text-3xl leading-[1.1] tracking-[-0.02em] text-ink sm:text-4xl">
            {outfit.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {outfit.description}
          </p>

          {outfit.modelNote && (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              FIT SPEC: {outfit.modelNote}
            </p>
          )}
        </div>

        <div className="divide-y divide-rule">
          {items.map((item, idx) => {
            const isActive = activeId === item.product.id;
            const affiliateHref = `/api/go/${item.product.slug}?outfit=${encodeURIComponent(
              outfit.id
            )}&source=${encodeURIComponent(`/outfits/${outfit.slug}`)}`;

            return (
              <div
                key={item.product.id}
                onMouseEnter={() => setActiveId(item.product.id)}
                className={cn(
                  "py-4 transition-colors duration-200",
                  isActive ? "bg-stone/70 -mx-3 px-3" : ""
                )}
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 font-mono text-[11px] text-muted">
                    0{idx + 1}
                  </span>
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="h-20 w-16 shrink-0 bg-stone object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                        {item.product.brand}
                      </span>
                      <span className="font-mono text-xs text-ink">
                        {formatUsd(item.product.priceUsd)}
                      </span>
                    </div>
                    <h3 className="mt-0.5 text-sm font-medium text-ink">
                      {item.product.name}
                    </h3>
                    {item.fitNote && (
                      <p className="mt-1 text-xs text-muted">
                        Note: {item.fitNote}
                      </p>
                    )}
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                        {item.product.merchantName}
                      </span>
                      <a
                        href={affiliateHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="editorial-link inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-ink"
                      >
                        Acquire
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <Link
            href={`/outfits/${outfit.slug}`}
            className="inline-flex w-full items-center justify-center border border-ink bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            Open Full Outfit Dossier
          </Link>
        </div>
      </div>
    </div>
  );
}

