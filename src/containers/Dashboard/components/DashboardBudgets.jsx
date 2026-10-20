import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CategoryIcon from "../../../components/CategoryIcon";

export default function DashboardBudgets({ month, hidden, money, activeCats }) {
  return (
    <section className="workspace-card">
      <div className="workspace-card-header">
        <h2>Category budgets</h2>
        <Link to={`/budget?date=${month}`}>Manage budgets</Link>
      </div>
      {activeCats.length === 0 ? (
        <div className="workspace-empty">
          No categories to show yet. Start with a budget or your first expense.
        </div>
      ) : (
        activeCats.slice(0, 5).map((cat) => {
          const ratio = Number(cat.total_expense) / Number(cat.budget);
          const pct = cat.budget > 0 ? Math.max(0, ratio * 100) : 0;
          let progressColor = "var(--primary)";
          if (pct >= 80) progressColor = "var(--warning)";
          if (pct > 100) progressColor = "var(--destructive)";
          return (
            <Link
              key={cat.uid || cat.name}
              className="workspace-budget-row"
              to={`/expenses?date=${month}&category=${encodeURIComponent(cat.name)}`}
            >
              <div className="workspace-budget-label">
                <span className="category-with-icon">
                  <CategoryIcon name={cat.icon} />
                  {cat.name}
                </span>
                <span>
                  {money(cat.total_expense)} /{" "}
                  {cat.budget > 0 ? money(cat.budget) : "No budget"}
                </span>
              </div>
              {!hidden && (
                <div className="workspace-track">
                  <span
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      background: progressColor,
                    }}
                  />
                </div>
              )}
              {pct > 100 && !hidden && (
                <div
                  className="workspace-note"
                  style={{ color: "var(--destructive)", marginTop: 5 }}
                >
                  {money(cat.total_expense - cat.budget)} over budget
                </div>
              )}
            </Link>
          );
        })
      )}
    </section>
  );
}
DashboardBudgets.propTypes = {
  month: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  money: PropTypes.func.isRequired,
  activeCats: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
