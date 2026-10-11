import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAccount } from "../../contexts/AccountContext";
import WorkspacePage from "../../components/WorkspacePage";
import CategoryIconPicker from "../../components/CategoryIconPicker";
import CategoryIcon from "../../components/CategoryIcon";
import { get, post } from "../../utils/api";
import { apiErrorMessage } from "../../utils/apiError";
import {
  initialSetup,
  onboardingDraftKey,
  setupPayload,
} from "../../utils/onboarding";

const titles = [
  "Choose your currency",
  "Review your monthly budgets",
  "Add recurring bills",
];

export default function Onboarding() {
  const { user, updateUser } = useAccount();
  const history = useHistory();
  const [config, setConfig] = useState(null);
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");
  const [retry, setRetry] = useState(0);
  const [saving, setSaving] = useState(false);
  const busy = useRef(false);
  const heading = useRef(null);
  const [newIcon, setNewIcon] = useState("star");
  const [newName, setNewName] = useState("");
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
  useEffect(() => {
    heading.current?.focus();
  }, [draft?.step]);
  if (!draft || !config)
    return (
      <WorkspacePage focused title="Set up your workspace">
        <div
          className="workspace-card workspace-empty"
          role={loadError ? "alert" : "status"}
        >
          <p>{loadError || "Loading setup…"}</p>
          {loadError && (
            <button
              className="workspace-button"
              type="button"
              onClick={() => setRetry((value) => value + 1)}
            >
              Retry
            </button>
          )}
        </div>
      </WorkspacePage>
    );
  const bills = draft.step === 2;
  const field = bills ? "fixed_categories" : "categories";
  const amountKey = bills ? "amount" : "budget";
  const options = bills
    ? config.predefined_fixed_categories
    : config.predefined_categories;
  const rows = draft[field];
  const limit = bills
    ? config.plan_limits.max_fixed_categories
    : config.plan_limits.max_categories;
  const atLimit = limit != null && rows.length >= limit;
  const overLimit = limit != null && rows.length > limit;
  const limitMessage = bills
    ? config.plan_limits.fixed_category_limit_message
    : config.plan_limits.category_limit_message;
  const changeRows = (nextRows) =>
    setDraft((value) => ({ ...value, [field]: nextRows }));
  const toggle = (category) => {
    if (atLimit && !rows.some((row) => row.name === category.name)) return;
    changeRows(
      rows.some((row) => row.name === category.name)
        ? rows.filter((row) => row.name !== category.name)
        : [...rows, { ...category, [amountKey]: "" }]
    );
    setError("");
  };
  const addCustom = () => {
    const name = newName.trim();
    if (!name || atLimit) return;
    if (rows.some((row) => row.name.toLowerCase() === name.toLowerCase())) {
      setError("That category is already selected.");
      return;
    }
    changeRows([...rows, { name, icon: newIcon, [amountKey]: "" }]);
    setNewName("");
    setNewIcon("star");
    setError("");
  };
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
    if (overLimit) {
      setError(limitMessage);
      return;
    }
    if (draft.step === 1 && rows.length === 0) {
      setError("Choose at least one budget category.");
      return;
    }
    if (draft.step === 2) {
      finish();
      return;
    }
    setError("");
    setNewName("");
    setDraft((value) => ({ ...value, step: value.step + 1 }));
  };
  const submitLabel = bills ? "Finish setup" : "Continue";
  return (
    <WorkspacePage
      focused
      title="Set up your workspace"
      description="A few choices to make this workspace yours. You can change them later."
    >
      <form
        className="workspace-card workspace-onboarding"
        onSubmit={next}
        aria-busy={saving}
      >
        <p className="workspace-note">Step {draft.step + 1} of 3</p>
        <h2 ref={heading} tabIndex={-1}>
          {titles[draft.step]}
        </h2>
        <fieldset disabled={saving}>
          <legend className="workspace-sr-only">{titles[draft.step]}</legend>
          {draft.step === 0 ? (
            <label className="onboarding-currency" htmlFor="setup-currency">
              Account currency
              <select
                id="setup-currency"
                value={draft.currency}
                onChange={(event) =>
                  setDraft((value) => ({
                    ...value,
                    currency: event.target.value,
                  }))
                }
              >
                {config.supported_currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} — {currency.label}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <>
              <p className="workspace-note">
                {bills
                  ? "Optional monthly commitments, such as rent or your phone bill. Skip this if you prefer to add them later."
                  : "Review the starter budgets, remove any you do not need, or add your own. These are spending limits, not expense transactions."}
              </p>
              {limit != null && (
                <p className="workspace-note">
                  Your plan allows up to {limit}{" "}
                  {bills ? "recurring bills" : "budget categories"}.
                </p>
              )}
              {atLimit && limitMessage && (
                <p role="status" className="workspace-note">
                  {limitMessage}
                </p>
              )}
              <div
                className="onboarding-choices"
                aria-label={bills ? "Suggested bills" : "Suggested categories"}
              >
                {options.map((category) => (
                  <button
                    className="workspace-button"
                    key={category.name}
                    type="button"
                    disabled={
                      atLimit && !rows.some((row) => row.name === category.name)
                    }
                    aria-pressed={rows.some(
                      (row) => row.name === category.name
                    )}
                    onClick={() => toggle(category)}
                  >
                    <CategoryIcon name={category.icon} size={18} />
                    {category.name}
                  </button>
                ))}
              </div>
              {rows.length === 0 && (
                <p className="workspace-note">
                  {bills
                    ? "No bills selected."
                    : "Choose your first category above."}
                </p>
              )}
              {rows.map((row, index) => (
                <div className="onboarding-row" key={row.name}>
                  <div className="onboarding-category-name">
                    <CategoryIconPicker
                      label={`Change icon for ${row.name}`}
                      input={{
                        value: row.icon,
                        onBlur: () => {},
                        onChange: (icon) =>
                          changeRows(
                            rows.map((entry, position) =>
                              position === index
                                ? { ...entry, icon: icon || "star" }
                                : entry
                            )
                          ),
                      }}
                    />
                    <label htmlFor={`setup-amount-${index}`}>{row.name}</label>
                  </div>
                  <div className="onboarding-amount">
                    <span>{draft.currency}</span>
                    <input
                      id={`setup-amount-${index}`}
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.0001"
                      placeholder="0"
                      value={row[amountKey]}
                      aria-label={`${row.name} monthly ${bills ? "bill" : "budget"} in ${draft.currency}`}
                      onChange={(event) =>
                        changeRows(
                          rows.map((entry, position) =>
                            position === index
                              ? { ...entry, [amountKey]: event.target.value }
                              : entry
                          )
                        )
                      }
                    />
                  </div>
                  <button
                    className="workspace-button"
                    type="button"
                    aria-label={`Remove ${row.name}`}
                    onClick={() =>
                      changeRows(
                        rows.filter((_, position) => position !== index)
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="onboarding-custom">
                <CategoryIconPicker
                  label="Choose custom category icon"
                  input={{
                    value: newIcon,
                    onBlur: () => {},
                    onChange: (icon) => setNewIcon(icon || "star"),
                  }}
                />
                <label htmlFor="setup-custom-name">
                  Custom {bills ? "bill" : "category"}
                  <input
                    id="setup-custom-name"
                    value={newName}
                    maxLength={100}
                    onChange={(event) => setNewName(event.target.value)}
                  />
                </label>
                <button
                  className="workspace-button"
                  type="button"
                  onClick={addCustom}
                  disabled={!newName.trim() || atLimit}
                >
                  Add
                </button>
              </div>
            </>
          )}
        </fieldset>
        {error && (
          <p role="alert" className="workspace-field-error">
            {error}
          </p>
        )}
        <div className="onboarding-actions">
          {draft.step > 0 && (
            <button
              className="workspace-button"
              type="button"
              disabled={saving}
              onClick={() => {
                setError("");
                setNewName("");
                setDraft((value) => ({ ...value, step: value.step - 1 }));
              }}
            >
              Back
            </button>
          )}
          {bills && (
            <button
              className="workspace-button"
              type="button"
              disabled={saving}
              onClick={() => finish(true)}
            >
              Skip bills
            </button>
          )}
          <button
            className="workspace-button primary"
            type="submit"
            disabled={saving || overLimit}
          >
            {saving ? "Saving…" : submitLabel}
          </button>
        </div>
      </form>
    </WorkspacePage>
  );
}
