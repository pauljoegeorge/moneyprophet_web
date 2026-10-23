const paths = new Set([
  "/",
  "/sign_in",
  "/onboarding",
  "/dashboard",
  "/expenses",
  "/new",
  "/chat",
  "/budget",
  "/income",
  "/fixed_expenses",
  "/r_expenses",
  "/unexpected_expenses",
  "/settings",
  "/forecasts",
]);

export const consentKey = "mp-analytics-consent";

export function analyticsChoice() {
  try {
    return window.localStorage.getItem(consentKey);
  } catch {
    return null;
  }
}

export function safePath(pathname) {
  return paths.has(pathname) ? pathname : "/other";
}

const actions = {
  "post expenses": "expense_created",
  "post auto_expenses": "quick_expense_created",
  "put expenses": "expenses_updated",
  "put fixed_expense_categories": "budget_saved",
  "put fixed_expenses": "fixed_expenses_saved",
  "put recurrent_expenses": "recurring_expenses_saved",
  "put unexpected_expenses": "unexpected_expenses_saved",
  "put incomes": "income_saved",
  "post onboarding/complete": "onboarding_completed",
  "post expense_insights/forecast": "forecast_generated",
  "post contacts": "generate_lead",
};

const allowedEvents = new Set([
  "page_view",
  "privacy_opened",
  "social_opened",
  "expenses_exported",
  ...Object.values(actions),
]);

export function trackEvent(event) {
  try {
    if (!allowedEvents.has(event)) return;
    if (analyticsChoice() !== "granted" || !window.mpAnalyticsReady) return;
    window.dataLayer.push({
      event: "mp_engagement",
      mp_event_name: event,
      page_location: `${window.location.origin}${safePath(window.location.pathname)}`,
      page_referrer: "",
      page_title: "Money Prophet",
    });
  } catch {
    // Measurement must never interrupt the user's action.
  }
}

export function trackApiSuccess(method, url) {
  const event = actions[`${method} ${url}`];
  if (event) trackEvent(event);
  if (method === "get" && /^expenses\/export\?/.test(url)) {
    trackEvent("expenses_exported");
  }
}
