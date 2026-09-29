# Publishing your portfolio: GitHub → GitHub Pages → your domain

No coding needed. Everything below happens in your web browser. Hosting on GitHub Pages is **free**; the only thing you pay for is the domain name.

Wherever you see `YOUR-USERNAME`, use your GitHub username. Wherever you see `yourdomain.com`, use the domain you bought.

---

## Before you start: fill in your details

Open `index.html` in any text editor (Notepad, TextEdit, or directly on GitHub with the ✏️ pencil icon) and replace:

- `[ADD FORM ENDPOINT]` → your Formspree endpoint (steps in `README.md` → **Contact form**)
- Every `[ADD VERIFIED PROOF …]`, `[ADD DATES]` and `[ADD COMPANY / AGENCY, IF APPLICABLE]`

Tip: use **Find** (Ctrl+F / Cmd+F) and search for `ADD`.

---

## 1. Create the GitHub repository

> **Already done?** Your code is already in the repository `sowmya06-tech/portfolio`. If the latest changes are on a separate branch, open a Pull Request and **merge it into `main`**, then skip to step 3.

1. Go to <https://github.com> and sign in (or create a free account).
2. Click the **+** at the top-right → **New repository**.
3. **Repository name:** `portfolio` (any name works).
4. Choose **Public**. GitHub Pages is free for public repositories.
5. Leave everything else as is and click **Create repository**.

## 2. Upload the website

**Easiest way (no software):**

1. In your new repository, click **uploading an existing file** (or **Add file → Upload files**).
2. Open the website folder on your computer, select **everything inside it** (`index.html`, `style.css`, `script.js`, `404.html`, `robots.txt`, `sitemap.xml`, `.nojekyll` and the whole `assets` folder) and drag it into the browser window.
   - Drag the *contents* of the folder, not the folder itself. `index.html` must sit at the top level of the repository.
   - `.nojekyll` is a hidden file. On Mac press **Cmd+Shift+.** in Finder to show it; on Windows tick **View → Hidden items**. If it won't upload, don't worry: create it on GitHub with **Add file → Create new file**, name it `.nojekyll`, leave it empty and commit.
3. At the bottom, click **Commit changes**.

**If you use Git** (optional):

```bash
git add .
git commit -m "Publish portfolio"
git push origin main
```

## 3. Turn on GitHub Pages

1. In the repository, click **Settings** (top menu) → **Pages** (left menu).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Under **Branch**, choose **`main`** and **`/ (root)`**, then click **Save**.
4. Wait 1–2 minutes and refresh the page. You'll see *"Your site is live at …"*.

> **Current setup:** no custom domain, so there is no `CNAME` file. The site lives at `https://sowmya06-tech.github.io/portfolio/`. Steps 4–6 are only for later, once you buy a domain. GitHub creates the `CNAME` file for you in step 4.
> When you switch, also replace `https://sowmya06-tech.github.io/portfolio/` with your domain in `index.html`, `robots.txt` and `sitemap.xml`, and change `/portfolio/` to `/` in `404.html`.

## 4. Connect your custom domain

1. Still in **Settings → Pages**, find **Custom domain**.
2. Type your domain, e.g. `yourdomain.com` (or `www.yourdomain.com` if you prefer the www version), and click **Save**.
3. GitHub will show *"DNS check in progress"*. That's expected until you finish step 5.

**Recommended (security):** verify the domain so nobody else can claim it on GitHub. Click your **profile picture → Settings → Pages → Add a domain** and follow the instructions (it gives you one extra TXT record to add in step 5).

## 5. Configure DNS at your domain registrar

Log in where you bought the domain (GoDaddy, Namecheap, Google/Squarespace Domains, Hostinger, Cloudflare, etc.) and open **DNS settings** / **Manage DNS**.

**First, delete** any existing `A` or `AAAA` records for `@`, and any "parking" or "forwarding" records. They conflict with GitHub.

**Then add these records:**

| Type | Host / Name | Value / Points to | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | Default / 1 hour |
| A | `@` | `185.199.109.153` | Default / 1 hour |
| A | `@` | `185.199.110.153` | Default / 1 hour |
| A | `@` | `185.199.111.153` | Default / 1 hour |
| AAAA | `@` | `2606:50c0:8000::153` | Default |
| AAAA | `@` | `2606:50c0:8001::153` | Default |
| AAAA | `@` | `2606:50c0:8002::153` | Default |
| AAAA | `@` | `2606:50c0:8003::153` | Default |
| CNAME | `www` | `YOUR-USERNAME.github.io` | Default / 1 hour |

Notes:
- `@` means "the domain itself". Some registrars want you to leave the Host field **blank** instead.
- The `CNAME` value is **only** your username plus `.github.io`, *without* `/portfolio`.
- The AAAA rows are optional but recommended (IPv6). Skip them if your registrar doesn't offer AAAA.
- **Cloudflare users:** set each record to **DNS only** (grey cloud), not Proxied, at least until HTTPS is working.
- With these records, both `yourdomain.com` and `www.yourdomain.com` will work; GitHub redirects one to the other automatically.

DNS changes usually take **10–60 minutes** and occasionally up to **24–48 hours**.

## 6. Turn on HTTPS (the padlock)

1. Go back to **Settings → Pages**.
2. When the DNS check shows a green ✅ *"DNS check successful"*, tick **Enforce HTTPS**.
3. If the box is greyed out, GitHub is still issuing your free certificate. Wait up to about an hour (sometimes up to 24h) and come back.
   - Still stuck after a day? Remove the custom domain, click Save, add it again and Save. This re-triggers the certificate.

## 7. Check the live website

Open each of these and confirm they load:

- [ ] `https://yourdomain.com`: the site loads with a padlock 🔒
- [ ] `https://www.yourdomain.com`: redirects to your site
- [ ] `http://yourdomain.com` (no "s"): redirects to `https://`
- [ ] On your phone: the menu opens, buttons work, nothing is cut off
- [ ] Click **Let's talk**: your email app opens with **your** email
- [ ] Click **LinkedIn**: opens **your** profile
- [ ] `https://yourdomain.com/anything-random`: shows the branded 404 page
- [ ] `https://yourdomain.com/robots.txt` and `/sitemap.xml` open
- [ ] Paste your URL into <https://www.linkedin.com/post-inspector/> to check the link preview image

**Optional, for Google:** add your site in [Google Search Console](https://search.google.com/search-console), verify it (the *Domain* option uses a DNS TXT record), then submit `https://yourdomain.com/sitemap.xml` under **Sitemaps**.

## Making changes later

Edit a file on GitHub (open it → ✏️ pencil → change → **Commit changes**). The live site updates automatically within 1–2 minutes. If you don't see it, hard-refresh with **Ctrl+Shift+R** / **Cmd+Shift+R**.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| 404 "There isn't a GitHub Pages site here" | Check that `index.html` is at the top level of the repo (not inside a folder) and that Pages is set to `main` / `(root)`. |
| Site shows but has no styling | Make sure `style.css`, `script.js` and the `assets` folder were uploaded next to `index.html`. |
| github.io address redirects to a domain you don't own | A `CNAME` file exists with the wrong domain. Delete it, or fix it in Settings → Pages → Custom domain. |
| "Domain's DNS record could not be retrieved" | DNS hasn't spread yet. Wait, and double-check the records in step 5. |
| Enforce HTTPS is greyed out | The certificate is still being issued. See step 6. |
