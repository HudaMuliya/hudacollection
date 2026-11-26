import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLookbooks } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Lookbook Archive — hudacollection",
  description: "Curated seasonal issues and visual fashion editorials.",
};

export default async function LookbookIndexPage() {
  const lookbooks = await getLookbooks();

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="border-b border-rule pb-8">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          INDEX & ARCHIVE
        </span>
        <h1 className="mt-2 font-serif text-4xl tracking-[-0.02em] text-ink sm:text-6xl">
          Lookbook Editions
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Each issue explores silhouette, volume, and material restraint through
          monochrome and tactile menswear photography.
        </p>
      </div>

      <div className="mt-12 space-y-24">
        {lookbooks.map((issue, idx) => (
          <article
            key={issue.id}
            className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14"
          >
            <div className="lg:col-span-7">
              <Link
                href={`/lookbook/${issue.slug}`}
                className="group block overflow-hidden bg-stone"
              >
                <img
                  src={issue.coverImage}
                  alt={issue.title}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </Link>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {issue.issueNumber}
                  </span>
                  <span className="text-muted">·</span>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    {issue.season}
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-3xl tracking-[-0.02em] text-ink sm:text-4xl">
                  <Link
                    href={`/lookbook/${issue.slug}`}
                    className="hover:opacity-75 transition-opacity"
                  >
                    {issue.title}
                  </Link>
                </h2>

                <p className="mt-3 text-base font-medium text-ink">
                  {issue.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {issue.description}
                </p>

                <div className="mt-8 border-t border-rule pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted space-y-1">
                  <div>STYLING: {issue.stylist}</div>
                  <div>PHOTOGRAPHY: {issue.photographer}</div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={`/lookbook/${issue.slug}`}
                  className="editorial-link inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-ink"
                >
                  Inspect Issue Looks
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

