# Public pages, routing, and production output

Read before changing the landing page, marketing copy, SEO metadata, public routes, prerendering, or build output.

- Landing copy must describe supported behavior. Do not invent testimonials, ratings, encryption guarantees, paid-plan availability, or feature claims.
- Keep meaningful headings, descriptive links, canonical metadata, sharing assets, sitemap, and robots configuration consistent with the production domain.
- The landing component must render without browser-only APIs during build-time pre-rendering. Keep document/location/storage work in client effects or client-only paths.
- `npm run build` must produce readable landing HTML in `build/index.html`, `build/sign_in/index.html`, and a noindex `build/app.html` workspace shell.
- Keep the CloudFront rewrite function in the deployment documentation synchronized with route changes. Private shells use noindex; authentication protects private data.
- Update documentation when commands, environment variables, routes, or hosting assumptions change. Never edit generated build output as the permanent fix.

For hosting, OAuth, or CloudFront configuration changes, also read the [deployment guide](deployment.md).
