import test from "node:test";
import assert from "node:assert/strict";
import {
  analyticsChoice,
  safePath,
  trackEvent,
  trackApiSuccess,
} from "../src/analytics/events.js";

test("analytics consent, sanitization, allowlist, and failure isolation", () => {
  let choice = null;
  globalThis.window = {
    localStorage: { getItem: () => choice },
    location: {
      origin: "https://example.test",
      pathname: "/expenses",
      search: "?email=secret",
      hash: "#secret",
    },
    dataLayer: [],
    mpAnalyticsReady: true,
  };
  trackApiSuccess("post", "expenses");
  assert.equal(window.dataLayer.length, 0);
  choice = "denied";
  trackEvent("page_view");
  assert.equal(window.dataLayer.length, 0);
  choice = "granted";
  trackApiSuccess("post", "expenses");
  assert.deepEqual(window.dataLayer[0], {
    event: "mp_engagement",
    mp_event_name: "expense_created",
    page_location: "https://example.test/expenses",
    page_referrer: "",
    page_title: "Money Prophet",
  });
  trackEvent("sensitive arbitrary text");
  trackApiSuccess("post", "unknown");
  trackApiSuccess("get", "expenses?email=secret");
  assert.equal(window.dataLayer.length, 1);
  window.location.pathname = "/users/secret@example.test";
  trackApiSuccess("get", "expenses/export?from=private");
  assert.equal(window.dataLayer[1].page_location, "https://example.test/other");
  assert.equal(safePath("/expenses?secret"), "/other");
  window.mpAnalyticsReady = false;
  trackEvent("page_view");
  assert.equal(window.dataLayer.length, 2);
  window.localStorage.getItem = () => {
    throw new Error("blocked");
  };
  assert.equal(analyticsChoice(), null);
  assert.doesNotThrow(() => trackApiSuccess("post", "expenses"));
  delete globalThis.window;
});
