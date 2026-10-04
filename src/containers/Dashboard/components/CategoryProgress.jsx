import React from "react";
import PropTypes from "prop-types";
import { formattedCurrency } from "../../../utils/currency";

function bar(pct) {
  if (pct > 100) return "var(--destructive)";
  if (pct >= 80) return "#F59E0B";
  return "var(--primary)";
}

export default function CategoryProgress({ expenseInsights }) {
  const { expense_by_categories: cats } = expenseInsights || {};
  const active = (cats || []).filter(
    (c) => c.budget > 0 || c.total_expense > 0
  );

  if (!active.length) return null;

  return (
    <div>
      <div
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          marginBottom: "14px",
        }}
      >
        Category Breakdown
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "12px",
        }}
      >
        {active.map((c) => {
          const pct =
            c.budget > 0
              ? Math.round((c.total_expense / c.budget) * 100)
              : null;
          const color = pct !== null ? bar(pct) : "var(--muted-foreground)";
          const isOver = pct !== null && pct > 100;
          return (
            <div
              key={c.uid}
              style={{
                backgroundColor: "var(--muted)",
                borderRadius: "var(--radius-lg)",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                borderLeft: `3px solid ${color}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--foreground)",
                    textTransform: "capitalize",
                    lineHeight: 1.3,
                  }}
                >
                  {c.name}
                </span>
                {pct !== null && (
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color,
                      flexShrink: 0,
                    }}
                  >
                    {pct}%
                  </span>
                )}
              </div>

              <div>
                <div
                  style={{
                    height: "7px",
                    borderRadius: "99px",
                    backgroundColor: "var(--border)",
                    overflow: "hidden",
                    marginBottom: "6px",
                  }}
                >
                  {c.budget > 0 ? (
                    <div
                      style={{
                        height: "100%",
                        width: `${Math.min(pct, 100)}%`,
                        backgroundColor: color,
                        borderRadius: "99px",
                        transition: "width 0.4s ease",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "var(--muted-foreground)",
                        opacity: 0.3,
                        borderRadius: "99px",
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    color: "var(--muted-foreground)",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      color: isOver
                        ? "var(--destructive)"
                        : "var(--foreground)",
                    }}
                  >
                    {formattedCurrency(c.total_expense)}
                  </span>
                  {c.budget > 0 && <span>{formattedCurrency(c.budget)}</span>}
                </div>
                {isOver && (
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--destructive)",
                      fontWeight: 600,
                      marginTop: "2px",
                    }}
                  >
                    +{formattedCurrency(c.total_expense - c.budget)} over
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

CategoryProgress.propTypes = {
  expenseInsights: PropTypes.shape({
    expense_by_categories: PropTypes.instanceOf(Array),
  }).isRequired,
};
