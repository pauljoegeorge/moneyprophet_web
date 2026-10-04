import React from "react";
import PropTypes from "prop-types";

function DatePicker({ input, meta, label }) {
  return (
    <div>
      <div style={{ display: "block", marginBottom: "4px", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.4px" }}>
        {label}
      </div>
      <DatePicker
        {...input}
        selected={input.value || null}
        onChange={(date) => input.onChange(date)}
      />
      {meta.touched && meta.error && <span style={{ color: "var(--destructive)", fontSize: "0.75rem" }}>{meta.error}</span>}
    </div>
  );
}

DatePicker.propTypes = {
  input: PropTypes.arrayOf(PropTypes.string).isRequired,
  meta: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
};

export default DatePicker;
