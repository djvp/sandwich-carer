# The Sandwich Carer — landing page

Eleventy static site. One page, no backend. Hosts free on Cloudflare Pages.

## Run it

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # writes _site/
```

## Wire up the real links

Everything that isn't built yet is a facade. Fill in `src/_data/site.json`:

```json
"links": {
  "substack":  "https://thesandwichcarer.substack.com",
  "shop":      "https://<store>.myshopify.com",
  "facebook":  "https://facebook.com/...",
  "instagram": "https://instagram.com/..."
}
```

- Empty string = not set up yet; the click shows a "Preview" note instead of a dead link.
- Set `"preview": false` to remove the PREVIEW pill in the nav.
- Per-guide Shopify product URLs go in `src/_data/guides.json` (`url`), which override the store link. Set `samplePrice: false` once prices are real.

## Deploy to Cloudflare Pages

Connect the repo in Cloudflare → Workers & Pages → Create → Pages → Connect to Git.

| Setting | Value |
|---|---|
| Framework preset | Eleventy |
| Build command | `npx @11ty/eleventy` |
| Build output directory | `_site` |
| Node version | `22` (set `NODE_VERSION` env var) |

Every push to `main` redeploys. Custom domain is added under the project's *Custom domains* tab.

## Where things live

- `src/_includes/partials/page.njk` — the page itself (nav, hero, sections, footer)
- `src/_includes/partials/sam-defs.njk` — Sam's SVG (three moods) and the guide-cover illustration
- `src/assets/css/site.css` — design system tokens and all styles
- `src/assets/js/site.js` — link facade, subscribe form, Sam's eyes
- `src/_data/` — site links, guides, pillars
- `src/artifact.njk` — a bare-body build of the same page for sharing as a Claude artifact (ignore for deploy)

Design source of truth: `Main.dc.html` (the core design canvas).
