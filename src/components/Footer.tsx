import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="text-2xl tracking-[-0.03em] text-ink">
              <span className="font-bold">huda</span>
              <span className="font-light text-muted">collection</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Portal kurasi fashion editorial dan rekomendasi affiliate
              terpilih. Menggabungkan inspirasi outfit harian, streetwear
              modern, dan panduan gaya minimalis.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              TRANSPARANSI AFFILIATE — TAUTAN PARTNER MENDUKUNG KURASI KAMI
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Editorial
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/lookbook" className="editorial-link text-ink">
                  Arsip Lookbook
                </Link>
              </li>
              <li>
                <Link href="/outfits" className="editorial-link text-ink">
                  Inspirasi OOTD
                </Link>
              </li>
              <li>
                <Link href="/journal" className="editorial-link text-ink">
                  Jurnal Fashion
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Kategori
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/?category=outerwear#catalog"
                  className="editorial-link text-ink"
                >
                  Outerwear
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=tops#catalog"
                  className="editorial-link text-ink"
                >
                  Atasan &amp; Rajut
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=trousers#catalog"
                  className="editorial-link text-ink"
                >
                  Bawahan &amp; Denim
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=footwear#catalog"
                  className="editorial-link text-ink"
                >
                  Alas Kaki
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Indeks
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/saved" className="editorial-link text-ink">
                  Koleksi Tersimpan
                </Link>
              </li>
              <li>
                <span className="text-muted">Jakarta / Indonesia</span>
              </li>
              <li>
                <span className="font-mono text-xs text-muted">
                  © 2026 hudacollection
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
