const KEY = "mp-google-sign-in";

export async function beginOAuth() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const verifier = Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(verifier)
  );
  const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return { verifier, challenge };
}

export function rememberOAuth(state, verifier) {
  sessionStorage.setItem(KEY, JSON.stringify({ state, verifier }));
}

export function consumeOAuth(state) {
  const saved = sessionStorage.getItem(KEY);
  sessionStorage.removeItem(KEY);
  const attempt = saved ? JSON.parse(saved) : null;
  if (!state || !attempt || attempt.state !== state) {
    throw new Error("Sign-in expired. Start Google sign-in again.");
  }
  return attempt.verifier;
}
