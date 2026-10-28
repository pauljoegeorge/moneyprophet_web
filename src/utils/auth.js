export function withSessionLock(work) {
  const locks = globalThis.navigator?.locks;
  return locks
    ? locks.request("mp-session-refresh", work)
    : Promise.resolve().then(work);
}

export const getSessionVersion = () => localStorage.getItem("sessionVersion");

export const invalidateSession = () => {
  localStorage.setItem("sessionVersion", crypto.randomUUID());
};

export const saveAuthToken = (authToken) =>
  localStorage.setItem("authToken", authToken);

export const getAuthToken = () => localStorage.getItem("authToken");

export const saveRefreshToken = (refreshToken) =>
  localStorage.setItem("refreshToken", refreshToken);

export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const clearTokens = () => {
  invalidateSession();
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  try {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user?.email) sessionStorage.removeItem(`mp-onboarding:${user.email}`);
  } catch {
    // Corrupt profile data must not prevent removal of session credentials.
  }
  localStorage.removeItem("currentUser");
};

export const saveCurrentUser = (user) =>
  localStorage.setItem("currentUser", JSON.stringify(user));

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("currentUser"));
