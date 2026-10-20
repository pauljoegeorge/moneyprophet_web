import React from "react";
import { Form } from "react-final-form";
import { Link } from "react-router-dom";
import WorkspacePage from "../../components/WorkspacePage";
import ExpenseEntryNavigation from "../../components/ExpenseEntryNavigation";
import ExpenseFields from "./components/ExpenseFields";
import SavedExpense from "./components/SavedExpense";
import useExpenseEntry from "./hooks/useExpenseEntry";

export default function TransactionsContainer() {
  const {
    categoriesLoading,
    categoriesError,
    saved,
    initialValues,
    entryNumber,
    options,
    isLoading,
    loadCategories,
    submit,
    categoriesEmpty,
    categoriesReady,
    addAnother,
  } = useExpenseEntry();

  return (
    <WorkspacePage
      focused
      title="Add expense"
      description="Pick a category. Enter the amount. You’re done."
      actions={
        <Link className="workspace-button" to="/expenses">
          View expenses
        </Link>
      }
    >
      <div className="workspace-entry-card">
        <ExpenseEntryNavigation />
        <Form
          key={entryNumber}
          initialValues={initialValues}
          onSubmit={submit}
          render={({ handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="workspace-card workspace-form-card"
              aria-busy={isLoading}
            >
              {saved ? (
                <SavedExpense saved={saved} onAddAnother={addAnother} />
              ) : (
                <>
                  {categoriesLoading && (
                    <p className="workspace-empty" role="status">
                      Loading categories…
                    </p>
                  )}
                  {categoriesError && (
                    <div className="workspace-empty" role="alert">
                      <p>Couldn’t load your categories.</p>
                      <button
                        className="workspace-button"
                        type="button"
                        onClick={loadCategories}
                      >
                        Try again
                      </button>
                    </div>
                  )}
                  {categoriesEmpty && (
                    <div className="workspace-empty">
                      <h2>Start with a category</h2>
                      <p>
                        Create your monthly budget categories before recording
                        expenses.
                      </p>
                      <Link className="workspace-button primary" to="/budget">
                        Set up monthly budget
                      </Link>
                    </div>
                  )}
                  {categoriesReady && (
                    <ExpenseFields options={options} isLoading={isLoading} />
                  )}
                </>
              )}
            </form>
          )}
        />
      </div>
    </WorkspacePage>
  );
}
