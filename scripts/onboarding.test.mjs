import test from "node:test";
import assert from "node:assert/strict";
import { initialSetup, setupPayload, onboardingDraftKey } from "../src/utils/onboarding.js";

const config = {
  supported_currencies: [{ code: "USD" }],
  predefined_categories: [{ name: "Groceries", icon: "cart" }],
  predefined_fixed_categories: [{ name: "Rent", icon: "home" }],
  existing_categories: [{ name: "Groceries", icon: null, budget: "100.1234" }],
  existing_fixed_categories: [],
};
const user = { currency_unit: "USD" };

test("starter categories infer their suggested icon without creating bills", () => {
  const draft = initialSetup(config, user, null);
  assert.equal(draft.categories[0].icon, "cart");
  assert.equal(draft.categories[0].budget, "100.1234");
  assert.deepEqual(draft.fixed_categories, []);
});

test("restored drafts preserve edited icons and exact amounts, and repair missing icons", () => {
  const saved = { step: 2, currency: "USD", categories: [
    { name: "Groceries", icon: null, budget: "0" },
    { name: "Pet food", icon: "dog", budget: "12.3456" },
    { name: "Custom", icon: null, budget: "" },
  ], fixed_categories: [{ name: "Rent", icon: null, amount: "500.25" }] };
  const draft = initialSetup(config, user, JSON.stringify(saved));
  assert.equal(draft.step, 2);
  assert.deepEqual(draft.categories.map((row) => row.icon), ["cart", "dog", "star"]);
  const payload = setupPayload(draft);
  assert.equal(payload.categories[1].icon, "dog");
  assert.equal(payload.categories[1].budget, "12.3456");
  assert.equal(payload.categories[2].budget, "0");
  assert.equal(payload.fixed_categories[0].icon, "home");
  assert.equal(payload.fixed_categories[0].amount, "500.25");
  assert.deepEqual(setupPayload(draft, true).fixed_categories, []);
  assert.equal(draft.fixed_categories.length, 1);
});

test("corrupt or obsolete storage falls back to server defaults and account keys are separate", () => {
  for (const stored of ["broken", "null", JSON.stringify({ step: 5 })]) {
    assert.equal(initialSetup(config, user, stored).categories[0].icon, "cart");
  }
  assert.notEqual(onboardingDraftKey("a@example.test"), onboardingDraftKey("b@example.test"));
});
