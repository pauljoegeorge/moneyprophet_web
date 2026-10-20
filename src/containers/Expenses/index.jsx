import React from "react";
import { Form } from "react-final-form";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import WorkspacePage from "../../components/WorkspacePage";
import { formattedCurrency } from "../../utils/currency";
import ExpensesViewMode from "./ExpenseViewMode";
import ExpenseHistoryEditor from "./components/ExpenseHistoryEditor";
import ExpenseHistoryHeader from "./components/ExpenseHistoryHeader";
import ExpenseHistorySummary from "./components/ExpenseHistorySummary";
import useExpenseHistory from "./hooks/useExpenseHistory";

function ExpensesContainer() {
  const {
    selectedMonth,
    search,
    setSearch,
    viewMode,
    setViewMode,
    sortParams,
    setSortParams,
    expenses,
    isLoading,
    initialValues,
    visibleExpenses,
    noSearchResults,
    fixedExpenseOptions,
    handleMonthChange,
    handleSortExpenses,
    handleExportReport,
    handleSubmit,
  } = useExpenseHistory();

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit: formHandleSubmit, form: { getState } }) => {
        const { pristine, valid, values } = getState();
        const totalExpense = formattedCurrency(
          values.expenses.reduce(
            (total, expense) => total + Number(expense.amount || 0),
            0
          )
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
              <ExpenseHistorySummary
                totalExpense={totalExpense}
                expenses={expenses}
                selectedMonth={selectedMonth}
                handleMonthChange={handleMonthChange}
              />
              <div className="workspace-card workspace-form-card">
                <ExpenseHistoryHeader
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  isLoading={isLoading}
                  handleExportReport={handleExportReport}
                />
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
                {noSearchResults && (
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
                  <div className="workspace-expense-history">
                    <ExpensesViewMode
                      expenses={visibleExpenses}
                      handleSortExpenses={handleSortExpenses}
                      sortParams={sortParams}
                      setSortParams={setSortParams}
                    />
                  </div>
                ) : (
                  <ExpenseHistoryEditor
                    expenses={expenses}
                    fixedExpenseOptions={fixedExpenseOptions}
                    pristine={pristine}
                    valid={valid}
                    isLoading={isLoading}
                  />
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
