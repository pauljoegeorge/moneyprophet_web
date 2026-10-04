import React from "react";
import PropTypes from "prop-types";
import { formattedCurrency } from "../../../utils/currency";

function SpendingRecommendations(props) {
  const { allowancePerDay, allowancePerWeek } = props;

  const items = [
    { label: "Daily Quota", value: formattedCurrency(allowancePerDay), hint: "remaining today" },
    { label: "Weekly Quota", value: formattedCurrency(allowancePerWeek), hint: "remaining this week" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            backgroundColor: "var(--card)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            borderTop: "3px solid var(--primary)",
            padding: "20px 18px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
            {item.label}
          </span>
          <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {item.value}
          </span>
          <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>{item.hint}</span>
        </div>
      ))}
    </div>
  );
}

SpendingRecommendations.propTypes = {
  allowancePerDay: PropTypes.number.isRequired,
  allowancePerWeek: PropTypes.number.isRequired,
};

export default SpendingRecommendations;
