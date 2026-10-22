# Web architecture and repository ownership

Read this before changing module boundaries, moving files, or working across repositories. Read `../README.md` for setup and routes.

## Repository ownership

`money_prophet_web` is the current standalone React/Vite web app and is intended to be public. Its sibling repositories are:

- `../money_prophet`: Rails API, serializers, financial calculations, and plan policy.
- `../money_prophet_mobile`: iOS app, also called `money_prophet_ios`.
- `../paulworks.online`: portfolio and blog; former Money Prophet URLs only redirect.

Paths above are relative to the repository root. Work in the repository that owns the change and read its local `AGENTS.md` before editing it. Keep web work here; do not import code from the portfolio checkout. `CLAUDE.md` points to the root `AGENTS.md` so both assistants share the same guidance.

## Project map

- `src/marketing/`: public landing page, marketing styles, route metadata.
- `src/pages/`: page wrappers and route declarations; `src/routes.jsx` assembles them.
- `src/containers/`: feature screens and feature-local API hooks.
- `src/containers/Layout/`: authenticated shell and shared workspace styles.
- `src/components/`: reusable forms, category controls, planning UI, and primitives.
- `src/contexts/`, `src/utils/`, `src/lib/`: shared state, API/auth/currency/date/location helpers, class utilities.
- `public/`: static privacy policy, icons, social image, sitemap, and robots file.
- `scripts/prerender.mjs`: production landing HTML and noindex app shells.
- `docs/`: detailed guidance. `build/` and `node_modules/` are generated; do not edit them as source.

## Layout and module boundaries

Follow the Quiet workspace design and reuse existing shared components and CSS tokens. Center focused pages at 880px and reports at 1250px.

Keep page wrappers and feature entry points small. Put feature-local components, hooks, and helpers in focused subfolders. Use shared components only when the responsibility is shared across features. Workspace and marketing CSS entry files import focused style modules in cascade order.
