import { useEffect, useState } from "react";
import { useAccount } from "../../../contexts/AccountContext";
import { get } from "../../../utils/api";
import { apiErrorMessage } from "../../../utils/apiError";
import { initialSetup, onboardingDraftKey } from "../../../utils/onboarding";

export default function useSetupDraft() {
  const { user, updateUser } = useAccount();
  const [config, setConfig] = useState(null);
  const [draft, setDraft] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [retry, setRetry] = useState(0);
  const key = onboardingDraftKey(user.email);
  useEffect(() => {
    let active = true;
    setLoadError("");
    get("onboarding/config")
      .then((data) => {
        if (!active) return;
        if (data.onboarding_completed) {
          updateUser(data);
          return;
        }
        let stored = null;
        try {
          stored = sessionStorage.getItem(key);
        } catch {
          /* Setup can continue without browser storage. */
        }
        setDraft(initialSetup(data, user, stored));
        setConfig(data);
      })
      .catch((failure) => {
        if (active)
          setLoadError(
            apiErrorMessage(failure, "Could not load setup. Please try again.")
          );
      });
    return () => {
      active = false;
    };
  }, [retry, key, user, updateUser]);
  useEffect(() => {
    if (draft) {
      try {
        sessionStorage.setItem(key, JSON.stringify(draft));
      } catch {
        /* Keep the current form in memory. */
      }
    }
  }, [draft, key]);

  return {
    config,
    draft,
    setDraft,
    loadError,
    retryLoad: () => setRetry((value) => value + 1),
    key,
    updateUser,
  };
}
