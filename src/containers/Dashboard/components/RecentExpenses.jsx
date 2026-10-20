import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import CategoryIcon from "../../../components/CategoryIcon";

export default function RecentExpenses({
  month,
  recent,
  recentError,
  money,
  onRetry,
}) {
  return (
    <section className="workspace-card">
      <div className="workspace-card-header">
        <h2>Recent expenses</h2>
        <Link to={`/expenses?date=${month}`}>View all expenses ↗</Link>
      </div>
      {recentError && (
        <div className="workspace-empty">
          We couldn&apos;t load your recent expenses.{" "}
          <button type="button" className="workspace-button" onClick={onRetry}>
            Retry
          </button>
        </div>
      )}
      {!recentError &&
        (recent.length === 0 ? (
          <div className="workspace-empty">
            No expenses recorded this month.{" "}
            <Link to="/new">Add an expense</Link> to get started.
          </div>
        ) : (
          recent.map((expense) => (
            <div className="workspace-transaction" key={expense.uid}>
              <span className="workspace-transaction-icon">
                <CategoryIcon name={expense.category_icon} />
              </span>
              <div>
                <div className="workspace-transaction-name">
                  {expense.notes || expense.category_name}
                </div>
                <div className="workspace-note">
                  {expense.category_name} ·{" "}
                  {moment(expense.transaction_date).format("MMM D")}
                </div>
              </div>
              <span className="workspace-transaction-amount">
                {money(expense.amount)}
              </span>
            </div>
          ))
        ))}
    </section>
  );
}
RecentExpenses.propTypes = {
  month: PropTypes.string.isRequired,
  recent: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  recentError: PropTypes.bool.isRequired,
  money: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
};
