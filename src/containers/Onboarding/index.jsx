import React from "react";
import WorkspacePage from "../../components/WorkspacePage";
import CategorySetup from "./components/CategorySetup";
import useOnboarding from "./hooks/useOnboarding";

const titles = [
  "Choose your currency",
  "Review your monthly budgets",
  "Add recurring bills",
];

export default function Onboarding() {
  const {
    config,
    draft,
    setDraft,
    loadError,
    retryLoad,
    error,
    saving,
    heading,
    selection,
    finish,
    next,
    back,
  } = useOnboarding();
  const { bills } = selection;
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
              onClick={retryLoad}
            >
              Retry
            </button>
          )}
        </div>
      </WorkspacePage>
    );
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
            <CategorySetup {...selection} currency={draft.currency} />
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
              onClick={back}
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
            disabled={saving || selection.overLimit}
          >
            {saving ? "Saving…" : submitLabel}
          </button>
        </div>
      </form>
    </WorkspacePage>
  );
}
