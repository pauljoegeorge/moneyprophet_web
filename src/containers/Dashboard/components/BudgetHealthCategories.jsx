import React from "react";
import PropTypes from "prop-types";
import { formattedCurrency } from "../../../utils/currency";
import BudgetHealthProgress from "./BudgetHealthProgress";

export default function BudgetHealthCategories({ categories, overBudget }) {
  const color = overBudget ? "var(--destructive)" : "#F59E0B";
  const title = overBudget ? "Over Budget" : "Near Limit";
  if (!categories.length) return null;
  return (
    <div>
      <div
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color,
          marginBottom: "10px",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {categories.map((c) => (
          <div key={c.uid}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "5px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--foreground)",
                  textTransform: "capitalize",
                }}
              >
                {c.name}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color,
                  fontWeight: 700,
                }}
              >
                {overBudget
                  ? `+${formattedCurrency(c.total_expense - c.budget)}`
                  : `${Math.round((c.total_expense / c.budget) * 100)}%`}
              </span>
            </div>
            <BudgetHealthProgress
              pct={(c.total_expense / c.budget) * 100}
              color={color}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
BudgetHealthCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string,
      name: PropTypes.string,
      total_expense: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      budget: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
  overBudget: PropTypes.bool,
};
BudgetHealthCategories.defaultProps = { overBudget: false };
