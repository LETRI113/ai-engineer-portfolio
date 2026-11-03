# AI Engineering Portfolio

A single-page portfolio built with Next.js 14.2.5, React 18, TypeScript, Tailwind CSS, Framer Motion and Lucide icons. The existing dark layout and animations are preserved.

## Featured projects

| Project | Focus | Scope |
| --- | --- | --- |
| Knowledge Wiki AI | Access-aware, graph-enhanced hybrid retrieval | Semantic/full-text search, rank fusion, reranking, version-aware ingestion and streamed answers |
| Document Control AI | Structured contract intelligence | Extraction, summaries, alerts and document comparison |
| Dashboard Query Assistant | Context-bounded analytics chatbot | LangGraph routing, dashboard context budgets and sync/SSE APIs |
| Kworks AI | Prompt orchestration | Phase 1: static, allowlisted knowledge context; retrieval and ingestion are future phases |
| Reporter AI | GitLab review infrastructure | In development: durable intake, dispatch, leases and offline analysis primitives; no end-to-end reviewer or comment publisher yet |

Descriptions reflect inspected implementation, not claims of production deployment, sole authorship or measured performance. Public repository and demo URLs remain absent until approved. Project thumbnails are generated illustrations, not application screenshots.

## Run locally

From this directory:

```bash
npm ci
npm run dev
```

Open the local URL printed by Next.js. No API keys, database or email service are needed for the portfolio itself.

## Docker

Requires Docker with Compose v2. From this directory:

```bash
docker compose up --build --wait
# Open http://localhost:3000
docker compose logs -f portfolio
docker compose down
```

If port 3000 is occupied, run `PORTFOLIO_PORT=3101 docker compose up --build --wait` and open `http://localhost:3101`.

The multi-stage image installs locked dependencies, runs tests and the production build, removes development dependencies, then runs `next start` as the non-root `node` user. Node 22 Debian slim is pinned by digest. There is one service, no database, secret injection or source bind mount. The HTTP healthcheck uses `/`; the published port is restricted to localhost. Rebuild after changing source or assets.

Builds need npm registry and Google Fonts access. `.dockerignore` excludes local dependencies, build output, Git metadata, environment files and common credential files. Existing files in `public/` are included unchanged; review the deployment caveats below before publishing an image or exposing the service publicly. Docker packaging does not upgrade the existing Next.js version.

**Public deployment is blocked pending dependency patches.** On 2026-11-03, `npm audit --omit=dev` reported three vulnerable production packages: Next.js 14.2.5 (critical), PostCSS (high) and `source-map-js` (high). Advisory applicability depends on the enabled features; container hardening does not patch these dependencies. Upgrade and re-audit before public exposure.

## Content and optional profile

Edit `src/data/portfolio.ts`:

- `site`: confirmed name, heading, description, portrait, CV path, public website URL and availability.
- `contact` and `socials`: approved contact details and profile URLs.
- `about`, `skillCategories` and `projects`: project-backed copy and technology lists.
- `education`, `experiences` and `certifications`: verified entries only.

The approved portrait is `public/profile.jpg` and appears in the Hero. Other personal fields remain empty. Until supplied, the UI uses **AI Engineering Portfolio**, hides CV and contact actions, and omits empty experience/certification/contact sections and navigation links. Clearing `site.avatar` hides the portrait and collapses the Hero to one column; About also collapses when there are no statistics.

Set `site.url` only to the actual absolute public website URL. When absent, website metadata is omitted rather than using a sample domain. Author metadata appears only when a name is supplied.

For each project, keep a unique `slug`, title, subtitle, description, three highlights, technology list, thumbnail path and accent (`cyan`, `violet`, `emerald` or `amber`). `status`, `demoUrl` and `repoUrl` are optional. URLs must be plain approved URLs, not Markdown links; missing URLs hide their buttons.

Add approved assets under new filenames in `public/`, then reference paths starting with `/`. Remote portrait hosts require separate Next.js image configuration; local files need no extra configuration.

## Contact behavior

The contact form appears only when `contact.email` is set. It opens a prefilled `mailto:` draft in the visitor's email application. It does **not** send email through a backend or confirm delivery. Social-only, location-only and CV-only contact details do not display the form.

## Validation

```bash
npm test
./node_modules/.bin/tsc --noEmit --incremental false
npm run build
```

The dependency-free Node test script uses the installed TypeScript compiler and React server renderer. It checks the five projects, neutral profile state, metadata, thumbnails, optional section visibility, anchor targets, and populated/social-only profile fixtures. Fonts are stubbed for server-render tests; browser interaction and visual checks are separate. Tests asserting blank personal fields must be updated when confirmed profile data is added.

`npm run lint` is inherited from the template. ESLint is not configured or installed directly, so it is not an unattended validation command yet. Production builds using `next/font/google` need access to Google Fonts.

To generate the five project illustrations:

```bash
node scripts/generate-thumbnails.mjs
```

The generator writes only the five current project filenames; legacy illustrations are not removed.

## Before deployment

- Supply and verify personal details, public links and any claims of ownership or deployment.
- Legacy sample CV, certificate files and four old project illustrations are excluded from this repository by the root `.gitignore`, but remain unchanged in the original local checkout. Local Docker builds still include them because `.gitignore` does not control Docker context; review asset rights and remove or replace them **with explicit approval** before publishing an image. Hiding links does not prevent direct access to files present in `public/`. The current `profile.jpg` is approved for use in the Hero.
- Check mobile navigation, keyboard access, reduced-motion behavior and image loading in a real browser.
- Keep the original MIT copyright notice in `LICENSE`; it credits the template and is not the portfolio owner's profile.
