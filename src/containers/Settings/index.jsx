import React from "react";
import { Form, Field } from "react-final-form";
import { UserRound, Globe } from "lucide-react";
import WorkspacePage from "../../components/WorkspacePage";
import { PrimaryButton } from "../../components/Button";
import InputSelect from "../../components/InputSelect";
import { currencies } from "../../utils/currency";
import { useOAuth } from "../Login/hooks/useOAuth";
import { constants } from "../../utils/constants";

export default function SettingsContainer() {
  const { actions, currentUser, isLoading } = useOAuth();
  const options = currencies.map((currency) => ({
    value: currency.code,
    label: `${currency.code} · ${currency.name} (${currency.symbol})`,
  }));
  return (
    <WorkspacePage
      focused
      title="Settings"
      description="Make this workspace feel like yours."
    >
      <div className="workspace-settings-grid">
        <div className="workspace-card workspace-form-card">
          <div className="workspace-settings-icon">
            <UserRound size={22} />
          </div>
          <h2>Your account</h2>
          <strong>{currentUser?.name || "Personal workspace"}</strong>
          {currentUser?.email && (
            <p className="workspace-note">{currentUser.email}</p>
          )}
        </div>
        <Form
          initialValues={{
            currency_unit:
              currentUser?.currency_unit || constants.defaultCurrency,
          }}
          onSubmit={(values) => actions.updateCurrentUser(values)}
          render={({ handleSubmit, pristine, valid }) => (
            <form
              className="workspace-card workspace-form-card"
              onSubmit={handleSubmit}
            >
              <div className="workspace-settings-icon">
                <Globe size={22} />
              </div>
              <h2>Currency preferences</h2>
              <p className="workspace-note">
                Choose the currency used to display amounts across your
                workspace.
              </p>
              <Field
                name="currency_unit"
                component={InputSelect}
                label="Currency"
                options={options}
              />
              <div className="workspace-form-footer">
                <PrimaryButton
                  type="submit"
                  disabled={pristine || !valid || isLoading}
                >
                  {isLoading ? "Saving…" : "Save preferences"}
                </PrimaryButton>
              </div>
            </form>
          )}
        />
      </div>
    </WorkspacePage>
  );
}
