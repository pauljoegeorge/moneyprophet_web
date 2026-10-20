# Coding guidelines

Read before implementation. These are everyday implementation rules; read only the additional guides required by the task conditions in [AGENTS.md](../AGENTS.md). Preserve unrelated work and follow existing conventions where sound.

## Code style and boundaries

- Follow the source-size rule in [AGENTS.md](../AGENTS.md). `npm run check:file-size` audits all tracked and untracked source files; lint and build enforce it automatically.
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
