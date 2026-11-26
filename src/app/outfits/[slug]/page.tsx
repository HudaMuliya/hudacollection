import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getOutfitBySlug } from "@/lib/db/queries";
import { ShopTheLookInteractive } from "@/components/ShopTheLookInteractive";

export const dynamic = "force-dynamic";

export default async function OutfitDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const outfit = await getOutfitBySlug(slug);

  if (!outfit) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="mb-8">
        <Link
          href="/outfits"
          className="editorial-link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Outfits
        </Link>
      </div>

      <div className="border-b border-rule pb-16">
        <ShopTheLookInteractive outfit={outfit} />
      </div>
    </div>
  );
}

