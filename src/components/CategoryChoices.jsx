import React, { useState } from "react";
import PropTypes from "prop-types";
import { Check } from "lucide-react";
import CategoryIcon from "./CategoryIcon";

export default function CategoryChoices({ input, meta, options, disabled }) {
  const [search, setSearch] = useState("");
  const visible = options.filter((option) =>
    option.label.toLowerCase().includes(search.trim().toLowerCase()),
  );
  return (
    <fieldset className="workspace-category-choices" disabled={disabled}>
      <legend>Choose a category</legend>
      <p className="workspace-note">Tap the category that fits this expense.</p>
      {options.length > 8 && (
        <input
          type="search"
          aria-label="Find a category"
          placeholder="Find a category…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="workspace-search"
        />
      )}
      <div className="workspace-category-grid">
        {visible.map((option) => (
          <label
            className={`workspace-category-choice ${input.value === option.value ? "is-selected" : ""}`}
            key={option.value}
            htmlFor={`${input.name}-${option.value}`}
          >
            <input
              id={`${input.name}-${option.value}`}
              type="radio"
              name={input.name}
              value={option.value}
              checked={input.value === option.value}
              onChange={() => input.onChange(option.value)}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
            />
            <span className="workspace-choice-icon">
              <CategoryIcon name={option.icon} size={24} />
            </span>
            <span>{option.label}</span>
            {input.value === option.value && (
              <Check
                className="workspace-choice-check"
                size={15}
                aria-hidden="true"
              />
            )}
          </label>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="workspace-note">
          No matching categories. Try another name.
        </p>
      )}
      {meta.touched && meta.error && (
        <p className="workspace-field-error" role="alert">
          {meta.error}
        </p>
      )}
    </fieldset>
  );
}
CategoryChoices.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({ touched: PropTypes.bool, error: PropTypes.string })
    .isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
    }),
  ).isRequired,
  disabled: PropTypes.bool,
};
CategoryChoices.defaultProps = { disabled: false };
