import React from "react";
import PropTypes from "prop-types";
import CategoryIconPicker from "../../../components/CategoryIconPicker";

export default function SetupCategoryRow({
  row,
  index,
  rows,
  amountKey,
  bills,
  currency,
  changeRows,
}) {
  return (
    <div className="onboarding-row" key={row.name}>
      <div className="onboarding-category-name">
        <CategoryIconPicker
          label={`Change icon for ${row.name}`}
          input={{
            value: row.icon,
            onBlur: () => {},
            onChange: (icon) =>
              changeRows(
                rows.map((entry, position) =>
                  position === index
                    ? { ...entry, icon: icon || "star" }
                    : entry
                )
              ),
          }}
        />
        <label htmlFor={`setup-amount-${index}`}>{row.name}</label>
      </div>
      <div className="onboarding-amount">
        <span>{currency}</span>
        <input
          id={`setup-amount-${index}`}
          type="number"
          inputMode="decimal"
          min="0"
          step="0.0001"
          placeholder="0"
          value={row[amountKey]}
          aria-label={`${row.name} monthly ${bills ? "bill" : "budget"} in ${currency}`}
          onChange={(event) =>
            changeRows(
              rows.map((entry, position) =>
                position === index
                  ? { ...entry, [amountKey]: event.target.value }
                  : entry
              )
            )
          }
        />
      </div>
      <button
        className="workspace-button"
        type="button"
        aria-label={`Remove ${row.name}`}
        onClick={() =>
          changeRows(rows.filter((_, position) => position !== index))
        }
      >
        Remove
      </button>
    </div>
  );
}
SetupCategoryRow.propTypes = {
  row: PropTypes.shape({ name: PropTypes.string, icon: PropTypes.string })
    .isRequired,
  index: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  amountKey: PropTypes.string.isRequired,
  bills: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  changeRows: PropTypes.func.isRequired,
};
