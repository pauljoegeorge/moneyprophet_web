import { getAuthToken, getCurrentUser, getSessionVersion } from "./auth";
import { requestAiConsent } from "./aiConsent";
import { assertSession, refreshSession } from "./sessionRefresh";

export function installApiSession(api) {
  api.interceptors.request.use((config) => {
    const sessionVersion = Object.prototype.hasOwnProperty.call(
      config,
      "sessionVersion"
    )
      ? config.sessionVersion
      : getSessionVersion();
    assertSession(sessionVersion);
    const token = getAuthToken();
    return {
      ...config,
      sessionVersion,
      headers: {
        ...config.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  });

  api.interceptors.response.use(
    (response) => {
      assertSession(response.config.sessionVersion);
      return response;
    },
    async (error) => {
      const request = error.config;
      if (!request) throw error;
      assertSession(request.sessionVersion);
      if (
        error.response?.status === 428 &&
        error.response.data?.code === "ai_consent_required" &&
        !request.consentRetried
      ) {
        request.consentRetried = true;
        const account = getCurrentUser()?.email;
        if (await requestAiConsent(error.response.data.policy, account)) {
          assertSession(request.sessionVersion);
          if (getCurrentUser()?.email === account) return api(request);
        }
        throw error;
      }
      if (
        request.url.includes("auth/") ||
        error.response?.status !== 401 ||
        request.hasRetried
      )
        throw error;

      request.hasRetried = true;
      await refreshSession(request.sessionVersion);
      assertSession(request.sessionVersion);
      return api(request);
    }
  );
}
