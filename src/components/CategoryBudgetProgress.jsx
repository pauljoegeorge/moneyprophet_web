import React from "react";
import PropTypes from "prop-types";
import { formattedCurrency } from "../utils/currency";

export default function CategoryBudgetProgress({ name, budget, spent }) {
  const limit = Number(budget);
  const used = Number(spent);
  if (
    budget == null ||
    budget === "" ||
    spent == null ||
    spent === "" ||
    !Number.isFinite(limit) ||
    !Number.isFinite(used) ||
    limit < 0
  ) {
    return (
      <p className="workspace-budget-progress">
        Spending progress unavailable.
      </p>
    );
  }

  const remaining = limit - used;
  const percentage = limit > 0 ? (used / limit) * 100 : 0;
  let color = "var(--success)";
  let status = "Within budget";
  if (used > limit) {
    color = "var(--destructive)";
    status = "Over budget";
  } else if (limit === 0) {
    status = "No budget set";
  } else if (used === limit) {
    color = "var(--warning)";
    status = "Budget reached";
  } else if (percentage >= 80) {
    color = "var(--warning)";
    status = "Approaching budget";
  }
  const balance =
    remaining < 0
      ? `${formattedCurrency(-remaining)} over budget`
      : `${formattedCurrency(remaining)} left`;
  const usage = limit > 0 ? `${Math.round(percentage)}% used · ` : "";
  const width =
    limit === 0 && used > 0 ? 100 : Math.min(100, Math.max(0, percentage));

  return (
    <div
      className="workspace-budget-progress"
      style={{ "--budget-progress-color": color }}
    >
      <div className="workspace-budget-progress-details">
        <span>{formattedCurrency(used)} spent</span>
        <strong>{balance}</strong>
      </div>
      <div
        className="workspace-budget-progress-track"
        role="progressbar"
        aria-label={`${name} budget`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={width}
        aria-valuetext={`${formattedCurrency(used)} spent. ${balance}. ${status}.`}
      >
        <span style={{ width: `${width}%` }} />
      </div>
      <span className="workspace-budget-progress-status">
        {usage}
        {status}
      </span>
    </div>
  );
}

CategoryBudgetProgress.propTypes = {
  name: PropTypes.string.isRequired,
  budget: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  spent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

CategoryBudgetProgress.defaultProps = { budget: null, spent: null };
