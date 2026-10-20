import moment from "moment";
import { getReportingPeriod } from "./reportingPeriod";

export default function dashboardMetrics(insights, month, money) {
  const cats = insights?.expense_by_categories || [];
  const totalBudget = cats.reduce(
    (sum, cat) => sum + Number(cat.budget || 0),
    0
  );
  const totalExpense = Number(insights?.total_monthly_expense || 0);
  const categoryExpense = cats.reduce(
    (sum, cat) => sum + Number(cat.total_expense || 0),
    0
  );
  const remaining = totalBudget - categoryExpense;
  const { daysElapsed, daysInMonth } = getReportingPeriod(month);
  const current = moment(month).isSame(moment(), "month");
  const dailyAverage = daysElapsed ? totalExpense / daysElapsed : null;
  const activeCats = cats.filter(
    (cat) => cat.budget > 0 || cat.total_expense > 0
  );
  let cumulative = 0;
  const spending = Object.entries(insights?.daily_report || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, value]) => {
      cumulative += Number(value) || 0;
      return { day, spent: cumulative };
    });

  const averageLabel = dailyAverage === null ? "—" : money(dailyAverage);
  const averageNote = daysElapsed
    ? `Across ${daysElapsed} days`
    : "This month hasn't started";
  return {
    totalBudget,
    totalExpense,
    categoryExpense,
    remaining,
    daysElapsed,
    daysInMonth,
    current,
    dailyAverage,
    activeCats,
    spending,
    averageLabel,
    averageNote,
  };
}
