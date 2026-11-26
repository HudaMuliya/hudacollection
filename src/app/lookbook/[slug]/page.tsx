import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getLookbookBySlug } from "@/lib/db/queries";
import { ShopTheLookInteractive } from "@/components/ShopTheLookInteractive";

export const dynamic = "force-dynamic";

export default async function LookbookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getLookbookBySlug(slug);

  if (!data) {
    notFound();
  }

  const { lookbook, outfits } = data;

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="mb-8">
        <Link
          href="/lookbook"
          className="editorial-link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Lookbooks
        </Link>
      </div>

      <header className="border-b border-rule pb-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {lookbook.issueNumber}
          </span>
          <span className="text-muted">·</span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {lookbook.season}
          </span>
        </div>

        <h1 className="mt-3 font-serif text-4xl tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl">
          {lookbook.title}
        </h1>

        <p className="mt-4 max-w-2xl text-lg font-medium text-ink">
          {lookbook.subtitle}
        </p>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          {lookbook.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-8 border-t border-rule pt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <div>STYLING: {lookbook.stylist}</div>
          <div>PHOTOGRAPHY: {lookbook.photographer}</div>
          <div>SERIES: {outfits.length} OUTFITS DOCUMENTED</div>
        </div>
      </header>

      {/* Outfits in this Lookbook */}
      <section className="mt-16 space-y-28">
        {outfits.map((outfit) => (
          <div key={outfit.id} className="border-b border-rule pb-20">
            <ShopTheLookInteractive outfit={outfit} />
          </div>
        ))}
      </section>
    </div>
  );
}

