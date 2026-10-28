import assert from "node:assert/strict";
import { test } from "node:test";
import { deferred, sessionHarness } from "./session-test-harness.mjs";

test("logout revokes before clearing local credentials and redirects on success", async () => {
  const { context: c, storage } = sessionHarness();
  c.axios.post = async (url, body, config) => {
    assert.equal(url, "https://api.test/api/v1/auth/logout");
    assert.equal(body.refresh_token, "refresh-A");
    assert.equal(config.timeout, 10000);
    assert.equal(storage.get("refreshToken"), "refresh-A");
  };
  await c.signOut();
  assert.equal(storage.has("refreshToken"), false);
  assert.equal(storage.has("authToken"), false);
  assert.equal(storage.has("currentUser"), false);
  assert.equal(c.window.location.href, "/sign_in");
});

test("failed logout preserves credentials for an explicit retry", async () => {
  const { context: c, storage } = sessionHarness();
  c.axios.post = async () => { throw new Error("offline"); };
  await assert.rejects(c.signOut(), /offline/);
  assert.equal(storage.get("refreshToken"), "refresh-A");
  assert.equal(c.window.location.href, undefined);
  c.axios.post = async () => ({});
  await c.signOut();
  assert.equal(storage.has("refreshToken"), false);
});

test("late logout response cannot clear a newer sign-in", async () => {
  const { context: c, storage } = sessionHarness();
  const response = deferred();
  c.axios.post = () => response.promise;
  const pending = c.signOut();
  await Promise.resolve();
  c.invalidateSession();
  storage.set("authToken", "access-B");
  storage.set("refreshToken", "refresh-B");
  response.resolve({});
  await pending;
  assert.equal(storage.get("authToken"), "access-B");
  assert.equal(c.window.location.href, undefined);
});


test("pending logout leaves ordinary responses and the workspace session valid", async () => {
  const { context: c, storage, api } = sessionHarness();
  const version = c.getSessionVersion();
  const request = api.prepare({ url: "expenses", headers: {} });
  const response = deferred();
  c.axios.post = () => response.promise;
  const pending = c.signOut();
  await Promise.resolve();
  assert.equal(c.getSessionVersion(), version);
  assert.equal(storage.get("authToken"), "access-A");
  assert.doesNotThrow(() => api.success({ config: request }));
  response.resolve({});
  assert.equal(await pending, true);
  assert.notEqual(c.getSessionVersion(), version);
  assert.throws(() => api.success({ config: request }), /session changed/);
});

test("logout waits for an in-flight refresh, then revokes its session", async () => {
  const { context: c, storage } = sessionHarness();
  let tail = Promise.resolve();
  c.navigator.locks = { request: (_, work) => {
    const next = tail.then(work);
    tail = next.catch(() => {});
    return next;
  } };
  const response = deferred();
  const calls = [];
  c.axios.post = (url, body) => {
    calls.push({ url, body });
    return url.endsWith("/refresh") ? response.promise : Promise.resolve({});
  };
  const refresh = c.refreshSession(c.getSessionVersion());
  await Promise.resolve();
  const logout = c.signOut();
  assert.equal(calls.length, 1);
  response.resolve({ data: { token: "new-A", refresh_token: "rotated-A" } });
  await refresh;
  await logout;
  assert.equal(calls[1].url, "https://api.test/api/v1/auth/logout");
  assert.equal(calls[1].body.refresh_token, "refresh-A");
  assert.equal(storage.has("refreshToken"), false);
});
