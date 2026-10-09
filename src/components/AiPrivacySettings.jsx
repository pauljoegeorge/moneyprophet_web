import React, { useCallback, useEffect, useState } from "react";
import { get, put } from "../utils/api";
import { PrimaryButton } from "./Button";

export default function AiPrivacySettings() {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setError("");
    try {
      setStatus(await get("privacy/ai_consent"));
    } catch {
      setError("Could not load AI privacy information. Please try again.");
    }
  }, []);
  useEffect(() => {
    load();
    window.addEventListener("ai:permission", load);
    return () => window.removeEventListener("ai:permission", load);
  }, [load]);
  const change = async () => {
    if (busy || !status) return;
    setBusy(true);
    setError("");
    try {
      setStatus(
        await put("privacy/ai_consent", {
          granted: !status.granted,
          version: status.policy.version,
        })
      );
    } catch {
      setError("Could not save permission. Please try again.");
    } finally {
      setBusy(false);
    }
  };
  let buttonLabel = status?.granted
    ? "Withdraw AI permission"
    : "Allow AI data sharing";
  if (busy) buttonLabel = "Saving…";
  return (
    <section className="workspace-card workspace-form-card">
      <h2>AI privacy</h2>
      {status ? (
        <>
          <p>{status.policy.message}</p>
          <p>AI data sharing is {status.granted ? "allowed" : "off"}.</p>
          <PrimaryButton disabled={busy} onClick={change}>
            {buttonLabel}
          </PrimaryButton>
        </>
      ) : (
        !error && <p>Loading…</p>
      )}
      {error && <p role="alert">{error}</p>}
      {!status && error && <PrimaryButton onClick={load}>Retry</PrimaryButton>}
      <p>
        <a href="/privacy.html">Privacy Policy</a> ·{" "}
        <a href="/terms.html">Terms of Use</a>
      </p>
    </section>
  );
}
