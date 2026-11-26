import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Footprints,
  LayoutGrid,
  Shirt,
  ShoppingBag,
  Sparkles,
  Tag,
} from "lucide-react";
import { getArticles, getOutfits, getProducts } from "@/lib/db/queries";
import { HomeCatalog } from "@/components/HomeCatalog";
import { formatEditorialDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const HERO_CATEGORIES = [
  { id: "tops", label: "Atasan", href: "/?category=tops#catalog", icon: Shirt },
  {
    id: "trousers",
    label: "Bawahan",
    href: "/?category=trousers#catalog",
    icon: Tag,
  },
  {
    id: "footwear",
    label: "Alas Kaki",
    href: "/?category=footwear#catalog",
    icon: Footprints,
  },
  {
    id: "accessories",
    label: "Aksesoris",
    href: "/?category=accessories#catalog",
    icon: ShoppingBag,
  },
  {
    id: "outerwear",
    label: "Outerwear",
    href: "/?category=outerwear#catalog",
    icon: Sparkles,
  },
  {
    id: "all",
    label: "Semua Kategori",
    href: "/#catalog",
    icon: LayoutGrid,
  },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = "", category = "all" } = await searchParams;

  const [products, outfits, articles] = await Promise.all([
    getProducts({ sort: "number_asc" }),
    getOutfits({ featuredOnly: true, limit: 3 }),
    getArticles({ limit: 3 }),
  ]);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Editorial Dark Full-Bleed (Sesuai Referensi) */}
      <section className="relative bg-[#0B0B0B] text-white">
        <div className="relative overflow-hidden">
          {/* Background Portrait Model + Gradient Gelap Editorial */}
          <div className="pointer-events-none absolute inset-0">
            <img
              src="/images/hero-editorial.jpg"
              alt="Editorial Streetwear hudacollection"
              className="h-full w-full object-cover object-[72%_20%] opacity-55 sm:opacity-75 lg:object-[75%_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/88 to-[#0B0B0B]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/50" />
          </div>

          <div className="relative mx-auto flex min-h-[540px] max-w-[1400px] items-center px-5 pt-14 pb-24 sm:min-h-[600px] sm:px-8 lg:min-h-[640px] lg:px-12">
            {/* Indikator Scroll Vertikal Kiri */}
            <div className="mr-8 hidden flex-col items-center gap-4 lg:flex">
              <span className="h-24 w-px bg-white/30" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60 [writing-mode:vertical-rl] rotate-180">
                Gulir ke Bawah
              </span>
            </div>

            {/* Konten Hero Utama */}
            <div className="flex w-full items-end justify-between gap-8">
              <div className="max-w-xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/65">
                  PORTAL KURASI FASHION &amp; STREETWEAR
                </p>

                <h1 className="mt-3 text-5xl tracking-[-0.04em] text-white sm:text-7xl lg:text-[78px] lg:leading-[0.98]">
                  <span className="font-bold">huda</span>
                  <span className="font-light text-white/85">collection</span>
                </h1>

                <p className="mt-2.5 text-lg font-medium tracking-[-0.01em] text-white/95 sm:text-xl">
                  Temukan. Padukan. Ulangi.
                </p>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                  Temukan inspirasi OOTD harian, rekomendasi fashion terbaik,
                  dan gaya streetwear minimalis yang paling cocok untukmu.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/lookbook"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-semibold tracking-[0.04em] text-[#0B0B0B] transition-transform hover:scale-[1.02]"
                  >
                    Jelajahi Lookbook
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href="#catalog"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/10"
                  >
                    Cari Nomor Produk
                  </a>
                </div>

                {/* Social Proof Bar */}
                <div className="mt-8 flex items-center gap-3.5">
                  <div className="flex -space-x-2">
                    <span className="h-8 w-8 rounded-full border border-[#0B0B0B] bg-neutral-700 bg-[url('/images/hero-editorial.jpg')] bg-cover bg-center" />
                    <span className="h-8 w-8 rounded-full border border-[#0B0B0B] bg-neutral-600 bg-[url('/images/lookbook-02.jpg')] bg-cover bg-center" />
                    <span className="h-8 w-8 rounded-full border border-[#0B0B0B] bg-neutral-500" />
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0B0B0B] bg-neutral-800 font-mono text-[10px] text-white">
                      +
                    </span>
                  </div>
                  <div className="text-xs leading-tight">
                    <div className="font-semibold text-white">
                      100K+ pecinta fashion
                    </div>
                    <div className="text-white/55">sudah bergabung di sini</div>
                  </div>
                </div>
              </div>

              {/* Aksen Tipografi Editorial Kanan */}
              <div className="hidden pb-6 text-right md:block">
                <p className="font-serif text-3xl italic leading-tight text-white/85 lg:text-4xl">
                  Outfit Tepat,
                  <br />
                  Mood Hebat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Kategori Melayang (Overlapping Pill Bar) */}
        <div className="relative z-20 mx-auto max-w-[1320px] px-4 sm:px-8 lg:px-12">
          <div className="-mb-8 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#141414] px-4 py-3.5 text-white shadow-2xl sm:rounded-full sm:px-8">
            {HERO_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5 opacity-80" />
                  <span>{cat.label}</span>
                  {cat.id === "all" && (
                    <ArrowRight className="h-3 w-3 opacity-75" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Katalog Produk Utama (Pencarian Nomor, Filter, Sorting, Muat Lebih Banyak) */}
      <div className="pt-10">
        <HomeCatalog
          products={products}
          initialQuery={q}
          initialCategory={category}
        />
      </div>

      {/* 3. Lookbook Populer */}
      <section className="border-b border-rule bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-rule pb-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                REFERENSI OUTFIT
              </span>
              <h2 className="mt-1 font-serif text-3xl tracking-[-0.02em] text-ink sm:text-4xl">
                Lookbook Populer
              </h2>
            </div>
            <Link
              href="/lookbook"
              className="editorial-link inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.16em] text-ink"
            >
              Lihat Semua Lookbook
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {outfits.map((outfit) => (
              <Link
                key={outfit.id}
                href={`/outfits/${outfit.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-stone"
              >
                <img
                  src={outfit.imageUrl}
                  alt={outfit.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent p-5 text-paper">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/80">
                    {outfit.lookNumber}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl tracking-[-0.01em]">
                    {outfit.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tips Gaya & Jurnal Fashion */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-rule pb-4 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                DISKURSUS EDITORIAL
              </span>
              <h2 className="mt-1 font-serif text-3xl tracking-[-0.02em] text-ink sm:text-4xl">
                Tips Gaya &amp; Artikel
              </h2>
            </div>
            <Link
              href="/journal"
              className="editorial-link inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.16em] text-ink"
            >
              Baca Semua Artikel
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {articles.map((article) => (
              <article key={article.id} className="group flex flex-col">
                <Link
                  href={`/journal/${article.slug}`}
                  className="aspect-[16/10] overflow-hidden bg-stone"
                >
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  <span>{article.category}</span>
                  <span>·</span>
                  <span>{formatEditorialDate(article.publishedAt)}</span>
                </div>
                <h3 className="mt-2 font-serif text-2xl tracking-[-0.02em] text-ink transition-opacity group-hover:opacity-75">
                  <Link href={`/journal/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">
                  {article.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
