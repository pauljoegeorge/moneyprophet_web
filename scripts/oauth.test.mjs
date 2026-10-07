import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { test, beforeEach } from "node:test";
import { beginOAuth, rememberOAuth, consumeOAuth } from "../src/utils/oauth.js";

beforeEach(() => {
  const values = new Map();
  globalThis.sessionStorage = {
    setItem: (key, value) => values.set(key, value),
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => values.delete(key),
  };
});

test("creates unpredictable verifiers and RFC 7636 S256 challenges", async () => {
  const first = await beginOAuth();
  const second = await beginOAuth();
  assert.notEqual(first.verifier, second.verifier);
  assert.match(first.verifier, /^[A-Za-z0-9_-]{43,128}$/);
  assert.equal(first.challenge, createHash("sha256").update(first.verifier).digest("base64url"));
});

test("only the initiating tab can consume its matching state once", () => {
  assert.throws(() => consumeOAuth("attacker-state"));
  rememberOAuth("our-state", "our-verifier");
  assert.equal(consumeOAuth("our-state"), "our-verifier");
  assert.throws(() => consumeOAuth("our-state"));
});

test("rejects mismatched or missing state and permits a fresh retry", () => {
  for (const state of [null, "", "google", "other-state"]) {
    rememberOAuth("our-state", "our-verifier");
    assert.throws(() => consumeOAuth(state));
  }
  rememberOAuth("new-state", "new-verifier");
  assert.equal(consumeOAuth("new-state"), "new-verifier");
});
