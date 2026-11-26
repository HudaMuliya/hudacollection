"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bookmark, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSavedLooks } from "./SavedLooksProvider";

const NAV_ITEMS = [
  { href: "/", label: "Beranda" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/outfits", label: "Inspirasi OOTD" },
  { href: "/shop", label: "Katalog" },
  { href: "/journal", label: "Jurnal" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalSaved } = useSavedLooks();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerQuery, setHeaderQuery] = useState("");

  const isHome = pathname === "/";

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = headerQuery.trim();
    if (!trimmed) {
      router.push("/#catalog");
      return;
    }
    router.push(`/?q=${encodeURIComponent(trimmed)}#catalog`);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md transition-colors",
        isHome
          ? "border-white/10 bg-[#0B0B0B]/95 text-white"
          : "border-rule bg-paper/95 text-ink"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        {/* Kiri: Menu Mobile & Identitas Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Buka navigasi"
            className="inline-flex items-center justify-center p-1 md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <Link href="/" className="text-xl tracking-[-0.03em] sm:text-[22px]">
            <span className="font-bold">huda</span>
            <span className="font-light opacity-85">collection</span>
          </Link>
        </div>

        {/* Tengah: Navigasi Desktop */}
        <nav className="hidden items-center gap-1 md:flex lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs transition-colors",
                  isHome
                    ? active
                      ? "bg-white/15 font-medium text-white"
                      : "text-white/70 hover:text-white"
                    : active
                    ? "bg-ink font-medium text-paper"
                    : "text-muted hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Kanan: Search Bar & Tersimpan */}
        <div className="flex items-center gap-3 sm:gap-4">
          <form
            onSubmit={handleHeaderSearch}
            className={cn(
              "hidden items-center rounded-full border px-3.5 py-1.5 lg:flex",
              isHome
                ? "border-white/15 bg-white/10 text-white"
                : "border-rule bg-stone/60 text-ink"
            )}
          >
            <Search
              className={cn(
                "h-3.5 w-3.5",
                isHome ? "text-white/60" : "text-muted"
              )}
            />
            <input
              type="text"
              value={headerQuery}
              onChange={(e) => setHeaderQuery(e.target.value)}
              placeholder="Cari #001, outfit, produk..."
              className={cn(
                "ml-2 w-44 bg-transparent text-xs focus:outline-none",
                isHome
                  ? "text-white placeholder:text-white/50"
                  : "text-ink placeholder:text-muted"
              )}
            />
          </form>

          <Link
            href="/saved"
            className="inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-75"
            aria-label="Koleksi tersimpan"
          >
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Tersimpan</span>
            <span
              className={cn(
                "font-mono text-[11px]",
                isHome ? "text-white/60" : "text-muted"
              )}
            >
              ({totalSaved})
            </span>
          </Link>
        </div>
      </div>

      {/* Drawer Mobile */}
      {mobileOpen && (
        <div
          className={cn(
            "border-t px-5 py-6 md:hidden",
            isHome
              ? "border-white/10 bg-[#0B0B0B] text-white"
              : "border-rule bg-paper text-ink"
          )}
        >
          <form
            onSubmit={handleHeaderSearch}
            className={cn(
              "mb-5 flex items-center rounded-full border px-3.5 py-2",
              isHome
                ? "border-white/15 bg-white/10"
                : "border-rule bg-stone/50"
            )}
          >
            <Search className="h-3.5 w-3.5 opacity-60" />
            <input
              type="text"
              value={headerQuery}
              onChange={(e) => setHeaderQuery(e.target.value)}
              placeholder="Cari nomor produk (#001)..."
              className="ml-2 w-full bg-transparent text-xs focus:outline-none"
            />
          </form>
          <nav className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-sm",
                    active ? "font-medium" : "opacity-70"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/saved"
              onClick={() => setMobileOpen(false)}
              className="mt-2 border-t border-current/15 pt-3 text-sm"
            >
              Koleksi Tersimpan ({totalSaved})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
