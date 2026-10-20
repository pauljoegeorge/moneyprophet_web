import React from "react";
import PropTypes from "prop-types";
import DailyExpenseReport from "./DailyExpenseReport";
import WeeklyExpenseReport from "./WeeklyExpenseReport";
import ExpenseInsight from "./ExpenseInsight";

export default function DashboardReports({ insights }) {
  return (
    <details className="workspace-reports" open>
      <summary>Detailed spending reports</summary>
      <div className="workspace-panels">
        <section className="workspace-card">
          <DailyExpenseReport dailyReport={insights.daily_report || {}} />
        </section>
        <section className="workspace-card">
          <WeeklyExpenseReport weeklyReport={insights.weekly_report || {}} />
        </section>
      </div>
      <section className="workspace-card">
        <ExpenseInsight expenseInsights={insights} />
      </section>
    </details>
  );
}
DashboardReports.propTypes = {
  insights: PropTypes.shape({
    daily_report: PropTypes.shape({}),
    weekly_report: PropTypes.shape({}),
  }).isRequired,
};
