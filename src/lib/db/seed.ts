import { getDbClient } from "./client";

async function seed() {
  const db = getDbClient();

  const lookbooks = [
    {
      id: "lb-01",
      slug: "concrete-monolith-aw26",
      title: "Concrete Monolith",
      issueNumber: "ISSUE 04",
      season: "AUTUMN / WINTER 2026",
      subtitle:
        "Architectural tailoring meets raw urban utility in monochrome wool and technical nylon.",
      description:
        "Photographed across brutalist concrete courtyards, Issue 04 examines proportion, drape, and tonal restraint. Heavyweight double-faced wool coats anchor wide-leg pleated silhouettes, balanced by weather-resistant technical layers and lug-soled leather footwear.",
      coverImage: "/images/hero-editorial.jpg",
      stylist: "Huda Pratama",
      photographer: "Raka Mahendra",
      publishedAt: "2026-10-14",
      featured: 1,
    },
    {
      id: "lb-02",
      slug: "warm-plaster-studies",
      title: "Warm Plaster Studies",
      issueNumber: "ISSUE 03",
      season: "TRANSITIONAL 2026",
      subtitle:
        "Ecru heavyweight jersey, raw selvedge denim, and quiet afternoon shadow.",
      description:
        "A study in tactile minimalism. Stripping away hardware and overt branding, this series pairs sun-bleached organic cottons with deep indigo-black Japanese denim and unlined calfskin loafers.",
      coverImage: "/images/lookbook-02.jpg",
      stylist: "Sora Takahashi",
      photographer: "Nadia Kusuma",
      publishedAt: "2026-09-02",
      featured: 1,
    },
    {
      id: "lb-03",
      slug: "seoul-transit-uniform",
      title: "Seoul Transit Uniform",
      issueNumber: "ISSUE 02",
      season: "SPRING / SUMMER 2026",
      subtitle:
        "Cropped leather blousons, crisp poplin shirting, and modular street proportions.",
      description:
        "Built for movement between studios and late-evening galleries. Cropped outerwear creates a sharp horizontal break above fluid, high-waisted wool trousers.",
      coverImage:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
      stylist: "Huda Pratama",
      photographer: "Min-jun Park",
      publishedAt: "2026-06-18",
      featured: 0,
    },
    {
      id: "lb-04",
      slug: "atelier-raw-archive",
      title: "Atelier Raw Archive",
      issueNumber: "ISSUE 01",
      season: "ARCHIVE 2026",
      subtitle: "Foundational garments in charcoal, bone, and brushed pewter.",
      description:
        "Our inaugural editorial index documenting essential silhouettes that outlast seasonal cycles—focusing on Japanese mill textiles, horn closures, and relaxed tailoring.",
      coverImage:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
      stylist: "Huda Pratama",
      photographer: "Raka Mahendra",
      publishedAt: "2026-03-10",
      featured: 0,
    },
  ];

  for (const lb of lookbooks) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO lookbooks
            (id, slug, title, issue_number, season, subtitle, description, cover_image, stylist, photographer, published_at, featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        lb.id,
        lb.slug,
        lb.title,
        lb.issueNumber,
        lb.season,
        lb.subtitle,
        lb.description,
        lb.coverImage,
        lb.stylist,
        lb.photographer,
        lb.publishedAt,
        lb.featured,
      ],
    });
  }

  const products = [
    {
      id: "prod-01",
      itemNumber: "001",
      slug: "double-faced-charcoal-trench",
      name: "Double-Faced Wool Trench Coat",
      brand: "Studio Nicholson",
      category: "outerwear",
      priceUsd: 890,
      priceIdr: 14200000,
      imageUrl:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",
      affiliateUrl: "https://www.ssense.com/en-us/men/designers/studio-nicholson",
      merchantName: "SSENSE",
      description:
        "Architectural oversized trench cut from Italian double-faced virgin wool with dropped raglan shoulders and concealed horn button placket.",
      material: "100% Virgin Wool",
      color: "Charcoal",
      badge: "EDITOR PICK",
      featured: 1,
    },
    {
      id: "prod-02",
      itemNumber: "002",
      slug: "wide-pleated-wool-trouser",
      name: "Deep-Pleat Wide Tailored Trouser",
      brand: "Auralee",
      category: "trousers",
      priceUsd: 460,
      priceIdr: 7350000,
      imageUrl:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",
      affiliateUrl: "https://www.mrporter.com/en-us/mens/designer/auralee",
      merchantName: "MR PORTER",
      description:
        "Fluid full-length trousers featuring twin front pleats, high rise, and a clean puddle hem tailored from Super 120s tropical wool.",
      material: "100% Super 120s Wool",
      color: "Obsidian Black",
      badge: "CURATED",
      featured: 1,
    },
    {
      id: "prod-03",
      itemNumber: "003",
      slug: "vibram-lug-leather-derby",
      name: "Monolith Lug-Sole Leather Derby",
      brand: "Our Legacy",
      category: "footwear",
      priceUsd: 520,
      priceIdr: 8300000,
      imageUrl:
        "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=85",
      affiliateUrl: "https://www.ourlegacy.com/footwear",
      merchantName: "OUR LEGACY",
      description:
        "Vegetable-tanned Italian calfskin derby set on a custom Vibram commando sole for grounded urban proportion.",
      material: "Full-Grain Calfskin / Vibram",
      color: "Matte Black",
      badge: "ESSENTIAL",
      featured: 1,
    },
    {
      id: "prod-04",
      itemNumber: "004",
      slug: "heavyweight-ecru-boxy-overshirt",
      name: "Heavyweight Boxy Twill Overshirt",
      brand: "COS Atelier",
      category: "tops",
      priceUsd: 195,
      priceIdr: 3100000,
      imageUrl:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
      affiliateUrl: "https://www.cos.com/en/men/shirts.html",
      merchantName: "COS",
      description:
        "Structured 420gsm organic cotton twill overshirt in unbleached ecru with tonal corozo buttons and squared hem.",
      material: "100% Organic Cotton Twill",
      color: "Warm Ecru",
      badge: "NEW IN",
      featured: 1,
    },
    {
      id: "prod-05",
      itemNumber: "005",
      slug: "technical-matte-shell-parka",
      name: "3L Technical Matte Shell Jacket",
      brand: "Goldwin",
      category: "outerwear",
      priceUsd: 640,
      priceIdr: 10200000,
      imageUrl:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
      affiliateUrl: "https://www.goldwin-global.com/",
      merchantName: "END. CLOTHING",
      description:
        "Three-layer waterproof breathable shell engineered with articulated sleeves, matte welded seams, and minimalist storm hood.",
      material: "3L Gore-Tex Nylon",
      color: "Graphite",
      badge: "TECHNICAL",
      featured: 1,
    },
    {
      id: "prod-06",
      itemNumber: "006",
      slug: "raw-black-selvedge-denim",
      name: "Wide-Straight Raw Selvedge Denim",
      brand: "Acne Studios",
      category: "trousers",
      priceUsd: 380,
      priceIdr: 6050000,
      imageUrl:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
      affiliateUrl: "https://www.acnestudios.com/us/en/man/denim/",
      merchantName: "ACNE STUDIOS",
      description:
        "14oz Japanese non-stretch selvedge denim overdyed in deep sulfur black with relaxed straight leg.",
      material: "100% Cotton Selvedge",
      color: "Washed Pitch",
      badge: null,
      featured: 1,
    },
    {
      id: "prod-07",
      itemNumber: "007",
      slug: "nylon-tanker-crossbody-bag",
      name: "Ballistic Nylon Crossbody Sling",
      brand: "Porter-Yoshida & Co.",
      category: "accessories",
      priceUsd: 310,
      priceIdr: 4950000,
      imageUrl:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
      affiliateUrl: "https://www.yoshidakaban.com/en/",
      merchantName: "PORTER TOKYO",
      description:
        "Signature Japanese flight-nylon twill crossbody engineered with matte anodized hardware and padded internal divider.",
      material: "100% Bonded Nylon Twill",
      color: "Black / Gunmetal",
      badge: "ARCHIVE",
      featured: 1,
    },
    {
      id: "prod-08",
      itemNumber: "008",
      slug: "merino-mock-neck-knit",
      name: "Fine-Gauge Merino Mock-Neck Knit",
      brand: "Lemaire",
      category: "tops",
      priceUsd: 420,
      priceIdr: 6700000,
      imageUrl:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85",
      affiliateUrl: "https://www.lemaire.fr/collections/men-knitwear",
      merchantName: "SSENSE",
      description:
        "Second-skin extra-fine merino wool knit designed as an architectural base layer beneath heavy tailoring or cropped blousons.",
      material: "100% Extra-Fine Merino",
      color: "Ink Black",
      badge: null,
      featured: 1,
    },
    {
      id: "prod-09",
      itemNumber: "009",
      slug: "cropped-calfskin-blouson",
      name: "Cropped Boxy Leather Blouson",
      brand: "mfpen",
      category: "outerwear",
      priceUsd: 960,
      priceIdr: 15300000,
      imageUrl:
        "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=900&q=85",
      affiliateUrl: "https://mfpen.com/",
      merchantName: "MFPEN",
      description:
        "Short boxy blouson cut from supple matte cowhide with two-way Riri zipper and cupro lining.",
      material: "100% Italian Cowhide",
      color: "Onyx",
      badge: "LIMITED",
      featured: 0,
    },
    {
      id: "prod-10",
      itemNumber: "010",
      slug: "minimalist-acetate-frames",
      name: "Architectural Square Acetate Frames",
      brand: "Gentle Monster",
      category: "accessories",
      priceUsd: 295,
      priceIdr: 4700000,
      imageUrl:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
      affiliateUrl: "https://www.gentlemonster.com/",
      merchantName: "GENTLE MONSTER",
      description:
        "Sculpted 8mm Japanese acetate sunglasses with flat zero-base charcoal lenses and titanium temple cores.",
      material: "Japanese Cellulose Acetate",
      color: "Smoke / Black",
      badge: null,
      featured: 0,
    },
    {
      id: "prod-11",
      itemNumber: "011",
      slug: "heavyweight-boxy-studio-tee",
      name: "320gsm Heavyweight Boxy Tee",
      brand: "Entire Studios",
      category: "tops",
      priceUsd: 95,
      priceIdr: 1490000,
      imageUrl:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85",
      affiliateUrl: "https://www.ssense.com/en-us/men/designers/entire-studios",
      merchantName: "SSENSE",
      description:
        "Dropped-shoulder boxy silhouette knitted from dense 320gsm combed cotton jersey with thick ribbed collar.",
      material: "100% Combed Cotton",
      color: "Pitch Black",
      badge: "DAILY",
      featured: 0,
    },
    {
      id: "prod-12",
      itemNumber: "012",
      slug: "monochrome-trail-sneaker",
      name: "ACS Pro Technical Trail Runner",
      brand: "Salomon",
      category: "footwear",
      priceUsd: 230,
      priceIdr: 3650000,
      imageUrl:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=85",
      affiliateUrl: "https://www.salomon.com/en-us/",
      merchantName: "END. CLOTHING",
      description:
        "Archive trail silhouette updated with Kurim structure, Quicklace system, and Contagrip outsole in tonal ash.",
      material: "Technical Mesh / TPU",
      color: "Ash / Slate",
      badge: "TRENDING",
      featured: 0,
    },
  ];

  for (const p of products) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO products
            (id, item_number, slug, name, brand, category, price_usd, price_idr, image_url, affiliate_url, merchant_name, description, material, color, badge, featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        p.id,
        p.itemNumber,
        p.slug,
        p.name,
        p.brand,
        p.category,
        p.priceUsd,
        p.priceIdr,
        p.imageUrl,
        p.affiliateUrl,
        p.merchantName,
        p.description,
        p.material,
        p.color,
        p.badge,
        p.featured,
      ],
    });
  }

  const outfits = [
    {
      id: "out-01",
      lookbookId: "lb-01",
      slug: "look-01-brutalist-trench",
      title: "Brutalist Trench & Fluid Wool",
      lookNumber: "LOOK 01",
      styleTags: JSON.stringify(["minimalist", "tailored", "monochrome"]),
      description:
        "An exercise in vertical elongation: a floor-skimming charcoal trench layered over twin-pleat obsidian trousers and grounded by Vibram lug derbies.",
      imageUrl: "/images/hero-editorial.jpg",
      modelNote: "184cm / Wearing Size M Outerwear, Size 3 Trousers",
      featured: 1,
    },
    {
      id: "out-02",
      lookbookId: "lb-02",
      slug: "look-02-warm-ecru-layering",
      title: "Ecru Twill & Raw Indigo-Black",
      lookNumber: "LOOK 02",
      styleTags: JSON.stringify(["minimalist", "streetwear", "tonal"]),
      description:
        "High-contrast tonal layering pairing an unbleached 420gsm cotton overshirt over fine merino knitwear and wide-straight sulfur black denim.",
      imageUrl: "/images/lookbook-02.jpg",
      modelNote: "181cm / Wearing Size L Overshirt, Size 31 Denim",
      featured: 1,
    },
    {
      id: "out-03",
      lookbookId: "lb-01",
      slug: "look-03-technical-shell-uniform",
      title: "3L Technical Shell & Tailored Drape",
      lookNumber: "LOOK 03",
      styleTags: JSON.stringify(["streetwear", "technical", "monochrome"]),
      description:
        "Bridging alpine utility and city tailoring: a matte 3-layer Gore-Tex shell worn open over pleated wool trousers and a ballistic nylon sling.",
      imageUrl:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85",
      modelNote: "183cm / Wearing Size M Shell, Size 4 Trousers",
      featured: 1,
    },
    {
      id: "out-04",
      lookbookId: "lb-03",
      slug: "look-04-cropped-leather-proportion",
      title: "Cropped Leather & High-Waist Wool",
      lookNumber: "LOOK 04",
      styleTags: JSON.stringify(["streetwear", "tailored", "editorial"]),
      description:
        "Using a cropped boxy cowhide blouson to raise the visual waistline, emphasizing the wide, uninterrupted drape of full-length wool trousers.",
      imageUrl:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
      modelNote: "178cm / Wearing Size S Blouson, Size 2 Trousers",
      featured: 1,
    },
    {
      id: "out-05",
      lookbookId: "lb-04",
      slug: "look-05-gallery-monochrome",
      title: "Gallery Knit & Acetate Frame",
      lookNumber: "LOOK 05",
      styleTags: JSON.stringify(["minimalist", "monochrome", "editorial"]),
      description:
        "Stripped-back studio uniform: extra-fine merino mock-neck tucked lightly into raw black selvedge denim, finished with sculpted acetate frames.",
      imageUrl:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
      modelNote: "180cm / Wearing Size M Knit, Size 30 Denim",
      featured: 0,
    },
  ];

  for (const o of outfits) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO outfits
            (id, lookbook_id, slug, title, look_number, style_tags, description, image_url, model_note, featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        o.id,
        o.lookbookId,
        o.slug,
        o.title,
        o.lookNumber,
        o.styleTags,
        o.description,
        o.imageUrl,
        o.modelNote,
        o.featured,
      ],
    });
  }

  const outfitProducts = [
    { id: "op-01", outfitId: "out-01", productId: "prod-01", x: 48, y: 34, note: "Relaxed dropped shoulder" },
    { id: "op-02", outfitId: "out-01", productId: "prod-02", x: 52, y: 66, note: "Full puddle hem drape" },
    { id: "op-03", outfitId: "out-01", productId: "prod-03", x: 49, y: 90, note: "Grounded Vibram lug sole" },
    { id: "op-04", outfitId: "out-02", productId: "prod-04", x: 50, y: 36, note: "Boxy cropped length" },
    { id: "op-05", outfitId: "out-02", productId: "prod-08", x: 48, y: 24, note: "Tonal mock-neck base" },
    { id: "op-06", outfitId: "out-02", productId: "prod-06", x: 52, y: 68, note: "14oz sulfur black selvedge" },
    { id: "op-07", outfitId: "out-03", productId: "prod-05", x: 46, y: 32, note: "3L weatherproof shell" },
    { id: "op-08", outfitId: "out-03", productId: "prod-07", x: 58, y: 44, note: "Crossbody modular carry" },
    { id: "op-09", outfitId: "out-03", productId: "prod-02", x: 50, y: 70, note: "Wide pleated wool" },
    { id: "op-10", outfitId: "out-04", productId: "prod-09", x: 50, y: 35, note: "Cropped at hip bone" },
    { id: "op-11", outfitId: "out-04", productId: "prod-02", x: 49, y: 65, note: "High-rise silhouette" },
    { id: "op-12", outfitId: "out-04", productId: "prod-10", x: 51, y: 16, note: "Zero-base charcoal lens" },
    { id: "op-13", outfitId: "out-05", productId: "prod-08", x: 50, y: 34, note: "Extra-fine merino layer" },
    { id: "op-14", outfitId: "out-05", productId: "prod-06", x: 50, y: 66, note: "Wide-straight cut" },
    { id: "op-15", outfitId: "out-05", productId: "prod-10", x: 48, y: 18, note: "8mm Japanese acetate" },
  ];

  for (const op of outfitProducts) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO outfit_products
            (id, outfit_id, product_id, position_x, position_y, fit_note)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [op.id, op.outfitId, op.productId, op.x, op.y, op.note],
    });
  }

  const articles = [
    {
      id: "art-01",
      slug: "the-architecture-of-proportion-in-modern-streetwear",
      title: "The Architecture of Proportion in Modern Streetwear",
      category: "ESSAY",
      issueNumber: "JOURNAL 12",
      excerpt:
        "Why contemporary urban dressing has moved beyond graphic logos toward silhouette, fabric weight, and deliberate volume.",
      contentMarkdown: `Modern streetwear no longer announces itself through oversized chest prints or scarce sneaker drops. Instead, the most compelling wardrobes today borrow directly from brutalist architecture: clean lines, honest raw materials, and calculated tension between volume and structure.

### 1. The Rule of Thirds
When pairing a cropped blouson with high-waisted pleated trousers, you shift the body's visual center upward. That single geometric adjustment makes an everyday uniform feel intentional and editorial without adding a single accessory.

### 2. Fabric Weight as Structure
A 420gsm organic cotton twill overshirt behaves differently from standard jersey—it holds air away from the body, creating crisp, sculptural folds. Investing in textile density is the fastest way to elevate minimalist dressing.

### 3. Grounding the Silhouette
Wide-leg trousers demand footwear with visual mass. A Vibram-soled leather derby or structured technical runner anchors the drape so the hem breaks cleanly rather than collapsing.`,
      coverImage:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85",
      author: "Huda Pratama",
      readTimeMinutes: 5,
      publishedAt: "2026-10-18",
      featured: 1,
    },
    {
      id: "art-02",
      slug: "building-a-monochrome-capsule-that-actually-works",
      title: "Building a Monochrome Capsule That Actually Works",
      category: "CURATION",
      issueNumber: "JOURNAL 11",
      excerpt:
        "How to combine charcoal, pitch black, warm ecru, and slate gray using texture contrast instead of color.",
      contentMarkdown: `Dressing in a restrained palette fails only when every garment shares the same surface texture. When color steps back, material becomes the primary storytelling tool.

### Contrast Through Texture
Pair matte 3-layer technical nylon with brushed virgin wool, or crisp poplin shirting against raw sulfur-dyed selvedge denim. Even when two pieces are both black, the way they catch overcast daylight creates depth.

### The Warm Stone Bridge
Introducing unbleached ecru or travertine bone softens stark black-and-white pairings, giving an urban outfit an effortless, lived-in warmth.`,
      coverImage:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85",
      author: "Sora Takahashi",
      readTimeMinutes: 4,
      publishedAt: "2026-09-28",
      featured: 1,
    },
    {
      id: "art-03",
      slug: "japanese-mills-and-the-quiet-luxury-of-tropical-wool",
      title: "Japanese Mills & The Quiet Luxury of Tropical Wool",
      category: "TEXTILES",
      issueNumber: "JOURNAL 10",
      excerpt:
        "Inside the high-twist worsted wool fabrics that drape like silk yet breathe through humid city summers.",
      contentMarkdown: `For Southeast Asian and humid urban climates, heavy winter flannels are impractical—yet lightweight cotton often lacks the fluid drape of tailored trousers. Enter high-twist tropical wool.

Spun tightly in Bishu, Japan, these yarns resist creasing during long commutes while allowing air to circulate freely. It is the secret behind why brands like Auralee and Studio Nicholson achieve effortless movement in warm weather.`,
      coverImage:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=85",
      author: "Nadia Kusuma",
      readTimeMinutes: 6,
      publishedAt: "2026-08-19",
      featured: 0,
    },
  ];

  for (const a of articles) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO articles
            (id, slug, title, category, issue_number, excerpt, content_markdown, cover_image, author, read_time_minutes, published_at, featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        a.id,
        a.slug,
        a.title,
        a.category,
        a.issueNumber,
        a.excerpt,
        a.contentMarkdown,
        a.coverImage,
        a.author,
        a.readTimeMinutes,
        a.publishedAt,
        a.featured,
      ],
    });
  }

  console.log(
    "✓ Seeded hudacollection database (4 lookbooks, 5 outfits, 12 numbered products, 3 journal articles)."
  );
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
