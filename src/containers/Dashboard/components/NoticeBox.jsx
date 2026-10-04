import React, { useState } from "react";
import PropTypes from "prop-types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getExpenseVisibility, setExpenseVisibility } from "../../../utils/utils";

function NoticeBox(props) {
  const { data } = props;
  const [visibilities, setVisibilities] = useState(getExpenseVisibility());

  const switchVisibility = (key) => {
    const newVisibilities = { ...visibilities };
    newVisibilities[key] = !newVisibilities[key];
    setExpenseVisibility(newVisibilities);
    setVisibilities(newVisibilities);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
      {(data || []).map((item) => (
        <div
          key={item.key}
          style={{
            backgroundColor: "var(--card)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            borderTop: "3px solid var(--primary)",
            padding: "20px 18px 16px",
            transition: "box-shadow 0.2s ease",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
            {item.head}
          </span>
          <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            {visibilities[item.key] ? item.value : "———"}
          </span>
          <button
            type="button"
            aria-label={visibilities[item.key] ? `Hide ${item.head}` : `Show ${item.head}`}
            onClick={() => switchVisibility(item.key)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", padding: 0, display: "flex", alignItems: "center", width: "fit-content", marginTop: "2px" }}
          >
            {visibilities[item.key] ? <Visibility style={{ fontSize: "1rem" }} /> : <VisibilityOff style={{ fontSize: "1rem" }} />}
          </button>
        </div>
      ))}
    </div>
  );
}

NoticeBox.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      head: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NoticeBox;
