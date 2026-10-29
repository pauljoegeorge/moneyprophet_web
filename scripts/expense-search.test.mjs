import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/containers/Expenses/hooks/useExpenseSearch.js", import.meta.url), "utf8");
const body = source.replace(/^import .*;\n/gm, "").replace("export default function", "function");

function harness(query = "") {
  let location = { pathname: "/expenses", search: query, hash: "#history" };
  const browser = { location: { search: query } };
  let state;
  const useState = (initial) => {
    if (!state) state = initial;
    return [state, (next) => { state = next; }];
  };
  const history = { replace(next) { location = next; browser.location.search = next.search; } };
  const hook = new Function("useState", "useHistory", "useLocation", "window", `${body}; return useExpenseSearch;`)(
    useState, () => history, () => location, browser
  );
  return {
    render: hook,
    location: () => location,
    browser,
    navigate(search) { location = { ...location, search }; browser.location.search = search; },
  };
}

test("dashboard links prefill decoded category names immediately", () => {
  for (const category of ["Food & Drink", "食費", "Coffee + Tea", "Bills / Home"]) {
    const h = harness(`?date=2026-10-01&category=${encodeURIComponent(category)}`);
    assert.equal(h.render().search, category);
    assert.equal(h.render().category, category);
  }
});

test("clearing search removes the server category filter and keeps month/hash", () => {
  const h = harness("?date=2026-09-01&category=Food");
  h.render().setSearch("");
  assert.equal(h.render().search, "");
  assert.equal(h.render().category, "");
  assert.equal(new URLSearchParams(h.location().search).get("date"), "2026-09-01");
  assert.equal(h.location().hash, "#history");
});

test("editing the prefilled search permits searching across all categories", () => {
  const h = harness("?date=2026-10-01&category=Food");
  h.render().setSearch("Train");
  assert.equal(h.render().search, "Train");
  assert.equal(h.render().category, "");
});

test("category navigation and browser Back update the field without remounting", () => {
  const h = harness("?category=Food");
  h.navigate("?category=Rent");
  assert.equal(h.render().search, "Rent");
  h.render().setSearch("Train");
  h.navigate("?category=Food");
  assert.equal(h.render().search, "Food");
  assert.equal(h.render().category, "Food");
  h.navigate("");
  assert.equal(h.render().category, "");
});

test("clearing preserves month changes written by the existing date helper", () => {
  const h = harness("?date=2026-10-01&category=Food");
  h.browser.location.search = "?date=2026-11-01&category=Food";
  h.render().setSearch("");
  assert.equal(new URLSearchParams(h.location().search).get("date"), "2026-11-01");
});

test("ordinary search starts empty and retains its draft across month changes", () => {
  const h = harness("?date=2026-10-01");
  assert.equal(h.render().search, "");
  h.render().setSearch("coffee");
  h.navigate("?date=2026-11-01");
  assert.equal(h.render().search, "coffee");
});
