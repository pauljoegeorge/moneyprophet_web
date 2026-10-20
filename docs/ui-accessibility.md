# UI and accessibility

Read before changing pages, components, forms, dialogs, styles, themes, charts, or input interactions.

- Use `WorkspacePage`, `MonthNavigation`, category controls, `CategoryPlanPage`, `PrivateTotal`, and entry navigation where appropriate. Keep headers and cards aligned within the shared layout.
- Authenticated styles belong under `.money-workspace` in the modules imported by `workspace.css`; public styles belong under `.mp-public` in marketing style modules. Avoid global overrides leaking between landing, login, and workspace.
- Use existing CSS variables for backgrounds, borders, text, chart colors, and semantic states. Preserve the public sage palette and light/dark workspace themes.
- Prefer visible category/icon choices and direct actions over hidden menus for common tasks. Keep browse and edit modes distinct and preserve unsaved edits when switching views.
- Every field needs a label. Use native buttons/links, visible keyboard focus, accessible names on icon controls, and `aria-pressed` for toggles. Decorative icons should be hidden from assistive technology.
- Dialogs need a title, focus management, keyboard dismissal, and focus restoration. Avoid portal placement that loses workspace theme variables or makes controls inaccessible.
- Check 320px/390px phone widths and large screens. Avoid clipped totals, horizontal page scrolling, tiny controls, and oversized gaps on focused pages.
- Loading, empty, failure, and success states are part of a feature. Do not show a misleading zero while financial data is still loading or has failed.
- Respect saved amount-visibility settings. Hidden financial values must not remain exposed in chart labels or tooltips within the area being hidden.
- Use `useExpenseLocation` for location. Denied/unavailable permission must not block saving. Request camera access only after a user action and offer upload recovery.

- Design frequent actions for repeat use. Keep the primary flow compact; put examples, instructions, and shortcuts in accessible optional help rather than repeating them every time.
