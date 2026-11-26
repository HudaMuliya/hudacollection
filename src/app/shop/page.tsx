import Link from "next/link";
import { getProducts } from "@/lib/db/queries";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Curated Fashion Pieces & Affiliate Directory — hudacollection",
  description: "Independent curation of luxury streetwear, outerwear, and footwear.",
};

const CATEGORIES = [
  { id: "all", label: "All Pieces" },
  { id: "outerwear", label: "Outerwear" },
  { id: "tops", label: "Tops & Knitwear" },
  { id: "trousers", label: "Trousers & Denim" },
  { id: "footwear", label: "Footwear" },
  { id: "accessories", label: "Accessories" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category = "all", q } = await searchParams;
  const products = await getProducts({ category, query: q });

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="border-b border-rule pb-8">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          CURATED AFFILIATE SELECTIONS
        </span>
        <h1 className="mt-2 font-serif text-4xl tracking-[-0.02em] text-ink sm:text-6xl">
          Curated Pieces
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Garments and accessories selected for silhouette, durability, and
          architectural restraint. Direct partner acquisition links.
        </p>

        {/* Category Pills & Search */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = (category || "all") === cat.id;
              const href =
                cat.id === "all"
                  ? q
                    ? `/shop?q=${encodeURIComponent(q)}`
                    : "/shop"
                  : `/shop?category=${cat.id}${
                      q ? `&q=${encodeURIComponent(q)}` : ""
                    }`;
              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={cn(
                    "border px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                    active
                      ? "border-ink bg-ink text-paper"
                      : "border-rule bg-paper text-muted hover:border-ink hover:text-ink"
                  )}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          <form action="/shop" method="GET" className="sm:w-64">
            <input
              type="text"
              name="q"
              defaultValue={q || ""}
              placeholder="Search pieces or brands..."
              className="w-full border border-rule bg-paper px-3 py-1.5 font-mono text-xs text-ink placeholder:text-muted focus:border-ink focus:outline-none"
            />
          </form>
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            NO PIECES FOUND FOR THIS CRITERIA
          </p>
          <Link
            href="/shop"
            className="editorial-link mt-4 inline-block font-mono text-xs uppercase tracking-[0.14em] text-ink"
          >
            Reset Catalog View
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              sourcePage="/shop"
            />
          ))}
        </div>
      )}
    </div>
  );
}

