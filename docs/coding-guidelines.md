# Coding guidelines

These rules apply to Money Prophet web. Follow the existing implementation where it is sound; older code may not meet every rule below, so improve the touched path without turning a focused change into a rewrite.

## Code style and boundaries

- Use JavaScript/JSX, ES modules, function components, and hooks. Do not introduce TypeScript or a new state/router/UI framework without a task that calls for it.
- Use PascalCase component names, camelCase variables/functions, and `use...` hook names. Keep API snake_case fields at the contract boundary.
- Keep JSX components in `.jsx`; use `.js` for non-JSX utilities. Existing mixed filenames can remain unless a change requires moving them.
- Follow ESLint and Prettier configuration: double quotes, semicolons, and two-space indentation. Avoid nested ternaries; use named intermediate values for multi-state logic.
- Validate reusable component props with PropTypes, matching the surrounding conventions. Prefer explicit boolean props and meaningful names over ambiguous flags.
- Keep route wrappers light. Put feature composition in `src/containers/<Feature>/`, reusable UI in `src/components/`, and genuinely shared logic in utilities or contexts.
- Extract repeated behavior when it has a clear shared responsibility. Do not create a general abstraction for one small use case.
- Avoid new dependencies if current tools solve the problem. If a dependency is necessary, explain why and update `package-lock.json` with the package manager.
- React Router is v5: use existing `Switch`, `Route`, `Redirect`, and history APIs rather than v6 examples. MUI is v9: use supported `slotProps` for Dialog customization.

## State, effects, and async work

- Derive totals and filtered rows from their source data instead of maintaining duplicate state.
- Keep hook ordering stable; use functional state updates when based on previous values. Honor effect dependencies without disabling rules merely to hide a problem.
- Handle rejected requests and clear pending state in `finally`. Scope errors to the action that failed and offer recovery.
- Prevent stale requests from replacing data after a month or route change. Effects must tolerate StrictMode re-execution.
- Do not trigger financial writes in mount effects. Block duplicate submissions, including rapid clicks and keyboard shortcuts.
- Keep form initial values stable so location updates, request state, or rerenders do not clear drafts. Preserve failed submissions for correction/retry.
- After saves, refresh the relevant month and show success only after the API confirms the write.
- Clean up event listeners, camera streams, object URLs, and other resources. Stop late-arriving camera streams when the component closes or unmounts.

## API and authentication

- Use `src/utils/api.js` for application API calls so base URL, authorization, timeout, and refresh behavior remain consistent. Do not build parallel auth clients inside screens.
- Use `src/utils/auth.js` for session reads/writes and logout. Local route guards are UX; the server must authorize data access and premium entitlements.
- Encode user-supplied query values with `URLSearchParams` or equivalent encoding. Preserve selected month and category filters in navigation.
- Verify request shapes, response types, icons, and error behavior against the Rails API before altering a contract. Keep backward compatibility when other clients depend on it.
- Google callback is `/sign_in`; GCP and the Rails redirect URI must match exactly. Do not exchange or expose the OAuth client secret in frontend code.
- Do not log authorization headers, refresh tokens, callback codes, or request bodies containing personal data. Use mocked data for routine browser verification.

## Money and time

- Use `src/utils/currency.js` for actual account amounts; do not hard-code currency symbols or assume every currency has two decimal places. Explicitly labeled marketing sample data may use a fixed currency.
- API numeric fields may arrive as strings. Normalize before calculations, distinguish missing data from valid zero, and guard against NaN, Infinity, and division by zero. Do not truncate valid amounts with `parseInt` in new financial calculations.
- Remaining monthly category budget = sum of category budgets − sum of category spending. Fixed bills are separate planned commitments; overall monthly spending includes them.
- Prefer server-provided quota/report values where available. Check serializer semantics before mixing recurring expenses, category spending, budgets, and total spending.
- Category budget progress is green below 80%, orange from 80% through 100%, and red above 100%. Use semantic theme tokens; keep exact amounts or labels so color is not the only signal.
- Expense-by-category charts omit a row only if both budget and actual spending are zero. Keep spending with zero budget visible. Keep comparisons truthful; do not silently cap or exclude outliers.
- Reuse date helpers and reporting-period logic. Treat date-only strings as calendar dates; avoid unintended UTC conversions. Verify current/past/future months, month boundaries, and empty reports.

