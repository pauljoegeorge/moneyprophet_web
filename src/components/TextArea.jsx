import React from "react";
import PropTypes from "prop-types";
import { Textarea as TextareaPrimitive } from "./ui/textarea";

function TextArea({ input, meta, placeholder, label, rows }) {
  const showError = meta.touched && meta.error;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={input.name}
          style={{
            display: "block",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.4px",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            marginBottom: "6px",
            textAlign: "left",
            paddingLeft: "2px",
          }}
        >
          {label}
        </label>
      )}
      <TextareaPrimitive
        id={input.name}
        placeholder={placeholder}
        rows={rows}
        {...input}
        style={showError ? { borderColor: "var(--destructive)" } : undefined}
      />
      {showError && (
        <p
          style={{
            marginTop: "4px",
            fontSize: "0.75rem",
            color: "var(--destructive)",
          }}
        >
          {meta.error}
        </p>
      )}
    </div>
  );
}

TextArea.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  rows: PropTypes.number,
};

TextArea.defaultProps = {
  placeholder: "Enter text here...",
  label: "",
  rows: 4,
};

export default TextArea;
