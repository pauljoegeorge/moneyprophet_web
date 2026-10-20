import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formattedCurrency } from "../../../utils/currency";

import BudgetHealthProgress from "./BudgetHealthProgress";
import BudgetHealthCategories from "./BudgetHealthCategories";

const sectionLabel = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: "var(--muted-foreground)",
  marginBottom: "14px",
};

function statusColor(pct) {
  if (pct > 100) return "var(--destructive)";
  if (pct >= 80) return "#F59E0B";
  return "#10B981";
}

function BudgetHealth({ expenseInsights }) {
  const { expense_by_categories: cats } = expenseInsights || {};

  const { totalBudget, totalExpense } = (cats || []).reduce(
    (acc, c) => ({
      totalBudget: acc.totalBudget + Number(c.budget || 0),
      totalExpense: acc.totalExpense + Number(c.total_expense || 0),
    }),
    { totalBudget: 0, totalExpense: 0 }
  );

  if (totalBudget <= 0) {
    return (
      <div>
        <div style={sectionLabel}>Budget Health</div>
        <p style={{ fontSize: "1.25rem", fontWeight: 700 }}>No budget set</p>
        <p style={{ color: "var(--muted-foreground)", margin: "12px 0" }}>
          Set category budgets to track your remaining allowance.
        </p>
        <Link to="/budget" style={{ color: "var(--primary)", fontWeight: 600 }}>
          Set up budget
        </Link>
      </div>
    );
  }

  const overallPct = totalBudget > 0 ? (totalExpense / totalBudget) * 100 : 0;
  const overBudgetCats = (cats || []).filter(
    (c) => c.budget > 0 && c.total_expense > c.budget
  );
  const nearLimitCats = (cats || []).filter(
    (c) =>
      c.budget > 0 &&
      c.total_expense <= c.budget &&
      c.total_expense / c.budget >= 0.8
  );
  const diff = totalExpense - totalBudget;

  const color = statusColor(overallPct);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* overall utilization */}
      <div>
        <div style={sectionLabel}>Budget Health</div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color,
            }}
          >
            {Math.round(overallPct)}%
          </span>
          <span
            style={{
              fontSize: "12px",
              color: diff > 0 ? "var(--destructive)" : "#10B981",
              fontWeight: 600,
              paddingBottom: "3px",
            }}
          >
            {diff > 0
              ? `▲ ${formattedCurrency(diff)} over`
              : `▼ ${formattedCurrency(Math.abs(diff))} left`}
          </span>
        </div>
        <BudgetHealthProgress pct={overallPct} color={color} />
        <div
          style={{
            marginTop: "6px",
            fontSize: "11px",
            color: "var(--muted-foreground)",
          }}
        >
          {formattedCurrency(totalExpense)} spent of{" "}
          {formattedCurrency(totalBudget)}
        </div>
      </div>

      <BudgetHealthCategories categories={overBudgetCats} overBudget />
      <BudgetHealthCategories categories={nearLimitCats} />
    </div>
  );
}

BudgetHealth.propTypes = {
  expenseInsights: PropTypes.shape({
    expense_by_categories: PropTypes.instanceOf(Array),
  }).isRequired,
};

export default BudgetHealth;
