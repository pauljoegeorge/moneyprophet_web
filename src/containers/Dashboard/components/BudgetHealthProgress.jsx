import React from "react";
import PropTypes from "prop-types";

export default function BudgetHealthProgress({ pct, color }) {
  const clamped = Math.min(pct, 100);
  return (
    <div
      style={{
        height: "6px",
        borderRadius: "99px",
        backgroundColor: "var(--muted)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: `${clamped}%`,
          backgroundColor: color,
          borderRadius: "99px",
          transition: "width 0.4s ease",
        }}
      />
      {pct > 100 && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            backgroundColor: color,
            opacity: 0.3,
            borderRadius: "99px",
          }}
        />
      )}
    </div>
  );
}

BudgetHealthProgress.propTypes = {
  pct: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
