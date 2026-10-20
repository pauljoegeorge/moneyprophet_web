# Financial rules and quota feedback

Read before changing amounts, currencies, budgets, recurring bills, reports, dates, entitlements, quotas, or their messages.

## Money and time

- Use `src/utils/currency.js` for actual account amounts; do not hard-code currency symbols or assume every currency has two decimal places. Explicitly labeled marketing sample data may use a fixed currency.
- API numeric fields may arrive as strings. Normalize before calculations, distinguish missing data from valid zero, and guard against NaN, Infinity, and division by zero. Do not truncate valid amounts with `parseInt` in new financial calculations.
- Remaining monthly category budget = sum of category budgets − sum of category spending. Fixed bills are separate planned commitments; overall monthly spending includes them.
- Prefer server-provided quota/report values where available. Check serializer semantics before mixing recurring expenses, category spending, budgets, and total spending.
- Category budget progress is green below 80%, orange from 80% through 100%, and red above 100%. Use semantic theme tokens; keep exact amounts or labels so color is not the only signal.
- Expense-by-category charts omit a row only if both budget and actual spending are zero. Keep spending with zero budget visible. Keep comparisons truthful; do not silently cap or exclude outliers.
- Reuse date helpers and reporting-period logic. Treat date-only strings as calendar dates; avoid unintended UTC conversions. Verify current/past/future months, month boundaries, and empty reports.

## Server ownership and quota feedback

- The API owns plan rules, quota checks, reset times, limit messages, and available next actions. Clients render returned messages/actions; never duplicate quota arithmetic, plan defaults, or policy wording.
- Keep notices brief and actionable: state what happened, then the next valid step. Never suggest manual entry when the total daily quota is exhausted, or immediate retry for a quota that resets later.
- When a successful write exhausts a quota, return and render a server notice immediately; do not wait for the next failed attempt.

Render optional success notices and failure responses from the API. Keep messages to one or two short sentences.

## API policy and storage changes

For monetary storage or API calculation changes, read the API [money guidance](../../money_prophet/docs/money.md). For entitlement or expense/category creation changes, read the API [plan guidance](../../money_prophet/docs/plan-limits.md). Check affected clients before changing contracts; do not create client-side policy defaults.
