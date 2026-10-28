import axios from "axios";
import {
  getAuthToken,
  getRefreshToken,
  getSessionVersion,
  saveAuthToken,
  saveRefreshToken,
  clearTokens,
  withSessionLock,
} from "./auth";

const pending = new Map();
const changed = () =>
  new Error("Your sign-in session changed. Reload this page.");

export function assertSession(version) {
  if (version !== getSessionVersion()) throw changed();
}

export function refreshSession(version) {
  assertSession(version);
  if (pending.has(version)) return pending.get(version);
  const original = getRefreshToken();
  const refresh = async () => {
    assertSession(version);
    // Another tab may have refreshed while this tab waited for the lock.
    if (getRefreshToken() !== original && getAuthToken()) return getAuthToken();
    try {
      if (!original) throw changed();
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_ROOT}/api/v1/auth/refresh`,
        { refresh_token: original },
        { timeout: 10000 }
      );
      assertSession(version);
      if (getRefreshToken() !== original) throw changed();
      if (!data.token || !data.refresh_token) throw changed();
      saveAuthToken(data.token);
      saveRefreshToken(data.refresh_token);
      return data.token;
    } catch (error) {
      if (
        version === getSessionVersion() &&
        original === getRefreshToken() &&
        (!original || [401, 403].includes(error.response?.status))
      ) {
        clearTokens();
        window.location.href = "/sign_in";
      }
      throw error;
    }
  };
  const work = withSessionLock(refresh);
  const result = work.finally(() => pending.delete(version));
  pending.set(version, result);
  return result;
}
