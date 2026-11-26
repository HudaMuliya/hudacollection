import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getOutfits } from "@/lib/db/queries";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Outfit Inspiration & Look Dossiers — hudacollection",
  description: "Curated streetwear and tailoring outfit breakdowns.",
};

const TAGS = [
  { id: "all", label: "All Looks" },
  { id: "minimalist", label: "Minimalist" },
  { id: "streetwear", label: "Streetwear" },
  { id: "tailored", label: "Tailored" },
  { id: "monochrome", label: "Monochrome" },
  { id: "technical", label: "Technical" },
];

export default async function OutfitsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag = "all" } = await searchParams;
  const outfits = await getOutfits({ tag });

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="border-b border-rule pb-8">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          OUTFIT DOSSIERS
        </span>
        <h1 className="mt-2 font-serif text-4xl tracking-[-0.02em] text-ink sm:text-6xl">
          Outfit Inspiration
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Deconstructed streetwear silhouettes with interactive piece-by-piece
          affiliate acquisition links.
        </p>

        {/* Style Tag Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {TAGS.map((t) => {
            const active = (tag || "all") === t.id;
            return (
              <Link
                key={t.id}
                href={t.id === "all" ? "/outfits" : `/outfits?tag=${t.id}`}
                className={cn(
                  "border px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-rule bg-paper text-muted hover:border-ink hover:text-ink"
                )}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Dynamic Grid of Outfits */}
      <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {outfits.map((outfit) => (
          <article key={outfit.id} className="group flex flex-col">
            <Link
              href={`/outfits/${outfit.slug}`}
              className="relative aspect-[3/4] overflow-hidden bg-stone"
            >
              <img
                src={outfit.imageUrl}
                alt={outfit.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute left-3 top-3 bg-paper/90 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
                {outfit.lookNumber}
              </span>
            </Link>

            <div className="mt-5 flex flex-1 flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  {outfit.styleTags.map((st) => (
                    <span
                      key={st}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
                    >
                      #{st}
                    </span>
                  ))}
                </div>

                <h2 className="mt-2 font-serif text-2xl tracking-[-0.02em] text-ink transition-opacity group-hover:opacity-75">
                  <Link href={`/outfits/${outfit.slug}`}>
                    {outfit.title}
                  </Link>
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
                  {outfit.description}
                </p>
              </div>

              <div className="mt-6 border-t border-rule pt-3 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {outfit.items?.length || 0} PIECES TAGGED
                </span>
                <Link
                  href={`/outfits/${outfit.slug}`}
                  className="editorial-link inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.14em] text-ink"
                >
                  Breakdown
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

