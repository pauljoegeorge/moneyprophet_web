# Verification and completion

Read before selecting checks and before finishing any task. Verify behavior in proportion to the change; distinguish executed checks from unverified behavior.

- Run ESLint on touched JS/JSX paths and `npm run build` for code changes. Use full `npm run lint` when the change warrants it; distinguish existing issues from introduced failures.
- Verify behavior affected by the change. For forms: success, failure/retry, draft retention, pending/duplicate submits, and payload correctness. For reports: zero values, numeric strings, overspending, month selection, and visibility settings.
- Check keyboard use, narrow layouts, and relevant themes. For SEO/build changes, inspect initial production HTML without JavaScript and verify assets, canonical URLs, and noindex shells.
- Run `npm run test:file-size` when changing the source-size guard. Do not claim application behavior was tested if only lint/build or source-size checks ran. Add meaningful regression coverage for substantial logic changes when suitable; avoid tests that merely mirror trivial styling.
- Avoid broad formatting churn. Preserve unrelated changes and do not commit, push, deploy, or change cloud resources unless the task authorizes those actions.
- Finish with the concrete changes, checks performed, and any unresolved limitations. Do not describe mocked OAuth checks as proof that production credentials work.

- Before claiming a flow works, trace all entry points and verify success, quota boundaries, failure, draft retention, recovery actions, keyboard access, and narrow layouts. Distinguish executed checks from unverified behavior; build/lint success does not verify a user flow.

Documentation-only changes require Markdown formatting, local-link checks, and confirmation that moved rules remain discoverable. An application rebuild is unnecessary when source and build configuration are unchanged.
