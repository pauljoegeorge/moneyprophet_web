import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

export default function DashboardSummary({ month, hidden, money, metrics }) {
  const {
    totalBudget,
    remaining,
    current,
    daysInMonth,
    daysElapsed,
    totalExpense,
    categoryExpense,
    averageLabel,
    averageNote,
  } = metrics;
  return (
    <div className="workspace-stats">
      <section className="workspace-card workspace-stat hero">
        <div className="workspace-stat-label">Remaining monthly budget</div>
        <div className="workspace-value">
          {totalBudget > 0 ? money(remaining) : "No budget set"}
        </div>
        <div className="workspace-note">
          {totalBudget > 0
            ? `of ${money(totalBudget)}${current ? ` · ${daysInMonth - daysElapsed} days after today` : ""}`
            : "Create a budget to give your spending a plan."}
        </div>
        {totalBudget <= 0 && (
          <Link
            className="workspace-button"
            to="/budget"
            style={{ marginTop: 12 }}
          >
            Set up budget
          </Link>
        )}
      </section>
      <section className="workspace-card workspace-stat">
        <div className="workspace-stat-label">Spent this month</div>
        <div className="workspace-value">{money(totalExpense)}</div>
        <div className="workspace-note">Includes fixed bills</div>
        {totalBudget > 0 ? (
          <span className="workspace-badge">
            {hidden
              ? "••••"
              : `${Math.round((categoryExpense / totalBudget) * 100)}% of category budget used`}
          </span>
        ) : (
          <span className="workspace-note">
            {moment(month).format("MMMM YYYY")}
          </span>
        )}
      </section>
      <section className="workspace-card workspace-stat">
        <div className="workspace-stat-label">Daily average</div>
        <div className="workspace-value">{averageLabel}</div>
        <div className="workspace-note">{averageNote}</div>
      </section>
    </div>
  );
}
DashboardSummary.propTypes = {
  month: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  money: PropTypes.func.isRequired,
  metrics: PropTypes.shape({
    totalBudget: PropTypes.number,
    remaining: PropTypes.number,
    current: PropTypes.bool,
    daysInMonth: PropTypes.number,
    daysElapsed: PropTypes.number,
    totalExpense: PropTypes.number,
    categoryExpense: PropTypes.number,
    averageLabel: PropTypes.string,
    averageNote: PropTypes.string,
  }).isRequired,
};
