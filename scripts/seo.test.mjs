import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const html = await readFile("build/index.html", "utf8");

test("landing exposes product content and structured data before JavaScript", () => {
  assert.match(html, /<h1>Track expenses\./);
  assert.match(html, /What is Money Prophet\?/);
  assert.match(html, /How do I track expenses against a monthly budget\?/);
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.match(html, /<meta name="robots" content="index,follow"/);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/expense.paulworks.net\/"/,
  );
  const script = html.match(
    /<script type="application\/ld\+json">(.*?)<\/script>/s,
  );
  const graph = JSON.parse(script[1])["@graph"];
  assert.equal(
    graph.find((entry) => entry["@type"] === "WebApplication").url,
    "https://expense.paulworks.net/",
  );
  assert.equal(graph.length, 2);
});

test("private shells remain noindex and do not describe a public product page", async () => {
  for (const path of ["build/sign_in/index.html", "build/app.html"]) {
    const shell = await readFile(path, "utf8");
    assert.match(shell, /<meta name="robots" content="noindex,follow"/);
    assert.doesNotMatch(shell, /application\/ld\+json/);
    assert.doesNotMatch(shell, /<h1>/);
  }
});

test("all local landing assets and page links exist in the production build", async () => {
  const paths = [...html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)]
    .map((match) => match[1])
    .filter((path) => path !== "/" && path !== "/sign_in");
  for (const path of new Set(paths)) await readFile(`build${path}`);
});
