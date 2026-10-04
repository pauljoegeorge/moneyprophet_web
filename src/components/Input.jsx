import React from "react";
import PropTypes from "prop-types";
import { Input as InputPrimitive } from "./ui/input";

function Input({ input, meta, placeholder, label, inputMode, step, min }) {
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
      <InputPrimitive
        id={input.name}
        placeholder={placeholder}
        {...input}
        inputMode={inputMode}
        step={step}
        min={min}
        aria-invalid={Boolean(showError)}
        aria-describedby={showError ? `${input.name}-error` : undefined}
        style={showError ? { borderColor: "var(--destructive)" } : undefined}
      />
      {showError && (
        <p
          id={`${input.name}-error`}
          role="alert"
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

Input.propTypes = {
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
  inputMode: PropTypes.string,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Input.defaultProps = {
  placeholder: "",
  label: "",
  inputMode: undefined,
  step: undefined,
  min: undefined,
};

export default Input;
