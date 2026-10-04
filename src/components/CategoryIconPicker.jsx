import React, { useRef } from "react";
import PropTypes from "prop-types";
import CategoryIcon, { categoryIcons } from "./CategoryIcon";

export default function CategoryIconPicker({ input, label }) {
  const ref = useRef(null);
  const select = (icon) => {
    input.onChange(icon);
    input.onBlur();
    ref.current.open = false;
  };
  return (
    <details className="category-icon-picker" ref={ref}>
      <summary aria-label={label} title={label}>
        <CategoryIcon name={input.value} size={20} />
      </summary>
      <div className="category-icon-popover">
        <div className="category-icon-grid">
          {Object.keys(categoryIcons).map((icon) => (
            <button
              key={icon}
              type="button"
              aria-label={icon.replace(/-/g, " ")}
              aria-pressed={input.value === icon}
              title={icon.replace(/-/g, " ")}
              onClick={() => select(icon)}
            >
              <CategoryIcon name={icon} size={20} />
            </button>
          ))}
        </div>
        <button
          className="workspace-button"
          type="button"
          onClick={() => select(null)}
        >
          Clear icon
        </button>
      </div>
    </details>
  );
}
CategoryIconPicker.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
};
