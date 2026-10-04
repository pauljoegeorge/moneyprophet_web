export const saveAuthToken = (authToken) =>
  localStorage.setItem("authToken", authToken);

export const getAuthToken = () => localStorage.getItem("authToken");

export const saveRefreshToken = (refreshToken) =>
  localStorage.setItem("refreshToken", refreshToken);

export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const clearTokens = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("currentUser");
};

export const saveCurrentUser = (user) =>
  localStorage.setItem("currentUser", JSON.stringify(user));

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("currentUser"));
