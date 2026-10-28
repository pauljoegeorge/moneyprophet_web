import fs from "node:fs";
import vm from "node:vm";
import { webcrypto } from "node:crypto";

export function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

export function sessionHarness() {
  const storage = new Map();
  const calls = [];
  const api = Object.assign(async (request) => {
    calls.push(request);
    return { data: "retried" };
  }, {
    interceptors: {
      request: { use(handler) { api.prepare = handler; } },
      response: { use(success, failure) { api.success = success; api.failure = failure; } },
    },
  });
  const context = vm.createContext({
    crypto: webcrypto,
    navigator: {},
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key),
    },
    sessionStorage: { removeItem() {} },
    window: { location: {} },
    axios: { post: async () => { throw new Error("Unexpected request"); } },
    requestAiConsent: async () => true,
    api,
  });
  const load = (name, exports) => {
    const source = fs.readFileSync(new URL(`../src/utils/${name}.js`, import.meta.url), "utf8")
      .replace(/^import[\s\S]*?from [^;]+;\n/gm, "")
      .replace(/export /g, "")
      .replaceAll("import.meta.env.VITE_API_ROOT", '"https://api.test"');
    vm.runInContext(`${source}\nObject.assign(globalThis, { ${exports} });`, context);
  };
  load("auth", "getAuthToken, getRefreshToken, getSessionVersion, invalidateSession, clearTokens, withSessionLock");
  load("sessionRefresh", "refreshSession, assertSession");
  load("apiSession", "installApiSession");
  load("signOut", "signOut");
  context.installApiSession(api);
  storage.set("authToken", "access-A");
  storage.set("refreshToken", "refresh-A");
  storage.set("currentUser", JSON.stringify({ email: "a@example.test" }));
  return { context, storage, api, calls };
}
