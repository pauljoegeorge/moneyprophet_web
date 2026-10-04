import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";
import useExpenseLocation from "../../utils/useExpenseLocation";
import ExpenseEntryNavigation from "../../components/ExpenseEntryNavigation";
import WorkspacePage from "../../components/WorkspacePage";
import { useExpenses } from "../Expenses/hooks/useExpenses";
import TextArea from "../../components/TextArea";

function AutoTransactionContainer() {
  const location = useExpenseLocation();
  const [saved, setSaved] = useState(false);
  const { actions, isLoading } = useExpenses([]);
  const [initialValues] = useState(() => ({ expenses: { notes: "" } }));

  const handleSubmit = async (values) => {
    const valuesWithLocation = {
      ...values,
      expenses: {
        ...values.expenses,
        ...location,
      },
    };
    const success = await actions.creatAutoeExpense(valuesWithLocation);
    if (success) setSaved(true);
    return success;
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit: formHandleSubmit, form }) => {
        const { pristine, valid } = form.getState();
        return (
          <form onSubmit={formHandleSubmit}>
            <WorkspacePage
              focused
              title="Text entry"
              description="Write what you spent. We’ll turn it into an expense."
              actions={
                <Link className="workspace-button" to="/expenses">
                  View expenses
                </Link>
              }
            >
              <div className="workspace-entry-card">
                <ExpenseEntryNavigation />
                <div className="workspace-card workspace-form-card">
                  {saved ? (
                    <div className="workspace-saved-state" role="status">
                      <h2>Expense saved</h2>
                      <p>Your description has been recorded.</p>
                      <button
                        type="button"
                        className="workspace-button primary"
                        onClick={() => {
                          form.restart(initialValues);
                          setSaved(false);
                        }}
                      >
                        Add another expense
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center mt-4 w-full">
                        <div className="w-full max-w-lg">
                          <Field
                            name="expenses.notes"
                            label="What did you spend?"
                            placeholder="For example: Coffee 650 at the corner café"
                            component={TextArea}
                            rows={6}
                          />
                        </div>
                      </div>
                      <p className="workspace-note">
                        Include what you bought and the amount. Add a store name
                        if helpful.
                      </p>
                      <div className="workspace-form-footer">
                        <PrimaryButton
                          size="lg"
                          type="submit"
                          disabled={
                            pristine ||
                            !valid ||
                            !form.getState().values.expenses.notes.trim() ||
                            isLoading
                          }
                        >
                          {isLoading ? "Saving…" : "Save expense"}
                        </PrimaryButton>
                      </div>
                    </>
                  )}{" "}
                </div>
              </div>
            </WorkspacePage>
          </form>
        );
      }}
    />
  );
}

export default AutoTransactionContainer;