## UI, accessibility, and privacy

- Use `WorkspacePage`, `MonthNavigation`, category controls, `CategoryPlanPage`, `PrivateTotal`, and entry navigation where appropriate. Keep headers and cards aligned within the shared layout.
- Authenticated styles belong under `.money-workspace` in `workspace.css`; public styles belong under `.mp-public` in marketing CSS. Avoid global overrides leaking between landing, login, and workspace.
- Use existing CSS variables for backgrounds, borders, text, chart colors, and semantic states. Preserve the public sage palette and light/dark workspace themes.
- Prefer visible category/icon choices and direct actions over hidden menus for common tasks. Keep browse and edit modes distinct and preserve unsaved edits when switching views.
- Every field needs a label. Use native buttons/links, visible keyboard focus, accessible names on icon controls, and `aria-pressed` for toggles. Decorative icons should be hidden from assistive technology.
- Dialogs need a title, focus management, keyboard dismissal, and focus restoration. Avoid portal placement that loses workspace theme variables or makes controls inaccessible.
- Check 320px/390px phone widths and large screens. Avoid clipped totals, horizontal page scrolling, tiny controls, and oversized gaps on focused pages.
- Loading, empty, failure, and success states are part of a feature. Do not show a misleading zero while financial data is still loading or has failed.
- Respect saved amount-visibility settings. Hidden financial values must not remain exposed in chart labels or tooltips within the area being hidden.
- Use `useExpenseLocation` for location. Denied/unavailable permission must not block saving. Request camera access only after a user action and offer upload recovery.

## Public repository and deployment configuration

- This repository is public. Do not add real infrastructure identifiers to documentation, scripts, workflow examples, or agent instructions: bucket names, account IDs, distribution IDs, ARNs, private endpoints, and personal deployment profiles belong in private configuration or CI secrets.
- Use clearly named placeholders in setup examples. Public website/canonical URLs can remain where the product requires them.
- Keep credentials, local environment files, generated builds, logs, receipts, and customer data out of Git. Check tracked files before suggesting a public push; ignore rules do not remove files already tracked.

## Public pages, SEO, and deployment

- Landing copy must describe supported behavior. Do not invent testimonials, ratings, encryption guarantees, paid-plan availability, or feature claims.
- Keep meaningful headings, descriptive links, canonical metadata, sharing assets, sitemap, and robots configuration consistent with the production domain.
- The landing component must render without browser-only APIs during build-time pre-rendering. Keep document/location/storage work in client effects or client-only paths.
- `npm run build` must produce readable landing HTML in `build/index.html`, `build/sign_in/index.html`, and a noindex `build/app.html` workspace shell.
- Keep the CloudFront rewrite function in the deployment documentation synchronized with route changes. Private shells use noindex; authentication protects private data.
- Update documentation when commands, environment variables, routes, or hosting assumptions change. Never edit generated build output as the permanent fix.

## Verification and completion

- Run ESLint on touched JS/JSX paths and `npm run build` for code changes. Use full `npm run lint` when the change warrants it; distinguish existing issues from introduced failures.
- Verify behavior affected by the change. For forms: success, failure/retry, draft retention, pending/duplicate submits, and payload correctness. For reports: zero values, numeric strings, overspending, month selection, and visibility settings.
- Check keyboard use, narrow layouts, and relevant themes. For SEO/build changes, inspect initial production HTML without JavaScript and verify assets, canonical URLs, and noindex shells.
- There is no configured automated test command today. Do not claim tests ran if only lint/build ran. Add meaningful regression coverage for substantial logic changes when suitable; avoid tests that merely mirror trivial styling.
- Avoid broad formatting churn. Preserve unrelated changes and do not commit, push, deploy, or change cloud resources unless the task authorizes those actions.
- Finish with the concrete changes, checks performed, and any unresolved limitations. Do not describe mocked OAuth checks as proof that production credentials work.
