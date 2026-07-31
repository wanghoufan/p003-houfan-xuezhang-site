# Project rules

## Positioning
- This is 后翻学长's public personal showcase, not a job-seeking résumé.
- Preserve factual wording. Never invent projects, credentials, contact details, or personal photos.

## Run and verify
- Requires Node.js >=22.13.0.
- Local development: `npm run dev`.
- Before any release: `npm test`.

## Stack
- React 19, TypeScript, Next.js-compatible routing, vinext/Vite, Cloudflare Workers.
- Hosting is OpenAI Sites; the existing project is linked in `.openai/hosting.json`.

## Source of truth
- Personal, experience, interest, topic, and project content: `app/content.ts`.
- Contact UI and links: `app/ContactPanel.tsx`.
- Runtime photos: `public/photos/*.webp`.
- Project media: `public/projects/`.
- Photo replacement guidance: `照片替换说明.md`.

## Conventions
- Reuse the existing Sites `project_id`; never create a second site for this workspace.
- Keep the site Chinese-only unless the user explicitly changes that decision.
- Preserve semantic headings, keyboard access, focus states, alt text, reduced motion, and responsive behavior.
- Keep the portrait eager/high-priority and non-hero interest images lazy-loaded.
- Do not delete or move personal source photos without explicit user approval.
- Do not expose fake or empty contact links.

## Current status
- Public home page and `/projects/cny-us-rate-board` are live.
- WeChat QR, GitHub, and YouTube contact paths are implemented.
- The next release should reuse the same public URL and pass `npm test`.
