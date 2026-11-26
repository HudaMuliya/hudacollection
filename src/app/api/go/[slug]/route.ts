import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug, recordAffiliateClick } from "@/lib/db/queries";
import { randomUUID } from "node:crypto";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return NextResponse.redirect(new URL("/shop", request.url));
  }

  const outfitId = request.nextUrl.searchParams.get("outfit");
  const sourcePage = request.nextUrl.searchParams.get("source") || "/shop";

  try {
    await recordAffiliateClick({
      id: randomUUID(),
      productId: product.id,
      outfitId,
      sourcePage,
    });
  } catch (err) {
    // Non-blocking analytics log: never prevent user from reaching partner store
    console.error("Failed to record affiliate click:", err);
  }

  return NextResponse.redirect(product.affiliateUrl, { status: 302 });
}

