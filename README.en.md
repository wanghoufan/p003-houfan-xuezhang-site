[简体中文](./README.md) | English

# Houfan Xuezhang — Personal Site

A non-job-hunting personal showcase site that presents personal background, AI and programming projects, interests, research topics, and contact details in a magazine-style narrative.

![Houfan Xuezhang personal site homepage](public/og.png)

- Live URLs (both serve identical content):
  - Vercel (primary): https://houfan-xuezhang-site.vercel.app
  - GitHub Pages: https://wanghoufan.github.io/p003-houfan-xuezhang-site/
- 8 published projects, 1 service card, Chinese-language interface
- Fully static — no database, no login, no comments, no admin panel

## What the site does

- **Three switchable themes**: Operations Deck (dark), Aurora Glass (light frosted glass), and Editorial Dossier (beige newspaper). Your choice is remembered in the browser and restored on the next visit.
- **Filter projects by form**: chips for Web App and Desktop Tool, each showing its count. All 8 projects are visible at once.
- **Two exits per project**: open the finished product directly (desktop tools link to the download instead), or view the GitHub source repository.
- **Project detail pages**: every project has its own record of background, challenge, approach, and outcome.
- **Contact channels**: WeChat QR code, GitHub, YouTube.

## Quick Start (run locally)

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Then open http://localhost:3000 .

Before committing or publishing:

```bash
npm test
```

This runs a production build first, then validates homepage content, project detail pages, image loading strategy, and key links — 7 assertions in total. To check code style:

```bash
npm run lint
```

## Where to change what

| What you want to change | File or directory |
| --- | --- |
| Profile, background, interests, topics, projects, services | `app/content.ts` |
| Contact panel and WeChat QR interaction | `app/ContactPanel.tsx` |
| Homepage structure | `app/page.tsx` |
| Project cards and category filter | `app/ProjectGallery.tsx` |
| Project detail page | `app/projects/[slug]/page.tsx` |
| Theme switcher | `app/ThemeToggle.tsx` |
| All visual styles (including the three themes) | `app/globals.css` |
| Profile and interest photos | `public/photos/` |
| Project cover images | `public/projects/` |
| High-resolution photo backups (not published) | `assets/photo-originals/` |

`app/content.ts` is the single source of truth for content. A project only appears on the site when its `status` is `"published"`.

See [照片替换说明.md](./照片替换说明.md) for the photo replacement steps. The site loads WebP images from `public/photos/`; high-resolution JPG and PNG originals stay in `assets/photo-originals/` and never reach the public site.

### Adding a project

Append an entry to the `projects` array in `app/content.ts`, filling in `slug`, `title`, `category`, `summary`, `background`, `challenge`, `solution`, `outcome`, and the other fields, and set `status` to `"published"`. To make it clickable straight from the card, provide `siteUrl` (a deployed website) or `releaseUrl` (the GitHub Release download page), plus `repoUrl` (the GitHub repository).

## Content rules

- This site is a personal calling card. It does not use job-seeking or résumé-style language, and lists no fictional projects.
- Experiences such as "studying for" or "getting started with" are described as they are, never upgraded to "certified" or "proficient".
- Only genuinely reachable contact channels are listed.
- Project links are never invented: without a deployed site, `siteUrl` is left out and the card falls back to the download or repository entry.

## Publishing

The source lives on GitHub only. Both Vercel and GitHub Pages build automatically from the `main` branch. The build output is plain static files written to `out/`.

1. Make your content or image changes locally.
2. Run `npm test`.
3. Commit and push to `main`.

```bash
git add .
git commit -m "update content"
git push
```

The only difference between the two channels is the path prefix: Vercel serves from the root, while GitHub Pages uses the `/p003-houfan-xuezhang-site` subpath because this repository is a project page. There is no need to log into any hosting dashboard or to create a new site.

## Technical notes

- React 19 + TypeScript
- Next.js 16.2.6 (App Router) + Turbopack
- Tailwind v4
- `output: "export"` static export, output in `out/`
- Hosting: Vercel (primary) + GitHub Pages, triggered by pushes to `main`

The site has exactly three routes: the homepage `/`, project detail pages `/projects/[slug]/`, and the 404 page.

The repository still carries files from the Cloudflare Workers / OpenAI Sites era (`worker/`, `build/`, `db/`, `drizzle/`, `examples/`, `vite.config.ts`, `.openai/`). They take no part in the build and are not referenced by any page; they exist only as a rollback reserve, and all of them except `.openai/hosting.json` are no longer version-tracked.
