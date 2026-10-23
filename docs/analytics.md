# Website engagement analytics

The web app uses GTM to deliver GA4 events after explicit opt-in. The iPhone app
and API server do not send these analytics. No container is loaded when the
build-time `VITE_GTM_CONTAINER_ID` is missing or invalid. Set it to your public
`GTM-EXAMPLE` container ID in private build configuration and rebuild.

## Required GTM and GA4 setup

Loading GTM does not configure GA4 automatically. Configure and publish the
container separately; application code cannot verify the remote container.

1. Create a GA4 web stream. In GTM add a Google tag with its measurement ID.
   Disable automatic page views (`send_page_view: false`). Fire this tag on
   Initialization; the application loads GTM only after permission.
2. Set `page_location` to a GTM Custom JavaScript variable returning
   `location.origin + '/other'`, `page_referrer` to an empty constant, and
   `page_title` to the constant `Money Prophet` on the Google tag. This prevents
   initialization/session events from using raw URLs or document titles.
   Set `allow_google_signals` and `allow_ad_personalization_signals` to false.
3. Create version-2 Data Layer Variables for `mp_event_name`, `page_location`,
   `page_referrer`, and `page_title`.
4. Create a Custom Event trigger matching exactly `mp_engagement`. Add a GA4
   Event tag with event name `{{DLV - mp_event_name}}`, the same Google tag,
   and event parameters `page_location`, `page_referrer`, `page_title` using
   their corresponding Data Layer Variables. Do not forward arbitrary data.
   Require `analytics_storage` permission for analytics tags.
5. In the GA4 web stream, disable Enhanced Measurement (including history-based
   page views, outbound clicks, search, downloads, and form interactions).
   Our explicit events avoid duplicate views and accidental form/URL capture.
   Remove competing All Pages, History Change, click/form and old GA tags.
   Do not enable user-provided data, User-ID, advertising features, or DOM scraping.
6. Review GA4 retention settings and access. Publish only after Preview testing.

Consent defaults allow analytics storage only after opt-in and deny all three
advertising consent types. Declining sends no analytics, including cookieless
pings. Withdrawal reloads the page to stop running tags and removes accessible
first-party GA cookies. Other tabs reload on withdrawal. Consent is local to the
browser. Analytics preferences remains available at the bottom of app pages;
static legal pages link back to the app.

## Events and interpretation

| Event                             | Trigger                                                  |
| --------------------------------- | -------------------------------------------------------- |
| `page_view`                       | Initial allowed route and subsequent pathname navigation |
| `expense_created`                 | Successful manual entry request                          |
| `quick_expense_created`           | Successful text entry request, including dashboard       |
| `expenses_updated`                | Successful bulk expense update                           |
| `budget_saved`                    | Successful category budget update                        |
| `income_saved`                    | Successful income update                                 |
| `fixed_expenses_saved`            | Successful fixed bill update                             |
| `recurring_expenses_saved`        | Successful recurring bill update                         |
| `unexpected_expenses_saved`       | Successful unexpected budget update                      |
| `onboarding_completed`            | Server confirms setup completion                         |
| `forecast_generated`              | Server returns forecast result                           |
| `expenses_exported`               | Export response received (not proof of file download)    |
| `generate_lead`                   | Contact endpoint returns success (not proof of delivery) |
| `privacy_opened`, `social_opened` | Legacy footer actions where present                      |

Events contain only a predefined action name, allowlisted pathname, origin,
constant title, and empty referrer. Unknown paths become `/other`. No financial
values, categories, text, account IDs, emails, callback codes, query parameters,
or fragments are sent. No pre-consent actions are replayed. Callback URLs do not
initialize tags. Query-only filter changes do not produce page views.

Use GA4 retention and engagement reports for return visits, views per session,
and feature adoption. Build an exploration funnel: onboarding completion →
expense creation → budget save. Compare manual versus quick entry. Consider
onboarding completion as a key event; do not mark every page view as a key event.
These are browser/session measurements, not identified account-level activity.
Ad blockers and declined consent mean totals are incomplete.

## Release verification

In GTM Preview verify no container/network requests before permission or after
Decline. Allow, navigate between dashboard, expenses and budgets, and verify one
page event per navigation. Submit successful and failed writes; only successes
should emit feature events, including retried requests. Test withdrawal, another
open tab, refresh, blocked storage, keyboard operation, and 320px/dark layouts.
Inspect GA4 collection requests for sanitized `dl`, `dr`, and `dt`, particularly
with OAuth query parameters and URLs containing sensitive filter values.
Confirm events in GA4 DebugView/Realtime before publishing. Do not treat a local
build or dataLayer entry as proof that the production GA4 property received data.
