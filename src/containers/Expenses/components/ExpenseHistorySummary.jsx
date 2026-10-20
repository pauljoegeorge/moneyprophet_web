import React from "react";
import PropTypes from "prop-types";
import { MonthNavigation } from "../../../components/WorkspacePage";
import PrivateTotal from "../../../components/PrivateTotal";

export default function ExpenseHistorySummary({
  totalExpense,
  expenses,
  selectedMonth,
  handleMonthChange,
}) {
  return (
    <div className="workspace-plan-summary">
      <div>
        <span>Total spent</span>
        <PrivateTotal
          value={totalExpense}
          label="Total spent"
          storageKey="mp-expenses-total-private"
        />
        <p>
          {expenses.length} {expenses.length === 1 ? "expense" : "expenses"}{" "}
          this month
        </p>
      </div>
      <MonthNavigation month={selectedMonth} onChange={handleMonthChange} />
    </div>
  );
}
ExpenseHistorySummary.propTypes = {
  totalExpense: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedMonth: PropTypes.string,
  handleMonthChange: PropTypes.func.isRequired,
};

ExpenseHistorySummary.defaultProps = { selectedMonth: undefined };
