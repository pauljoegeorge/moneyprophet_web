import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { put } from "../utils/api";
import { getCurrentUser } from "../utils/auth";

export default function AiConsentDialog() {
  const [request, setRequest] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const active = useRef(null);
  useEffect(() => {
    const receive = (event) => {
      active.current = event.detail;
      setError("");
      setRequest(event.detail);
    };
    window.addEventListener("ai:consent", receive);
    return () => {
      window.removeEventListener("ai:consent", receive);
      active.current?.resolve(false);
    };
  }, []);
  const finish = (accepted) => {
    active.current?.resolve(accepted);
    active.current = null;
    setRequest(null);
  };
  const allow = async () => {
    if (busy) return;
    if (getCurrentUser()?.email !== request.account) {
      finish(false);
      return;
    }
    setBusy(true);
    setError("");
    try {
      await put("privacy/ai_consent", {
        granted: true,
        version: request.policy.version,
      });
      window.dispatchEvent(new Event("ai:permission"));
      finish(true);
    } catch {
      setError("Could not save permission. Please try again.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <Dialog
      open={Boolean(request)}
      onClose={() => {
        if (!busy) finish(false);
      }}
      aria-labelledby="ai-consent-title"
    >
      <DialogTitle id="ai-consent-title">{request?.policy.title}</DialogTitle>
      <DialogContent>
        <p>{request?.policy.message}</p>
        <a href={request?.policy.privacy_url} target="_blank" rel="noreferrer">
          Read privacy policy
        </a>
        {error && <p role="alert">{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button disabled={busy} onClick={() => finish(false)}>
          Not now
        </Button>
        <Button disabled={busy} onClick={allow}>
          Allow AI data sharing
        </Button>
      </DialogActions>
    </Dialog>
  );
}
