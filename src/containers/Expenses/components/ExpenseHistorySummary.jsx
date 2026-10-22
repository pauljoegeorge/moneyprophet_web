import React from "react";
import PropTypes from "prop-types";
import { MonthNavigation } from "../../../components/WorkspacePage";
import PrivateTotal from "../../../components/PrivateTotal";

export default function ExpenseHistorySummary({
  totalExpense,
  expenses,
  isFiltered,
  selectedMonth,
  handleMonthChange,
}) {
  const totalLabel = isFiltered ? "Filtered total spent" : "Total spent";

  return (
    <div className="workspace-plan-summary">
      <div>
        <span>{totalLabel}</span>
        <PrivateTotal
          value={totalExpense}
          label={totalLabel}
          storageKey="mp-expenses-total-private"
        />
        <p>
          {expenses.length} {expenses.length === 1 ? "expense" : "expenses"}{" "}
          {isFiltered ? "matching your search" : "this month"}
        </p>
      </div>
      <MonthNavigation month={selectedMonth} onChange={handleMonthChange} />
    </div>
  );
}
ExpenseHistorySummary.propTypes = {
  totalExpense: PropTypes.string.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedMonth: PropTypes.string,
  handleMonthChange: PropTypes.func.isRequired,
};

ExpenseHistorySummary.defaultProps = { selectedMonth: undefined };
