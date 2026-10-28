import assert from "node:assert/strict";
import { test } from "node:test";
import { deferred, sessionHarness } from "./session-test-harness.mjs";

const credentials = { data: { token: "new-A", refresh_token: "rotated-A" } };

test("late refresh cannot restore a signed-out session", async () => {
  const { context: c, storage } = sessionHarness();
  const response = deferred();
  c.axios.post = () => response.promise;
  const pending = c.refreshSession(c.getSessionVersion());
  await Promise.resolve();
  c.clearTokens();
  response.resolve(credentials);
  await assert.rejects(pending, /session changed/);
  assert.equal(storage.has("authToken"), false);
  assert.equal(storage.has("refreshToken"), false);
});

test("late refresh success or failure cannot overwrite or clear account B", async () => {
  for (const failed of [false, true]) {
    const { context: c, storage } = sessionHarness();
    const response = deferred();
    c.axios.post = () => response.promise;
    const pending = c.refreshSession(c.getSessionVersion());
  await Promise.resolve();
    c.invalidateSession();
    storage.set("authToken", "access-B");
    storage.set("refreshToken", "refresh-B");
    if (failed) response.reject({ response: { status: 401 } });
    else response.resolve(credentials);
    await assert.rejects(pending);
    assert.equal(storage.get("authToken"), "access-B");
    assert.equal(storage.get("refreshToken"), "refresh-B");
    assert.equal(c.window.location.href, undefined);
  }
});

test("concurrent requests share one refresh and persist rotated credentials", async () => {
  const { context: c, storage } = sessionHarness();
  const response = deferred();
  let count = 0;
  c.axios.post = () => { count += 1; return response.promise; };
  const first = c.refreshSession(c.getSessionVersion());
  const second = c.refreshSession(c.getSessionVersion());
  response.resolve(credentials);
  assert.deepEqual(await Promise.all([first, second]), ["new-A", "new-A"]);
  assert.equal(count, 1);
  assert.equal(storage.get("refreshToken"), "rotated-A");
});

test("cross-tab refresh lock reuses credentials rotated while waiting", async () => {
  const { context: c, storage } = sessionHarness();
  let run;
  c.navigator.locks = { request: (_, work) => new Promise((resolve) => {
    run = () => resolve(work());
  }) };
  const pending = c.refreshSession(c.getSessionVersion());
  await Promise.resolve();
  storage.set("authToken", "other-tab-access");
  storage.set("refreshToken", "other-tab-refresh");
  run();
  assert.equal(await pending, "other-tab-access");
});

test("network failure preserves credentials; invalid refresh clears them", async () => {
  for (const status of [undefined, 401]) {
    const { context: c, storage } = sessionHarness();
    c.axios.post = async () => { throw { response: { status } }; };
    await assert.rejects(c.refreshSession(c.getSessionVersion()));
    assert.equal(storage.has("refreshToken"), status !== 401);
  }
});

test("stale requests and responses cannot cross a sign-out or account change", async () => {
  const { context: c, api, calls } = sessionHarness();
  const request = api.prepare({ url: "expenses", headers: {}, method: "post" });
  c.invalidateSession();
  assert.throws(() => api.prepare(request), /session changed/);
  assert.throws(() => api.success({ config: request }), /session changed/);
  await assert.rejects(api.failure({ config: request, response: { status: 401 } }), /session changed/);
  assert.equal(calls.length, 0);
});
