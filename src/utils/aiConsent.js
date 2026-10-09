let pending;
export function requestAiConsent(policy, account) {
  if (pending) return pending;
  pending = new Promise((resolve) => {
    const event = new CustomEvent("ai:consent", {
      detail: { policy, account, resolve },
    });
    window.dispatchEvent(event);
  }).finally(() => {
    pending = null;
  });
  return pending;
}
