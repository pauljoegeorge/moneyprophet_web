import React, { useState } from "react";
import { Link } from "react-router-dom";
import useExpenseLocation from "../../utils/useExpenseLocation";
import ExpenseEntryNavigation from "../../components/ExpenseEntryNavigation";
import WorkspacePage from "../../components/WorkspacePage";
import Camera from "../../components/Camera";
import { useExpenses } from "../Expenses/hooks/useExpenses";

function AutoVisionTransactionContainer() {
  const location = useExpenseLocation();
  const [saved, setSaved] = useState(false);
  const { actions, isLoading } = useExpenses([]);

  const handleCapture = async (imageSrc) => {
    const valuesWithLocation = {
      expenses: {
        ...location,
        bill_image: imageSrc,
      },
    };
    const success = await actions.creatAutoeExpense(valuesWithLocation);
    if (success) setSaved(true);
    return success;
  };

  return (
    <WorkspacePage
      focused
      title="Read receipt"
      description="Capture a clear receipt to record your spending."
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
              <h2>Receipt saved</h2>
              <p>Your receipt has been recorded as an expense.</p>
              <button
                type="button"
                className="workspace-button primary"
                onClick={() => setSaved(false)}
              >
                Add another receipt
              </button>
            </div>
          ) : (
            <div className="w-full">
              <h2>Capture your receipt</h2>
              <p className="workspace-note">
                Keep the total and store name visible, with good lighting.
              </p>
              {isLoading && (
                <div className="flex justify-center mt-4">
                  <div
                    className="inline-block w-8 h-8 rounded-full animate-spin"
                    style={{
                      border: "4px solid var(--border)",
                      borderTopColor: "var(--primary)",
                    }}
                  />
                </div>
              )}
              <Camera onCapture={handleCapture} disabled={isLoading} />
            </div>
          )}
        </div>
      </div>
    </WorkspacePage>
  );
}

export default AutoVisionTransactionContainer;
