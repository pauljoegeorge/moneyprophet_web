# Money Prophet web — agent instructions

## Scope and reading order

`money_prophet_web` is the new, current web repository for Money Prophet. This is the standalone React/Vite Money Prophet web app. This repository is intended to be public.

Read [README.md](README.md) for setup, [coding guidelines](docs/coding-guidelines.md) before implementation, and [deployment guide](docs/deployment.md) for hosting or authentication changes. `CLAUDE.md` points here so both assistants follow the same guidance.

Related repositories: `../money_prophet` is the Rails API; `../money_prophet_mobile` is the iOS app (also called `money_prophet_ios`); `../paulworks.online` is the portfolio. Read each repository's instructions before editing it. Keep web work here; do not import code from the portfolio checkout.

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

## Essential rules

- Keep changes focused; preserve existing user changes and working features. Avoid unrelated cleanup, dependency updates, and framework migrations.
- Follow the Quiet workspace design and reuse shared components and CSS tokens. Center focused pages at 880px and reports/maps at 1250px.
- Reuse the API client, auth helpers, currency/date helpers, and existing API contracts. Inspect Rails serializers/controllers before changing financial assumptions or payloads.
- Remaining category budget is category budgets minus category spending. Overall monthly spending includes fixed bills. Do not subtract fixed bills twice.
- Include location when permission is granted; denial must not prevent expense entry. Preserve drafts and provide clear loading, error, retry, and success states.
- Never commit secrets or print session tokens, OAuth codes, receipts, or personal financial data. All `VITE_` variables are public browser configuration.
- Keep documentation and deployment examples generic: do not disclose real bucket names, AWS account IDs, distribution IDs, ARNs, private endpoints, or deployment profiles. Use placeholders and keep actual infrastructure configuration private.
- Keep `/sign_in` as the OAuth callback. Preserve the pre-rendered landing page, noindex private shells, and CloudFront route rewriting when changing routing or builds.
- For code changes, run relevant lint and `npm run build`; verify affected browser flows, narrow layouts, keyboard access, and theme behavior. Report failures and limits honestly. Documentation-only changes need formatting/link checks, not an app rebuild.

Detailed conventions and domain rules: [docs/coding-guidelines.md](docs/coding-guidelines.md).

## Product quality and server ownership

- The API owns plan rules, quota checks, reset times, limit messages, and available next actions. Clients render returned messages/actions; never duplicate quota arithmetic, plan defaults, or policy wording.
- Keep notices brief and actionable: state what happened, then the next valid step. Never suggest manual entry when the total daily quota is exhausted, or immediate retry for a quota that resets later.
- When a successful write exhausts a quota, return and render a server notice immediately; do not wait for the next failed attempt.
- Design frequent actions for repeat use. Keep the primary flow compact; put examples, instructions, and shortcuts in accessible optional help rather than repeating them every time.
- Before claiming a flow works, trace all entry points and verify success, quota boundaries, failure, draft retention, recovery actions, keyboard access, and narrow layouts. Distinguish executed checks from unverified behavior; build/lint success does not verify a user flow.
