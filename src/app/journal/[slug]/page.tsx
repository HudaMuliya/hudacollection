import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlug } from "@/lib/db/queries";
import { formatEditorialDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-[900px] px-5 py-12 sm:px-8 lg:py-16">
      <div className="mb-8">
        <Link
          href="/journal"
          className="editorial-link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Journal
        </Link>
      </div>

      <header className="border-b border-rule pb-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {article.issueNumber}
          </span>
          <span className="text-muted">·</span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {article.category}
          </span>
          <span className="text-muted">·</span>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {formatEditorialDate(article.publishedAt)}
          </span>
        </div>

        <h1 className="mt-4 font-serif text-4xl tracking-[-0.03em] text-ink sm:text-6xl">
          {article.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-muted">
          {article.excerpt}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-rule pt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <span>ESSAYIST: {article.author}</span>
          <span>{article.readTimeMinutes} MINUTE DISCOURSE</span>
        </div>
      </header>

      {/* Cover Image */}
      <div className="my-10 aspect-[16/10] overflow-hidden bg-stone">
        <img
          src={article.coverImage}
          alt={article.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Article Body */}
      <div className="prose prose-neutral max-w-none text-base leading-relaxed text-ink space-y-6">
        {article.contentMarkdown.split("\n\n").map((para, i) => {
          if (para.startsWith("### ")) {
            return (
              <h2
                key={i}
                className="mt-8 font-serif text-2xl tracking-[-0.02em] text-ink"
              >
                {para.replace("### ", "")}
              </h2>
            );
          }
          return <p key={i}>{para}</p>;
        })}
      </div>

      <footer className="mt-16 border-t border-rule pt-8 flex items-center justify-between">
        <Link
          href="/journal"
          className="editorial-link font-mono text-xs uppercase tracking-[0.16em] text-ink"
        >
          ← Return to Journal
        </Link>
        <Link
          href="/shop"
          className="editorial-link font-mono text-xs uppercase tracking-[0.16em] text-ink"
        >
          Explore Curated Pieces →
        </Link>
      </footer>
    </article>
  );
}

