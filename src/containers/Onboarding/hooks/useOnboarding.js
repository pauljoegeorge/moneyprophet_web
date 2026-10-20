import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { post } from "../../../utils/api";
import { apiErrorMessage } from "../../../utils/apiError";
import { setupPayload } from "../../../utils/onboarding";
import useSetupDraft from "./useSetupDraft";
import useSetupCategories from "./useSetupCategories";

export default function useOnboarding() {
  const history = useHistory();
  const setup = useSetupDraft();
  const { config, draft, setDraft, key, updateUser } = setup;
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const busy = useRef(false);
  const heading = useRef(null);
  const selection = useSetupCategories(draft, config, setDraft, setError);
  useEffect(() => {
    heading.current?.focus();
  }, [draft?.step]);
  const finish = async (skipBills = false) => {
    if (busy.current) return;
    busy.current = true;
    setSaving(true);
    setError("");
    try {
      const profile = await post(
        "onboarding/complete",
        setupPayload(draft, skipBills)
      );
      try {
        sessionStorage.removeItem(key);
      } catch {
        /* Server completion is authoritative. */
      }
      updateUser(profile);
      history.replace("/dashboard");
    } catch (failure) {
      setError(
        apiErrorMessage(
          failure,
          "Could not finish setup. Your choices are saved; please try again."
        )
      );
    } finally {
      busy.current = false;
      setSaving(false);
    }
  };
  const next = (event) => {
    event.preventDefault();
    if (busy.current) return;
    if (selection.overLimit) {
      setError(selection.limitMessage);
      return;
    }
    if (draft.step === 1 && selection.rows.length === 0) {
      setError("Choose at least one budget category.");
      return;
    }
    if (draft.step === 2) {
      finish();
      return;
    }
    setError("");
    selection.setNewName("");
    setDraft((value) => ({ ...value, step: value.step + 1 }));
  };

  const back = () => {
    setError("");
    selection.setNewName("");
    setDraft((value) => ({ ...value, step: value.step - 1 }));
  };
  return { ...setup, error, saving, heading, selection, finish, next, back };
}
