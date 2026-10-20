import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

export default function CurrentSpendingStats({ insights, totalBudget, money }) {
  return (
    <section
      aria-label="Current spending and quotas"
      className="workspace-current-stats"
    >
      <div className="workspace-card workspace-period-stat">
        <div className="workspace-stat-label">Spent today</div>
        <div className="workspace-value">{money(insights.todays_expense)}</div>
        <div className="workspace-note">{moment().format("MMM D")}</div>
      </div>
      <div className="workspace-card workspace-period-stat">
        <div className="workspace-stat-label">Spent this week</div>
        <div className="workspace-value">{money(insights.weekly_expense)}</div>
        <div className="workspace-note">This calendar week</div>
      </div>
      <div className="workspace-card workspace-period-stat">
        <div className="workspace-stat-label">Daily quota left</div>
        <div className="workspace-value">
          {totalBudget > 0 ? money(insights.allowance_per_day) : "—"}
        </div>
        <div className="workspace-note">
          {totalBudget > 0
            ? "Based on your remaining monthly budget"
            : "Set a budget to see your quota"}
        </div>
      </div>
      <div className="workspace-card workspace-period-stat">
        <div className="workspace-stat-label">Weekly quota left</div>
        <div className="workspace-value">
          {totalBudget > 0 ? money(insights.allowance_per_week) : "—"}
        </div>
        <div className="workspace-note">
          {totalBudget > 0
            ? "Based on your remaining monthly budget"
            : "Set a budget to see your quota"}
        </div>
      </div>
    </section>
  );
}
CurrentSpendingStats.propTypes = {
  insights: PropTypes.shape({
    todays_expense: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    weekly_expense: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    allowance_per_day: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    allowance_per_week: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  totalBudget: PropTypes.number.isRequired,
  money: PropTypes.func.isRequired,
};
