# Money Prophet web

Standalone React/Vite app extracted from paulworks.online, including the current Quiet workspace UI, expense entry, reports, spending plans, map, settings, and authentication.

## Run locally

Use Node 24.15 or later. Run `npm ci`, then `npm run dev`. The app runs at http://localhost:3001. Start the Rails API separately at http://localhost:3000. Copy `.env.example` to `.env.development` and configure a Google Maps browser key if you use the map. Keep keys out of Git. The portfolio can run separately on port 3002.

`/` is the public landing page; `/sign_in` opens Google sign-in. `npm run build` writes `build/`; `npm run preview` serves the production build locally.

## Subdomain migration

1. Create a remote repository and push this folder. No remote or production deployment is configured here.
2. Configure the production build environment: `VITE_API_ROOT` is the API origin without `/api/v1`; optionally set `VITE_GOOGLE_MAPS_KEY` and a dedicated `VITE_GTM_CONTAINER_ID`. Vite variables are public browser configuration, never server secrets.
3. Deploy `build/` to the chosen subdomain with HTTPS. Serve the generated `/index.html` for the landing page and `/sign_in/index.html` for sign-in. Configure SPA fallback to `/app.html` for workspace and unknown routes; serve `/privacy.html` and static assets directly.
4. Register `https://moneyprophet.paulworks.online/sign_in` in the Google OAuth client. Update the API's `config/initializers/constants.rb` `GOOGLE_REDIRECT_URI` to exactly that URL (currently production uses `https://paulworks.net/sign_in`). Local development expects `http://localhost:3001/sign_in`. Restart the API after changing it.
5. Configure API CORS for the frontend origin. The current API permits all origins; review its allowlist before production. Restrict the Maps key to the new origin.
6. Set `VITE_MONEY_PROPHET_URL=https://moneyprophet.paulworks.online` when building the portfolio. Its former app routes forward to this origin while keeping paths and query parameters.
7. Check sign-in/callback, logout, expenses, budgets, fixed bills, currency settings, map and privacy policy on the deployed host. Sessions stored under the old domain will not transfer; users sign in again.

The original portfolio source is retained for recovery. The new app contains no portfolio Home or Blog pages and has no dependency on the old checkout. No hosting, DNS, OAuth-console, or API production settings have been changed.

## Search and sharing

Build pre-renders the landing page into HTML. Titles, descriptions, canonical URL, Open Graph/Twitter tags, WebSite structured data, sitemap, and robots file use `https://moneyprophet.paulworks.online`. The generated `app.html` and sign-in HTML carry `noindex`; serve `app.html` for private routes instead of the landing HTML. Private data remains protected by authentication, not robots rules. Register the sitemap in Search Console after deployment. Real Google OAuth and search indexing require the production host setup.
