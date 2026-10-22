import test from "node:test";
import assert from "node:assert/strict";
import budgetRemaining from "../src/components/CategoryPlan/budgetRemaining.js";

test("remaining budget includes numeric strings and spending without a budget", () => {
  assert.equal(budgetRemaining([
    { budget: "100.50", total_expense: "25.25" },
    { budget: "50", total_expense: 0 },
    { budget: 0, total_expense: "10" },
  ]), 115.25);
});

test("empty, fully spent, and overspent budgets retain their meaning", () => {
  assert.equal(budgetRemaining([]), 0);
  assert.equal(budgetRemaining([{ budget: 100, total_expense: 100 }]), 0);
  assert.equal(budgetRemaining([{ budget: "20", total_expense: "35" }]), -15);
  assert.equal(budgetRemaining([{ budget: 10 }]), 10);
});

test("invalid amounts do not produce a misleading remaining balance", () => {
  for (const amount of ["invalid", Infinity, NaN]) {
    assert.ok(Number.isNaN(budgetRemaining([{ budget: amount, total_expense: 5 }])));
    assert.ok(Number.isNaN(budgetRemaining([{ budget: 5, total_expense: amount }])));
  }
});
