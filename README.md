# The Sandwich Carer — landing page

Eleventy static site: one landing page plus a back catalogue of posts. No backend.
Deploys to GitHub Pages on every push to `main` (`.github/workflows/deploy.yml`).

Live demo: https://djvp.github.io/sandwich-carer/

## Run it

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # writes _site/
```

## Add a post

One file per post in `src/posts/`, named `YYYY-MM-DD-short-name.md`. The landing page shows the
four newest; `/posts/` lists them all, filterable by topic. Front matter only, no body:

```yaml
---
title: Short name for the archive
date: 2026-10-21
category: disability        # disability | ageing | mental-health
type: tip                   # breakdown | translation | howto | hottake | tip | realtalk
headline: The big line on the tile.
text: The smaller line under it.
url: "https://instagram.com/p/..."   # the original post; empty = preview note
---
```

Fields by `type`:

| type | fields |
|---|---|
| `breakdown` | `subtitle`, `issue`, `lights` (list of `level: useful/watch/buried` + `text`) |
| `translation` | `jargon`, `meaning` |
| `howto` | `headline`, `text`, `issue` |
| `hottake` | `quote` |
| `tip`, `realtalk` | `headline`, `text` |

Every post in `src/posts/` is marked SAMPLE (set in `src/posts/posts.11tydata.json`). Set
`"sample": false` there once the posts are real.

## Wire up the real links

Everything that isn't built yet is a facade: the click shows a "Preview" note instead of a dead link.

- `src/_data/site.json` → `links.shop`, `links.facebook`, `links.instagram`. Set `"preview": false`
  to remove the PREVIEW pill in the nav.
- `src/_data/guides.json` → per-guide Shopify product `url` (overrides the store link). Set
  `samplePrice: false` once prices are real.
- Each post's `url` → the original Facebook/Instagram post.

## Where things live

- `src/index.njk` — the landing page; `src/posts.njk` — the back catalogue
- `src/_includes/partials/` — header, footer, post card, Sam (`sam-hero.njk` animated, `sam-defs.njk` static moods)
- `src/_data/` — site links, topics (`categories.json`), post type labels, guides, the hero's "what you'll find" list
- `src/assets/css/site.css` — design tokens and all styles
- `src/assets/js/site.js` — preview notes, Sam's moves, topic filter

Design source: `Main.dc.html` (core design canvas). Sam's geometry is the v1 core design.
