export function apiErrorMessage(
  error,
  fallback = "Something went wrong. Please try again."
) {
  const message = error?.response?.data?.error;
  return typeof message === "string" && message.trim() ? message : fallback;
}
