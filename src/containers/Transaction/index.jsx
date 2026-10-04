import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { PrimaryButton } from "../../components/Button";
import WorkspacePage from "../../components/WorkspacePage";
import CategoryChoices from "../../components/CategoryChoices";
import ExpenseEntryNavigation from "../../components/ExpenseEntryNavigation";
import { useExpenses } from "../Expenses/hooks/useExpenses";
import { useBudget } from "../ExpenseCategories/hooks/useBudget";
import useExpenseLocation from "../../utils/useExpenseLocation";
import Input from "../../components/Input";
import {
  getBeginningOfMonth,
  currentDate,
  getPastDate,
} from "../../utils/date";
import { getCurrencySymbol, formattedCurrency } from "../../utils/currency";

const requiredCategory = (value) => (value ? undefined : "Choose a category.");
const positiveAmount = (value) =>
  Number.isFinite(Number(value)) && Number(value) > 0
    ? undefined
    : "Enter an amount greater than zero.";
const createInitialValues = () => ({
  expenses: {
    category_uid: "",
    amount: "",
    transaction_date: currentDate(),
    notes: "",
  },
});

export default function TransactionsContainer() {
  const location = useExpenseLocation();
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(false);
  const [saved, setSaved] = useState(null);
  const [initialValues, setInitialValues] = useState(createInitialValues);
  const [entryNumber, setEntryNumber] = useState(0);
  const { actions, isLoading } = useExpenses();
  const { actions: budgetActions, fixedExpenseCategories } = useBudget();
  const options = fixedExpenseCategories.map((category) => ({
    value: category.uid,
    label: category.name,
    icon: category.icon,
  }));
  const loadCategories = async () => {
    setCategoriesLoading(true);
    setCategoriesError(false);
    try {
      await budgetActions.getExpenseCategories(getBeginningOfMonth());
    } catch {
      setCategoriesError(true);
    }
    setCategoriesLoading(false);
  };
  useEffect(() => {
    loadCategories();
  }, []);
  const submit = async (values) => {
    const success = await actions.createExpense({
      ...values,
      expenses: { ...values.expenses, ...location },
    });
    if (success)
      setSaved({
        ...values.expenses,
        category_name: options.find(
          (option) => option.value === values.expenses.category_uid,
        )?.label,
      });
  };
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
          render={({ handleSubmit, values, valid, form }) => (
            <form
              onSubmit={handleSubmit}
              className="workspace-card workspace-form-card"
              aria-busy={isLoading}
            >
              {saved ? (
                <div className="workspace-saved-state" role="status">
                  <CheckCircle2 size={36} />
                  <h2>Expense saved</h2>
                  <p>
                    {saved.category_name} ·{" "}
                    {formattedCurrency(Number(saved.amount))}
                  </p>
                  <div className="workspace-page-actions">
                    <button
                      type="button"
                      className="workspace-button primary"
                      onClick={() => {
                        setInitialValues({
                          expenses: {
                            ...initialValues.expenses,
                            category_uid: saved.category_uid,
                            transaction_date: currentDate(),
                          },
                        });
                        setEntryNumber((value) => value + 1);
                        setSaved(null);
                      }}
                    >
                      Add another expense
                    </button>
                    <Link className="workspace-button" to="/expenses">
                      View expenses
                    </Link>
                  </div>
                </div>
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
                  {!categoriesLoading &&
                    !categoriesError &&
                    options.length === 0 && (
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
                  {!categoriesLoading &&
                    !categoriesError &&
                    options.length > 0 && (
                      <>
                        <Field
                          name="expenses.category_uid"
                          component={CategoryChoices}
                          options={options}
                          validate={requiredCategory}
                          disabled={isLoading}
                        />
                        <div className="workspace-entry-fields">
                          <Field
                            name="expenses.amount"
                            label={`Amount (${getCurrencySymbol()})`}
                            component={Input}
                            type="number"
                            inputMode="decimal"
                            step="any"
                            min="0.01"
                            placeholder="0"
                            validate={positiveAmount}
                          />
                          <div>
                            <div
                              className="workspace-quick-dates"
                              role="group"
                              aria-label="Quick date"
                            >
                              <button
                                type="button"
                                className="workspace-button"
                                aria-pressed={
                                  values.expenses.transaction_date ===
                                  currentDate()
                                }
                                onClick={() =>
                                  form.change(
                                    "expenses.transaction_date",
                                    currentDate(),
                                  )
                                }
                              >
                                Today
                              </button>
                              <button
                                type="button"
                                className="workspace-button"
                                aria-pressed={
                                  values.expenses.transaction_date ===
                                  getPastDate(1, "days")
                                }
                                onClick={() =>
                                  form.change(
                                    "expenses.transaction_date",
                                    getPastDate(1, "days"),
                                  )
                                }
                              >
                                Yesterday
                              </button>
                            </div>
                            <Field
                              name="expenses.transaction_date"
                              label="Date"
                              type="date"
                              validate={(value) =>
                                value ? undefined : "Choose a date."
                              }
                              component={Input}
                            />
                          </div>
                          <div className="workspace-entry-notes">
                            <Field
                              name="expenses.notes"
                              label="Notes (optional)"
                              placeholder="What was it for?"
                              component={Input}
                            />
                          </div>
                        </div>
                        <div className="workspace-form-footer">
                          <p className="workspace-note">
                            {options.find(
                              (option) =>
                                option.value === values.expenses.category_uid,
                            )?.label || "Choose a category"}
                            {Number(values.expenses.amount) > 0
                              ? ` · ${formattedCurrency(Number(values.expenses.amount))}`
                              : ""}
                          </p>
                          <PrimaryButton
                            size="lg"
                            type="submit"
                            disabled={!valid || isLoading}
                          >
                            {isLoading ? "Saving…" : "Save expense"}
                          </PrimaryButton>
                        </div>
                      </>
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
