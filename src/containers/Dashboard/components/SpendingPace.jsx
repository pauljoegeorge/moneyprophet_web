import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { TrendingUp } from "lucide-react";
import SpendingChart from "./SpendingChart";

export default function SpendingPace({
  month,
  hidden,
  money,
  insights,
  metrics,
}) {
  const { spending, remaining, totalBudget, dailyAverage, current } = metrics;
  return (
    <section className="workspace-card">
      <div className="workspace-card-header">
        <h2>Spending pace</h2>
        <span className="workspace-note">{moment(month).format("MMMM")}</span>
      </div>
      {hidden && (
        <div className="workspace-empty">Chart hidden for privacy.</div>
      )}
      {!hidden &&
        (spending.length === 0 ? (
          <div className="workspace-empty">
            Add your first expense to see your spending over time.
          </div>
        ) : (
          <div
            role="img"
            aria-label="Cumulative spending for the selected month"
          >
            <SpendingChart spending={spending} />
          </div>
        ))}
      <div className="workspace-callout">
        <TrendingUp size={18} aria-hidden="true" />
        <div>
          <div className="workspace-transaction-name">
            {remaining < 0 && totalBudget > 0
              ? "Spending is over budget"
              : "A clearer view of your month"}
          </div>
          <div className="workspace-note">
            {totalBudget > 0
              ? `Daily average: ${dailyAverage === null ? "—" : money(dailyAverage)}${current ? ` · Weekly allowance: ${money(insights.allowance_per_week)}` : ""}`
              : "Set category budgets to start tracking your remaining allowance."}
          </div>
        </div>
      </div>
    </section>
  );
}
SpendingPace.propTypes = {
  month: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  money: PropTypes.func.isRequired,
  insights: PropTypes.shape({
    allowance_per_week: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  metrics: PropTypes.shape({
    spending: PropTypes.arrayOf(PropTypes.shape({})),
    remaining: PropTypes.number,
    totalBudget: PropTypes.number,
    dailyAverage: PropTypes.number,
    current: PropTypes.bool,
  }).isRequired,
};
