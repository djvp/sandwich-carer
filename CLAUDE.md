# The Sandwich Carer

Website for The Sandwich Carer: plain-English posts and tools (guides, checklists, templates and
scripts) on disability, ageing and mental health support, written for carers. Owner: Susan
Campbell. Built by Diego (Clintel Systems).

Eleventy static site. A push to `main` deploys to GitHub Pages in about a minute
(`.github/workflows/deploy.yml`). Live: https://djvp.github.io/sandwich-carer/

## Commands

- Needs Node 22. On Diego's Mac `/usr/local/bin/node` is v16 and fails; use
  `/Users/admin/.nvm/versions/node/v22.16.0/bin` first on `PATH`.
- `npm run dev` serves http://localhost:8080 with live reload. `npm run build` writes `_site/`.

## Everyday jobs

Field-by-field details for posts and tools are in `README.md`.

- **Add a post:** one front-matter-only file in `src/posts/`, named `YYYY-MM-DD-short-name.md`.
  `category` is `disability`, `ageing` or `mental-health`. Set `url` to the Facebook or Instagram
  post once it exists. The four newest posts show on the home page automatically.
- **Pick Sam for a post:** add `sam:` with a mood name from `src/_data/samMoods.json` (calm, chuffed,
  talking, side-eye, gobsmacked, over-it), or `none` to leave him off. Without it the post gets the
  usual Sam for its type. The moods are shown at `/sam/`. Side-eye is for jargon and policies, never
  for a post about a person.
- **Add a tool:** one entry in `src/_data/tools.json`. `type` is `guide`, `checklist`, `template` or
  `script`; `url` is the product's store link. `featured: true` puts it on the home page; keep three
  featured, one per topic where possible.
- **Edit the About text:** `src/_includes/content/about.md`, plain Markdown.
- **Real links:** `src/_data/site.json`, including `contact` (buyers' questions) and `links.tiktok`
  (TikTok appears only once it's set). Set `"preview": false` at launch to remove the Preview
  badge, and `"sample": false` in `src/posts/posts.11tydata.json` once the posts are real.

## Before publishing

Run the dev server and show the user the change. Commit and push only after they say yes.

## Accuracy

Every post comes from a source the user gave you. Never invent figures, dates, page numbers,
quotes or eligibility rules. If the source doesn't say it, leave it out and ask. Link or name the
source so a reader can check it.

## Voice

- Plain English: warm, direct, occasionally funny. "Here's what I'd do" over "here are your options".
  Analogies over acronyms. Never make the reader feel uninformed.
- Spell out every acronym the first time it appears. Australian spelling.
- The edge (strikethrough, stamps, Sam's side-eye) lands on jargon, policies and forms, never on a
  person: not a planner, a worker or a family.
- Not legal, financial or medical advice. Say what the source says; don't promise anyone an outcome.

## Post types

| type | label on the tile | what it is |
|---|---|---|
| `breakdown` | What they just said | an update, flagged USEFUL / WATCH / BURIED |
| `translation` | What they said / What it means | one line of jargon, struck out and translated |
| `howto` | How not to stuff this up | step by step through a big moment |
| `hottake` | Hot take | an honest opinion; Sam talks on the tile |
| `tip` | Did you know? | one tip most people miss |
| `realtalk` | Looking after you | self-care, burnout and bureaucracy |

## Ask before changing

The design (colours, fonts, layout, Sam's drawing), the three topics, the post type names and the
word "Tools" were agreed with Susan. Don't change them as a side effect of another job.
