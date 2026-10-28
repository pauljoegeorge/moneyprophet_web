import React from "react";
import { useAccount } from "../../contexts/AccountContext";
import useDashboard from "./hooks/useDashboard";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSummary from "./components/DashboardSummary";
import CurrentSpendingStats from "./components/CurrentSpendingStats";
import SpendingPace from "./components/SpendingPace";
import DashboardBudgets from "./components/DashboardBudgets";
import FrequentPurchases from "./components/FrequentPurchases";
import RecentExpenses from "./components/RecentExpenses";
import DashboardReports from "./components/DashboardReports";
import QuickExpense from "./components/QuickExpense";

export default function DashboardContainer() {
  const { user } = useAccount();
  const dashboard = useDashboard(user.expense_start_date);
  const { month, hidden, money, loading, error, insights, metrics, onRetry } =
    dashboard;
  return (
    <div className="workspace-overview">
      <DashboardHeader
        month={month}
        firstMonth={dashboard.firstMonth}
        changeMonth={dashboard.changeMonth}
        hidden={hidden}
        togglePrivacy={dashboard.togglePrivacy}
      />
      {loading && (
        <div className="workspace-card workspace-empty" role="status">
          Loading your overview…
        </div>
      )}
      {!loading && error && (
        <div className="workspace-card" role="alert">
          <p>{error}</p>
          <button className="workspace-button" type="button" onClick={onRetry}>
            Retry
          </button>
        </div>
      )}
      {!loading && !error && insights && (
        <>
          <DashboardSummary
            month={month}
            hidden={hidden}
            money={money}
            metrics={metrics}
          />
          {metrics.current && (
            <CurrentSpendingStats
              insights={insights}
              totalBudget={metrics.totalBudget}
              money={money}
            />
          )}
          <div className="workspace-panels">
            <SpendingPace
              month={month}
              hidden={hidden}
              money={money}
              insights={insights}
              metrics={metrics}
            />
            <DashboardBudgets
              month={month}
              hidden={hidden}
              money={money}
              activeCats={metrics.activeCats}
            />
          </div>
          <FrequentPurchases
            purchases={insights.popular_transactions}
            money={money}
          />
          <RecentExpenses
            month={month}
            money={money}
            recent={dashboard.recent}
            recentError={dashboard.recentError}
            onRetry={onRetry}
          />
          {!hidden && <DashboardReports insights={insights} />}
        </>
      )}
      <QuickExpense onSaved={dashboard.onSaved} />
    </div>
  );
}
