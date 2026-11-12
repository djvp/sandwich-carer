# The Sandwich Carer — landing page

Eleventy static site: one landing page, plus All posts (`/posts/`) and All tools (`/tools/`) pages, and
Sam's moods (`/sam/`, not linked from the menu). No backend.
Deploys to GitHub Pages on every push to `main` (`.github/workflows/deploy.yml`).

Live demo: https://djvp.github.io/sandwich-carer/

## Run it

```bash
# needs Node 22
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
sam: chuffed                # optional: which Sam (see /sam/); leave out for the usual one, none to hide him
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

- `src/_data/site.json` → `links.shop`, `links.facebook`, `links.instagram`, `contact` (the email for
  buyers' questions). `links.tiktok` adds TikTok to the header and footer once it's filled in.
  Set `"preview": false` to remove the PREVIEW pill in the nav.
- `src/_data/tools.json` → per-tool store `url` (overrides the store link); `type` is `guide`,
  `checklist`, `template` or `script`. Set `samplePrice: false` once prices are real.
  `featured: true` shows a tool on the home page (keep three); every tool is on `/tools/`.
- Each post's `url` → the original Facebook/Instagram post.

## Where things live

- `src/index.njk` — the landing page; `src/posts.njk` and `src/tools.njk` — the All posts and All tools pages;
  `src/sam.njk` — Sam's moods; `src/guides-moved.njk` forwards the old `/guides/` address to `/tools/`
- `src/_includes/content/about.md` — the About text (plain Markdown, add to it any time)
- `src/_includes/partials/` — header, footer, post card, tool card, Sam (`sam-hero.njk` the animated hero,
  `sam-brand.njk` the live header Sam, `sam-defs.njk` the drawings for every mood)
- `src/_data/` — site links, topics (`categories.json`), post type labels, tools and tool types, Sam's moods
  (`samMoods.json`: names, animations, and the usual Sam for each post type), the hero's "what you'll find" list
- `src/assets/css/site.css` — design tokens and all styles
- `src/assets/js/site.js` — preview notes, Sam's moves, topic filter

Design source: `Main.dc.html` (core design canvas). Sam's geometry is the v1 core design.
