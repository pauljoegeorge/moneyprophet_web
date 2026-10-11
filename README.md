# Money Prophet web

A calm workspace for personal finances: track expenses, plan monthly category budgets and fixed bills, and see what is left to spend.

**Website:** [expense.paulworks.net](https://expense.paulworks.net/) · **[Deployment guide](docs/deployment.md)**

## Features

- Public landing page and Google sign-in.
- New-account onboarding: currency, editable starter budgets, and optional recurring bills. Choices survive reloads in the same tab; completion is saved by the API.
- Overview month navigation starts at the account signup month, including direct URL links.
- Overview with daily/weekly spending, remaining category budget, quotas, and detailed reports.
- Expense entry by category or plain text; quick text entry from Overview.
- Expense history with browse/edit modes, search, sorting, and CSV export.
- Monthly category budgets and fixed bill planning with category icons.
- Location-aware expense map, currency preferences, and amount visibility controls.
- Quiet workspace design with responsive layouts and light/dark workspace themes.

Remaining category budget excludes fixed bills; the overall monthly spending total includes them. Location is included when browser permission is granted, and entries can still be saved without it.

## Quick start

Requirements: **Node.js 24.15+**, npm, and a running Money Prophet Rails API. The frontend does not start or host the API.

```bash
npm ci
cp .env.example .env.development.local
npm run dev
```

Open [localhost:3001](http://localhost:3001/). Start the API separately on `http://localhost:3000`. Port 3001 is fixed to match the local Google OAuth callback; stop another app using that port first.

## Configuration

| Variable                | Purpose                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `VITE_API_ROOT`         | API origin, such as `http://localhost:3000`, without `/api/v1` or a trailing slash. |
| `VITE_GOOGLE_MAPS_KEY`  | Optional browser Maps key for the map. Restrict it to allowed website origins.      |
| `VITE_GTM_CONTAINER_ID` | Optional Google Tag Manager container. Analytics initializes only when configured.  |

Use `.env.development.local` locally and `.env.production.local` for production. These files are ignored by Git. Restart Vite after configuration changes; rebuild to change production values.

**All `VITE_` values are embedded in browser code. Never put OAuth client secrets, server API keys, or credentials here.** Google OAuth client credentials belong on the Rails server.

## Commands

| Command           | Action                                                                              |
| ----------------- | ----------------------------------------------------------------------------------- |
| `npm run dev`     | Start the local Vite server on port 3001.                                           |
| `npm run lint`    | Run ESLint over JavaScript and JSX source.                                          |
| `npm run build`   | Build into `build/`, pre-render the landing page, and generate private HTML shells. |
| `npm run preview` | Preview the production build locally.                                               |

`start` is an alias for the development server. Despite its name, `start:prod` also starts Vite development mode; use the static build for deployment. There is currently no configured automated test command. Validate affected browser flows as well as lint and build.

## Project structure

```text
src/
  marketing/       Landing page, public styles, route metadata
  pages/           Route definitions and page wrappers
  containers/      Feature screens and API hooks
  components/      Shared controls, forms, icons, planning UI
  contexts/        Theme state
  utils/           API client, authentication, currency, dates, location
scripts/
  prerender.mjs    Generates landing HTML and noindex app shells
public/            Icons, social preview, privacy policy, sitemap, robots
```

React 19 and Vite power the app. UI uses MUI, Tailwind, styled-components, and Lucide; forms use React Final Form, charts use Recharts, and maps use Leaflet.

The Axios client calls `/api/v1/`, adds the saved bearer token, and handles token refresh. Private routes require a saved session; the API must enforce authorization independently. Google redirects to `/sign_in`, then the frontend exchanges the code through the API.

## Routes

| Route                        | Page                                     |
| ---------------------------- | ---------------------------------------- |
| `/`                          | Public landing page                      |
| `/sign_in`                   | Google sign-in and callback              |
| `/dashboard`                 | Overview                                 |
| `/expenses`                  | Expense history                          |
| `/new`, `/chat` | Manual and text entry          |
| `/budget`, `/r_expenses`     | Monthly category budgets and fixed bills |
| `/map`, `/settings`          | Expense map and preferences              |
| `/privacy.html`              | Static privacy policy                    |

Legacy report and planning routes are retained, including insights and forecasts; some are not shown in navigation.

## Deployment and SEO

Deploy the **contents of `build/`** to private S3 behind CloudFront, with Route 53 pointing the subdomain to the distribution. Follow the [deployment guide](docs/deployment.md) for certificate reuse, OAC, route rewriting, Google OAuth, and troubleshooting.

The landing page is pre-rendered into `index.html` for visitors and crawlers. Sign-in and workspace shells carry `noindex`. The build includes canonical URLs, Open Graph/Twitter metadata, WebSite structured data, a sitemap, and app icons. SEO URLs target the public website; keep them synchronized if the website domain changes.

## Related projects

- `../money_prophet`: Rails API, OAuth credentials, and financial calculations.
- `../money_prophet_mobile`: iOS app, also referred to as `money_prophet_ios`.
- `../paulworks.online`: Portfolio; former Money Prophet routes forward to this app.

This app was extracted from the portfolio and runs independently. Deploy the new app before publishing portfolio forwarding routes. Browser sessions under the old domain do not transfer; users sign in again.

For coding conventions, read [AGENTS.md](AGENTS.md).

## Public repository hygiene

Keep infrastructure identifiers and credentials out of tracked files: use placeholders for bucket names, AWS account IDs, distribution IDs, ARNs, private endpoints, and local deployment profiles. Configure actual values in ignored environment files, private deployment configuration, or CI secrets. Public website URLs and generic service setup instructions may remain public. Never upload `.env` files, production build output, logs, or personal financial data to the repository.

## Deploy with one command

One-time setup:

```bash
cp .deploy.env.example .deploy.env
chmod 600 .deploy.env
```

Fill in `S3_BUCKET` and `CLOUDFRONT_DISTRIBUTION_ID` in `.deploy.env`, plus optional `AWS_PROFILE`. Actual values stay in this ignored file. Configure AWS credentials separately using your usual AWS CLI login/profile. Production Vite configuration belongs in `.env.production.local`.

Run from the repository:

```bash
sh deploy.sh
```

The script builds, checks the generated HTML, uploads to S3, invalidates all CloudFront paths, and waits for invalidation completion. It stops on failure and retains older hashed assets for open clients. Requires installed npm dependencies and AWS CLI permissions to upload to the bucket and create/read invalidations. Existing bucket, CloudFront, DNS, and OAuth setup must already be configured; see the [deployment guide](docs/deployment.md).
