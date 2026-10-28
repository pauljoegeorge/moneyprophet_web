import axios from "axios";
import {
  getRefreshToken,
  getSessionVersion,
  clearTokens,
  withSessionLock,
} from "./auth";

export async function signOut() {
  const refreshToken = getRefreshToken();
  // Keep ordinary data requests valid while revocation is pending.
  const version = getSessionVersion();
  return withSessionLock(async () => {
    if (version !== getSessionVersion()) return false;
    if (refreshToken) {
      await axios.post(
        `${import.meta.env.VITE_API_ROOT}/api/v1/auth/logout`,
        { refresh_token: refreshToken },
        { timeout: 10000 }
      );
    }
    // A late sign-out response must not clear a newer sign-in.
    if (version !== getSessionVersion()) return false;
    clearTokens();
    window.location.href = "/sign_in";
    return true;
  });
}
