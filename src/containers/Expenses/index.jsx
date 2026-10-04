import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import moment from "moment";
import { Link } from "react-router-dom";
import { Download, Plus } from "lucide-react";
import InputSelect from "../../components/InputSelect";
import { PrimaryButton } from "../../components/Button";
import WorkspacePage, { MonthNavigation } from "../../components/WorkspacePage";

import { useExpenses } from "./hooks/useExpenses";
import { useBudget } from "../ExpenseCategories/hooks/useBudget";
import Input from "../../components/Input";
import { useValidations } from "../../utils/validation";

import {
  appendUrlToDate,
  addDateToUrl,
  formattedDate,
} from "../../utils/utils";
import { formattedCurrency } from "../../utils/currency";

import { getDefaultExpenseSortParams } from "./utils/utils";
import ExpensesViewMode from "./ExpenseViewMode";
import PrivateTotal from "../../components/PrivateTotal";

function ExpensesContainer() {
  const [selectedMonth, setSelectedMonth] = useState();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState(true);
  const [sortParams, setSortParams] = useState(getDefaultExpenseSortParams());
  const { number } = useValidations();
  const { actions, expenses, isLoading } = useExpenses([]);
  const { actions: budgetActions, fixedExpenseCategories } = useBudget([]);
  const initialValues = { expenses };
  const visibleExpenses = expenses.filter((expense) =>
    [
      expense.category_name,
      expense.notes,
      expense.amount,
      expense.transaction_date,
    ].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
    ),
  );
  const fixedExpenseOptions = Object.keys(fixedExpenseCategories).map(
    (ind) => ({
      value: fixedExpenseCategories[ind].uid,
      label: fixedExpenseCategories[ind].name,
      icon: fixedExpenseCategories[ind].icon,
    }),
  );

  useEffect(() => {
    const month = addDateToUrl();
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const query = new URLSearchParams(window.location.search);
      const category = query.get("category") || "";
      setSortParams(getDefaultExpenseSortParams());
      actions.getExpenses(selectedMonth, category);
      budgetActions.getExpenseCategories(selectedMonth);
    }
  }, [selectedMonth]);

  const handleMonthChange = (direction) => {
    const nextMonth =
      direction === "next"
        ? formattedDate(moment(selectedMonth).add(1, "months"))
        : formattedDate(moment(selectedMonth).subtract(1, "months"));
    appendUrlToDate(nextMonth);
    return setSelectedMonth(nextMonth);
  };

  const handleSortExpenses = (sortBy, sortOrder) => {
    const query = new URLSearchParams(window.location.search);
    const category = query.get("category") || "";
    actions.getExpenses(selectedMonth, category, sortBy, sortOrder);
  };

  const handleExportReport = () => {
    actions.exportExpenses(selectedMonth);
  };

  const handleSubmit = (values) => {
    return actions.updateExpenses(values, selectedMonth);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit: formHandleSubmit, form: { getState } }) => {
        const { pristine, valid, values } = getState();
        const totalExpense = formattedCurrency(
          values.expenses.reduce(
            (total, expense) => total + parseInt(expense.amount || 0, 10),
            0,
          ),
        );
        return (
          <form onSubmit={formHandleSubmit}>
            <WorkspacePage
              title="Expenses"
              description="Your spending, with room to see the details."
              actions={
                <Link className="workspace-button primary" to="/new">
                  <Plus size={16} />
                  Add expense
                </Link>
              }
            >
              <div className="workspace-plan-summary">
                <div>
                  <span>Total spent</span>
                  <PrivateTotal value={totalExpense} label="Total spent" storageKey="mp-expenses-total-private" />
                  <p>
                    {expenses.length}{" "}
                    {expenses.length === 1 ? "expense" : "expenses"} this month
                  </p>
                </div>
                <MonthNavigation
                  month={selectedMonth}
                  onChange={handleMonthChange}
                />
              </div>
              <div className="workspace-card workspace-form-card">
                <div className="workspace-card-header">
                  <div>
                    <h2>Spending history</h2>
                    <p className="workspace-note">
                      Review transactions or edit the details below.
                    </p>
                  </div>
                  <div className="workspace-page-actions">
                    <div className="workspace-segmented">
                      <button
                        type="button"
                        aria-pressed={viewMode}
                        onClick={() => setViewMode(true)}
                      >
                        Browse
                      </button>
                      <button
                        type="button"
                        aria-pressed={!viewMode}
                        onClick={() => setViewMode(false)}
                      >
                        Edit
                      </button>
                    </div>
                    <button
                      type="button"
                      className="workspace-button"
                      disabled={isLoading}
                      onClick={handleExportReport}
                    >
                      <Download size={16} />
                      Export CSV
                    </button>
                  </div>
                </div>
                {expenses.length === 0 && (
                  <div className="workspace-empty">
                    <p>No expenses for this month yet.</p>
                    <Link className="workspace-button" to="/new">
                      Add your first expense
                    </Link>
                  </div>
                )}
                {viewMode && expenses.length > 0 && (
                  <div className="workspace-list-search">
                    <input
                      className="workspace-search"
                      type="search"
                      aria-label="Search expenses"
                      placeholder="Search category, note, amount, or date…"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                    <span className="workspace-note">
                      {visibleExpenses.length} of {expenses.length} expenses
                    </span>
                  </div>
                )}
                {viewMode &&
                  visibleExpenses.length === 0 &&
                  expenses.length > 0 && (
                    <div className="workspace-empty">
                      <p>No expenses match your search.</p>
                      <button
                        className="workspace-button"
                        type="button"
                        onClick={() => setSearch("")}
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                {viewMode ? (
                  <div style={{ width: "100%", padding: "0 16px" }}>
                    <ExpensesViewMode
                      expenses={visibleExpenses}
                      handleSortExpenses={handleSortExpenses}
                      sortParams={sortParams}
                      setSortParams={setSortParams}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="mt-4 w-full">
                      {/* eslint-disable react/no-array-index-key */}
                      {(initialValues.expenses || []).map((_, index) => (
                        <div key={index} className="workspace-expense-edit-row">
                          <Field
                            name={`expenses[${index}].category_uid`}
                            component={InputSelect}
                            options={fixedExpenseOptions}
                            label="Category"
                          />
                          <Field
                            name={`expenses[${index}].amount`}
                            component={Input}
                            validate={number}
                            label="Amount"
                          />
                          <Field
                            name={`expenses[${index}].transaction_date`}
                            component={Input}
                            type="date"
                            label="Date"
                          />
                          <Field
                            name={`expenses[${index}].notes`}
                            component={Input}
                            label="Notes"
                          />
                        </div>
                      ))}
                      <div className="flex justify-center mt-8 w-full">
                        <PrimaryButton
                          size="lg"
                          className="w-50"
                          type="submit"
                          disabled={pristine || !valid || isLoading}
                        >
                          {isLoading ? "Saving…" : "Save changes"}
                        </PrimaryButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </WorkspacePage>
          </form>
        );
      }}
    />
  );
}

export default ExpensesContainer;
