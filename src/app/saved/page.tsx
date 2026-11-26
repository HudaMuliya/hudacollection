import { getOutfits, getProducts } from "@/lib/db/queries";
import { SavedBoardClient } from "@/components/SavedBoardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Saved Board — hudacollection",
  description: "Your personal editorial archive of saved outfits and curated pieces.",
};

export default async function SavedBoardPage() {
  const [allOutfits, allProducts] = await Promise.all([
    getOutfits(),
    getProducts(),
  ]);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="border-b border-rule pb-8">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          PERSONAL EDITORIAL ARCHIVE
        </span>
        <h1 className="mt-2 font-serif text-4xl tracking-[-0.02em] text-ink sm:text-6xl">
          Saved Board
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Your curated selection of saved outfit dossiers and affiliate pieces.
          Stored locally in your browser.
        </p>
      </div>

      <SavedBoardClient allOutfits={allOutfits} allProducts={allProducts} />
    </div>
  );
}
