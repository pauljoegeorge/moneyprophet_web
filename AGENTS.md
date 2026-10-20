# Money Prophet web — agent instructions

Current standalone React/Vite web app; this repository is public. API: `../money_prophet`. iOS: `../money_prophet_mobile`. Portfolio: `../paulworks.online`. Read the owning repository's instructions before editing it.

## Essential rules

- Design solutions for production use: secure defaults, data integrity, predictable failure recovery, observability, and scalability appropriate to expected workloads. Evaluate performance, concurrency, compatibility, and operational cost where relevant. State material assumptions and tradeoffs. Avoid demo-only shortcuts and unnecessary complexity; verify critical behavior before claiming readiness.
- Keep changes focused and preserve unrelated work. Reuse existing components, API/auth clients, and currency/date helpers.
- Source files: target 150 lines, hard maximum 200, including comments and blank lines. Audit all authored source files; no legacy exemption. Exclude generated files and dependency lockfiles. Split by responsibility; never compress code, remove useful formatting/comments, or use arbitrary numbered chunks to evade the limit.
- The API owns plan rules, quotas, messages, and recovery actions. Check Rails contracts before changing payloads or financial assumptions.
- Never expose secrets, session data, personal financial data, or private infrastructure identifiers. All `VITE_` values are public.
- Keep `/sign_in` as the OAuth callback. Preserve the pre-rendered landing page and noindex private shells.
- Before finishing code changes: run `npm run check:file-size`, relevant lint, and `npm run build`; verify affected browser flows, keyboard access, narrow layouts, and themes. Report checks and limitations honestly. Documentation-only changes need formatting/link checks.

## Required reading

- Before implementation: [coding guidelines](docs/coding-guidelines.md).
- Before selecting checks or finishing any task: [verification](docs/verification.md).
- For amounts, budgets, reports, dates, entitlements, or quotas: [financial rules](docs/financial-rules.md).
- For pages, components, forms, interactions, styles, or themes: [UI and accessibility](docs/ui-accessibility.md).
- For API calls/contracts, authentication, sessions, permissions, personal data, or configuration: [security and authentication](docs/security-auth.md).
- For landing pages, marketing copy, SEO, public routes, prerendering, or build output: [public pages and production output](docs/public-pages.md).
- For module boundaries, file moves, or cross-repository work: [architecture and project map](docs/architecture.md).
- For hosting, OAuth, or CloudFront configuration: [deployment guide](docs/deployment.md).
- For setup or commands: [README](README.md).

Read every guide whose condition matches the task; a task can require several. Links are reading instructions, not automatic includes. Keep this file concise and put each detailed rule in its owning guide; avoid duplicating policy across guides.
