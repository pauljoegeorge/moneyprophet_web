# Search and AI discovery

## Positioning

Start with English-language searches for a personal expense tracker with manual
entry, monthly category budgets, and no bank connection. This is a proposed
positioning based on supported features, not measured keyword demand. Broad terms
such as “expense app” and “budget tracking app” are longer-term targets. Neither
search rankings nor inclusion in AI answers can be guaranteed.

## Implementation and verification

The landing page describes the product in its title, introduction, feature
headings, and expandable answers. The WebSite and WebApplication JSON-LD is
rendered with the landing component, so it appears in initial HTML and is absent
from private shells. Avoid invented reviews, ratings, awards, or availability.

Run `npm run build` followed by `node --test scripts/seo.test.mjs`. The tests check
initial HTML, structured data, local linked assets, and noindex private shells.
Also inspect the rendered page at desktop and phone widths, including keyboard
operation of the answers. Keep metadata in `index.html` and `Seo.jsx` consistent.

## Release and measurement

1. Deploy through the existing approved release process in
   [deployment.md](deployment.md). Inspect live HTML after cache invalidation.
2. In a verified Google Search Console property, inspect the homepage, confirm
   the selected canonical and crawl access, submit `/sitemap.xml`, and request
   indexing. A successful HTTP response does not establish index status.
3. Verify the site in Bing Webmaster Tools and submit the same sitemap. Check
   crawler access at the CDN as well as in robots.txt. Do not block private shells
   in robots.txt merely to hide them: crawlers need to see their noindex directive.
4. Record a baseline of indexed URLs, non-brand queries, impressions, clicks,
   click-through rate, and signups attributable to search where consent permits.
   Review trends after 28 days, separating country and device. No baseline has
   been obtained from owner accounts during this implementation.
5. Track a fixed sample of expense/budget app questions across answer engines,
   recording date, engine, citation, and whether Money Prophet is mentioned.
   Answers vary; a single response is not a stable ranking or market-share metric.

## Next content and authority work

- Publish an original walkthrough of recording expenses without linking a bank,
  using actual product screenshots and clear limitations.
- Publish a monthly category-budget walkthrough with sample data clearly marked
  as illustrative. Explain the actual app workflow rather than generic advice.
- Show real product demonstrations and invite voluntary, honest user feedback.
  Seek relevant independent coverage; do not buy links or manufacture reviews.
- Add accurate creator/support information and maintain product policies. Keep
  platform availability and plan descriptions aligned with the API and releases.
- Measure mobile Core Web Vitals before prioritizing performance changes. The
  current build warns about a large shared JavaScript bundle; investigate loading
  workspace code separately from public content if measurements justify it.

New public routes require prerendering, internal links, metadata, sitemap entries,
and matching CloudFront routing before release. Avoid publishing many near-identical
keyword pages. No special AI text file or schema guarantees recommendations.

## Guidance

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)

The public homepage returned HTTP 200 and its robots.txt allowed crawling during
the October 23, 2026 audit. Search Console coverage, CDN bot-specific behavior,
field performance, and external recommendation visibility remain unverified.
