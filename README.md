# Sowmya — Marketing, GTM & Growth

A colourful, editorial personal marketing portfolio: a single fast static page that positions Sowmya across marketing strategy, GTM, demand generation, B2B/ABM, growth, campaigns, marketing operations, AI-assisted marketing, community-led growth and experiential marketing.

Built to be hosted free on **GitHub Pages** with a **custom domain**.

## Tech stack

- Plain **HTML + CSS + JavaScript**: no framework, no build step, no dependencies to install
- Self-hosted fonts (Space Grotesk, DM Sans, Instrument Serif) in `assets/fonts/`
- About 6 KB of JavaScript, used only for enhancements (mobile menu, scroll reveals, count-up numbers, cursor). The site works fully without it.
- Respects `prefers-reduced-motion`

## Folder structure

```text
/
├── index.html          ← the whole website (content lives here)
├── style.css           ← all styling (colours are at the top under :root)
├── script.js           ← small interactions
├── 404.html            ← "page not found" page
├── assets/
│   ├── images/         ← og-image.png (link preview) + your case-study images
│   ├── icons/          ← favicon.svg, favicon-32.png, apple-touch-icon.png
│   └── fonts/          ← self-hosted .woff2 font files
├── CNAME               ← your custom domain (placeholder: YOURDOMAIN.com)
├── .nojekyll           ← tells GitHub Pages to serve files as-is
├── robots.txt
├── sitemap.xml
├── README.md
└── DEPLOYMENT.md       ← step-by-step publishing guide
```

## Run it locally

**Quickest:** double-click `index.html` to open it in your browser.

**Closest to the live site** (recommended before publishing), from this folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy to GitHub Pages

Full, non-technical walkthrough: **[DEPLOYMENT.md](DEPLOYMENT.md)**.

Short version: push these files to the `main` branch → **Settings → Pages** → *Deploy from a branch* → `main` / `(root)` → Save.

## Custom domain

1. Put your domain (e.g. `sowmya.com`, no `https://`) as the only line in `CNAME`.
2. Add the DNS records listed in [DEPLOYMENT.md](DEPLOYMENT.md#5-configure-dns-at-your-domain-registrar) at your registrar.
3. **Settings → Pages → Custom domain**, then tick **Enforce HTTPS**.

> ⚠️ While `CNAME` still says `YOURDOMAIN.com`, GitHub Pages will try to use that fake domain. Replace it, or delete the file if you want to test on the free `github.io` address first.

## Where to update things

Search the project for these markers. Every one needs your real information:

| Marker | File | What it is |
| --- | --- | --- |
| `ADD-YOUR-EMAIL` | `index.html` (3×) | Your email address (in the contact section and footer) |
| `ADD-YOUR-LINKEDIN` | `index.html` (2×) | Your LinkedIn profile URL |
| `[ADD YOUR EMAIL]` | `index.html` | Visible email text in the contact section |
| `[ADD VERIFIED DETAILS]` | `index.html` | Problem, role, strategy, execution and deliverables in each case study's "Case notes" |
| `[ADD VERIFIED OUTCOME …]` | `index.html` | Case-study outcomes. Add only results you can verify, otherwise delete the line |
| `[ADD YEARS]` `[ADD ROLE]` `[ADD COMPANY]` | `index.html` | Your roles in the Experience section |
| `YOURDOMAIN.com` | `index.html`, `CNAME`, `robots.txt`, `sitemap.xml` | Your real domain |

### Personal info & copy
All text is in `index.html`, section by section (Hero → Proof → What I solve → Selected work → Toolkit → Services → Beliefs → About → Process → Experience → Contact). Each section is marked with a comment like `<!-- ===== HERO ===== -->`.

**Proof numbers:** only use verified figures. The current ones (7+ years, ₹2Cr+ portfolio ownership, 98% client retention) are the approved proof points.

### Case-study images
1. Save the image in `assets/images/`, e.g. `assets/images/marxcel.jpg`. Keep it under about 300 KB; export as `.webp` or `.jpg` around 1200px wide.
2. In `index.html`, inside that case's `<article>`, replace the `<div class="case-visual …">…</div>` block with:
   ```html
   <img class="case-img" src="assets/images/marxcel.jpg" alt="What the image shows" width="1200" height="900" loading="lazy" decoding="async">
   ```
   Use **relative paths** (no leading `/`) so the site works both on `github.io` and on your domain.

### SEO
At the top of `index.html` (the `<head>` section):
- `<title>` and `<meta name="description">`: the search result title and snippet
- `og:*` and `twitter:*` tags: how links look when shared on LinkedIn, WhatsApp and X
- `<link rel="canonical">`: replace `YOURDOMAIN.com`
- The share image is `assets/images/og-image.png` (1200×630). Replace it with your own if you like, using the same name and size.

Also update `YOURDOMAIN.com` in `robots.txt` and `sitemap.xml`, and change `<lastmod>` in `sitemap.xml` when you make big changes.

### Colours
At the top of `style.css`:

```css
--green:#14C784; --blue:#3867FF; --coral:#FF5C5C; --yellow:#FFD84D;
--lavender:#A78BFA; --cream:#FFF9F0; --dark:#111111;
```

## Content rule

This site never invents clients, testimonials, revenue, leads, conversion rates, results, awards, partnerships, job titles or company details. Where something is missing, it shows a highlighted placeholder such as `[ADD VERIFIED DETAILS]`.
