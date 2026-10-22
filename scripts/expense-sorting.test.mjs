import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { getDefaultExpenseSortParams, setExpenseSortParams } from "../src/containers/Expenses/utils/utils.js";

const source = await readFile(new URL("../src/containers/Expenses/hooks/useExpenses.jsx", import.meta.url), "utf8");
const hookBody = source.replace(/^import .*;\n/gm, "").replace(/export \{ useExpenses \};/, "return useExpenses;");

function harness() {
  const states = [];
  const requests = [];
  const errors = [];
  const useState = (initial) => {
    const index = states.length;
    states.push(initial);
    return [initial, (value) => { states[index] = value; }];
  };
  const get = (url) => new Promise((resolve, reject) => requests.push({ url, resolve, reject }));
  const factory = new Function("useState", "useCallback", "get", "Notify", "apiErrorMessage", hookBody);
  const useExpenses = factory(useState, (callback) => callback, get, { error: (error) => errors.push(error) }, (error) => error.message);
  return { ...useExpenses(), states, requests, errors };
}

const flush = () => new Promise((resolve) => setImmediate(resolve));

test("initial request explicitly uses displayed date descending sort and encodes category", async () => {
  const { actions, requests, states } = harness();
  const sort = getDefaultExpenseSortParams().find((param) => param.active);
  actions.getExpenses("2026-10", "food & drink", sort.field, sort.order);
  const params = new URLSearchParams(requests[0].url.split("?")[1]);
  assert.equal(params.get("sort_by"), "transaction_date");
  assert.equal(params.get("sort_order"), "desc");
  assert.equal(params.get("category"), "food & drink");
  requests[0].resolve([{ uid: "latest" }]);
  await flush();
  assert.deepEqual(states[1], [{ uid: "latest" }]);
  assert.equal(states[0], false);
});

test("cancelled sort or month requests cannot overwrite newer rows or report errors", async () => {
  const { actions, requests, states, errors } = harness();
  const cancel = actions.getExpenses("2026-09", "", "amount", "asc");
  cancel();
  actions.getExpenses("2026-10", "", "transaction_date", "desc");
  requests[1].resolve([{ uid: "new" }]);
  await flush();
  requests[0].resolve([{ uid: "old" }]);
  await flush();
  assert.deepEqual(states[1], [{ uid: "new" }]);
  const cancelFailure = actions.getExpenses("2026-08", "", "notes", "asc");
  cancelFailure();
  requests[2].reject(new Error("stale failure"));
  await flush();
  assert.deepEqual(errors, []);
});

test("current request failure reports error and clears loading", async () => {
  const { actions, requests, states, errors } = harness();
  actions.getExpenses("2026-10", "", "transaction_date", "desc");
  requests[0].reject(new Error("Try again"));
  await flush();
  assert.deepEqual(errors, ["Try again"]);
  assert.equal(states[0], false);
});

test("sort selection is immutable, starts ascending, and toggles the active column", () => {
  const original = getDefaultExpenseSortParams();
  const snapshot = structuredClone(original);
  const amount = setExpenseSortParams(original, "amount");
  assert.deepEqual(original, snapshot);
  assert.equal(amount.find((param) => param.active).order, "asc");
  const descending = setExpenseSortParams(amount, "amount");
  assert.equal(descending.find((param) => param.active).order, "desc");
  assert.equal(descending.filter((param) => param.active).length, 1);
});
