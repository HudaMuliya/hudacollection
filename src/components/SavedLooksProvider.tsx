"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SavedState {
  outfitSlugs: string[];
  productSlugs: string[];
  toggleOutfit: (slug: string) => void;
  toggleProduct: (slug: string) => void;
  isOutfitSaved: (slug: string) => boolean;
  isProductSaved: (slug: string) => boolean;
  totalSaved: number;
}

const SavedContext = createContext<SavedState | null>(null);
const STORAGE_KEY = "hudacollection_saved_v1";

export function SavedLooksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [outfitSlugs, setOutfitSlugs] = useState<string[]>([]);
  const [productSlugs, setProductSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          outfits?: string[];
          products?: string[];
        };
        if (Array.isArray(parsed.outfits)) setOutfitSlugs(parsed.outfits);
        if (Array.isArray(parsed.products)) setProductSlugs(parsed.products);
      }
    } catch {
      // ignore storage errors
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ outfits: outfitSlugs, products: productSlugs })
      );
    } catch {
      // ignore storage errors
    }
  }, [outfitSlugs, productSlugs, hydrated]);

  const toggleOutfit = (slug: string) => {
    setOutfitSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleProduct = (slug: string) => {
    setProductSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const value: SavedState = {
    outfitSlugs,
    productSlugs,
    toggleOutfit,
    toggleProduct,
    isOutfitSaved: (slug) => outfitSlugs.includes(slug),
    isProductSaved: (slug) => productSlugs.includes(slug),
    totalSaved: outfitSlugs.length + productSlugs.length,
  };

  return (
    <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
  );
}

export function useSavedLooks(): SavedState {
  const ctx = useContext(SavedContext);
  if (!ctx) {
    throw new Error("useSavedLooks must be used within SavedLooksProvider");
  }
  return ctx;
}

