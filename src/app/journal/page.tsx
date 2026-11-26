import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getArticles } from "@/lib/db/queries";
import { formatEditorialDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fashion Journal & Textile Research — hudacollection",
  description: "Essays on streetwear proportions, material craftsmanship, and monochrome styling.",
};

export default async function JournalPage() {
  const articles = await getArticles();

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="border-b border-rule pb-8">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          DISCOURSE & NOTES
        </span>
        <h1 className="mt-2 font-serif text-4xl tracking-[-0.02em] text-ink sm:text-6xl">
          Fashion Journal
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Critical essays, textile studies, and silhouette breakdowns exploring
          the cultural trajectory of modern streetwear.
        </p>
      </div>

      <div className="mt-12 space-y-16">
        {articles.map((art) => (
          <article
            key={art.id}
            className="grid grid-cols-1 items-start gap-10 border-b border-rule pb-16 lg:grid-cols-12 lg:gap-14"
          >
            <div className="lg:col-span-6">
              <Link
                href={`/journal/${art.slug}`}
                className="group block aspect-[16/10] overflow-hidden bg-stone"
              >
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </Link>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                    {art.issueNumber}
                  </span>
                  <span className="text-muted">·</span>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    {art.category}
                  </span>
                  <span className="text-muted">·</span>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    {formatEditorialDate(art.publishedAt)}
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-3xl tracking-[-0.02em] text-ink sm:text-4xl">
                  <Link
                    href={`/journal/${art.slug}`}
                    className="hover:opacity-75 transition-opacity"
                  >
                    {art.title}
                  </Link>
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {art.excerpt}
                </p>

                <div className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-muted">
                  BY {art.author} · {art.readTimeMinutes} MIN READ
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={`/journal/${art.slug}`}
                  className="editorial-link inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-ink"
                >
                  Read Full Article
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

