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

**Currently live without a custom domain at <https://sowmya06-tech.github.io/portfolio/>** (no `CNAME` file). When you buy a domain:

1. Enter it in **Settings → Pages → Custom domain**. GitHub creates the `CNAME` file for you.
2. Add the DNS records listed in [DEPLOYMENT.md](DEPLOYMENT.md#5-configure-dns-at-your-domain-registrar) at your registrar.
3. **Settings → Pages → Custom domain**, then tick **Enforce HTTPS**.

> Then replace `https://sowmya06-tech.github.io/portfolio/` with your domain in `index.html`, `robots.txt` and `sitemap.xml`, and change `/portfolio/` to `/` in `404.html`.

## Where to update things

Search the project for these markers. Every one needs your real information:

| Marker | File | What it is |
| --- | --- | --- |
| `[ADD FORM ENDPOINT]` | `index.html` (contact form `action`) | Your Formspree endpoint. See **Contact form** below |
| Artifact slots (`ADD GTM FRAMEWORK`, `ADD DASHBOARD`, …) | `index.html` | Dashed "Artifact slot" / "Work sample" boxes in **Things I've Built** and in each case study. See **Artifact slots** below |
| `[ADD DATES]` | `index.html` | Dates for each role in the Experience section |
| `[ADD COMPANY / AGENCY, IF APPLICABLE]` | `index.html` | Who you delivered the Royal Stag work through (delete if not applicable) |
| `sowmya06-tech.github.io/portfolio` | `index.html`, `robots.txt`, `sitemap.xml` | Site URL. Change it only if you move to a custom domain |

### Contact form
The form in the Contact section uses **[Formspree](https://formspree.io)** (free plan, no server needed). Until it's connected, pressing **Let's talk** opens the visitor's email app with their message pre-filled, so no enquiries are lost.

To connect it:
1. Sign up free at <https://formspree.io> with `sowmyadevangk@gmail.com` and confirm your email.
2. Click **+ New Form**, name it "Portfolio", and choose `sowmyadevangk@gmail.com` as the recipient.
3. Copy the form's endpoint. It looks like `https://formspree.io/f/abcdwxyz`.
4. In `index.html`, find `action="[ADD FORM ENDPOINT]"` and replace **only** `[ADD FORM ENDPOINT]` with your endpoint, e.g. `action="https://formspree.io/f/abcdwxyz"`. Commit.
5. Test it on the live site: send yourself a message, check you see "Message received. I'll get back to you soon." and that the email arrives. (Formspree may ask you to confirm the very first submission.)

Email and LinkedIn are set in the Contact section and footer of `index.html`: search for `sowmyadevangk@gmail.com` and `sowmya-devang`.

### Personal info & copy
All text is in `index.html`, section by section (Hero → Proof → What I solve → Selected work → Toolkit → Services → Beliefs → About → Process → Experience → Contact). Each section is marked with a comment like `<!-- ===== HERO ===== -->`.

**Proof numbers:** only use verified figures. The current ones (7+ years, ₹2Cr+ portfolio ownership, 98% client retention) are the approved proof points.

### Brands & organisations logo wall
Logos live in `assets/logos/` as SVG files. They're official brand artwork, taken unaltered from open-source brand-logo collections (gilbarbara/logos, VectorLogoZone, svgl, theSVG) and only cropped to their edges.

These names are currently shown as type because no official logo file was available when the wall was built: **DevRev, Redington, Centilytics, CyberArk, Barracuda, Coralogix, Affinidi, Games24x7**. To add one:
1. Download the official SVG from the company's brand or press page and save it as, e.g., `assets/logos/devrev.svg`.
2. In `index.html`, replace that tile's `<li class="lw-text">…</li>` with the same pattern as the logo tiles:
   `<li><span class="lw-no" aria-hidden="true">08</span><img src="assets/logos/devrev.svg" alt="DevRev" width="120" height="26" loading="lazy" decoding="async"><span class="lw-name" aria-hidden="true">DevRev</span></li>`
   Set `width`/`height` to the logo's proportions at about 26px tall (use up to 40px for square marks).

The line under the wall ("Logos shown for identification purposes…") should stay.

### Artifact slots (Things I've Built + case studies)
The dashed, taped boxes are placeholders for real work. They're designed to look intentional until you replace them:

| Where | Slot |
| --- | --- |
| Things I've Built → 01 Strategy | ADD GTM FRAMEWORK |
| Things I've Built → 02 Growth | ADD CAMPAIGN ARTIFACT |
| Things I've Built → 03 Creative | ADD BRAND WORK · ADD CAMPAIGN CREATIVE · ADD SOCIAL / CONTENT |
| Things I've Built → 04 Digital | ADD WEBSITE WORK |
| Things I've Built → 05 Systems | ADD DASHBOARD |
| Marxcel case | ADD GTM FRAMEWORK |
| Elevate Ecosystem case | ADD PROGRAMME CREATIVE |
| Shroom Interactive case | ADD BRAND WORK |
| Family Doc case | ADD CAMPAIGN CREATIVE |
| 05 Events & experiential | ADD EVENT PHOTOS · ADD EVENT CREATIVE · ADD EVENT ARTIFACT · ADD CAMPAIGN VISUAL |
| Royal Stag (inside Events & experiential → "Read the Royal Stag case study") | ADD EVENT PHOTOS |

**Events & experiential:** the grey "About the programme" boxes are public context about each AWS / Databricks / Amazon programme, not claims about your work. The "My work" / "My focus" lines are your experience. Replace the two `[ADD SPECIFIC ROLE DETAILS]` placeholders (AWS AI & Cloud, Databricks) when you're ready.

To fill one, save the image in `assets/images/`, then replace that slot's `<div class="slot …">…</div>` with:

```html
<figure class="artifact"><img src="assets/images/your-file.jpg" alt="What it shows" width="1200" height="800" loading="lazy" decoding="async"><figcaption>What it is</figcaption></figure>
```

Only use real work you're allowed to show. The diagrams in Things I've Built (target, bars, wireframe, workflow) are labelled "illustrative" and aren't client artifacts.

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
- `<link rel="canonical">`: the site's official URL
- The share image is `assets/images/og-image.png` (1200×630). Replace it with your own if you like, using the same name and size.

If the URL changes, also update it in `robots.txt` and `sitemap.xml`. Change `<lastmod>` in `sitemap.xml` when you make big changes.

### Colours
At the top of `style.css`:

```css
--green:#14C784; --blue:#3867FF; --coral:#FF5C5C; --yellow:#FFD84D;
--lavender:#A78BFA; --cream:#FFF9F0; --dark:#111111;
```

## Content rule

This site never invents clients, testimonials, revenue, leads, conversion rates, results, awards, partnerships, job titles or company details. Where something is missing, it shows a highlighted placeholder such as `[ADD VERIFIED PROOF …]` or `[ADD DATES]`.
