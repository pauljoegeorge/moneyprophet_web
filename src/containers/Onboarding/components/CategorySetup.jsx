import React from "react";
import PropTypes from "prop-types";
import CategoryIcon from "../../../components/CategoryIcon";
import CategoryIconPicker from "../../../components/CategoryIconPicker";
import SetupCategoryRow from "./SetupCategoryRow";

export default function CategorySetup({
  bills,
  limit,
  atLimit,
  limitMessage,
  options,
  rows,
  toggle,
  amountKey,
  currency,
  changeRows,
  newIcon,
  setNewIcon,
  newName,
  setNewName,
  addCustom,
}) {
  return (
    <>
      <p className="workspace-note">
        {bills
          ? "Optional monthly commitments, such as rent or your phone bill. Skip this if you prefer to add them later."
          : "Review the starter budgets, remove any you do not need, or add your own. These are spending limits, not expense transactions."}
      </p>
      {limit != null && (
        <p className="workspace-note">
          Your plan allows up to {limit}{" "}
          {bills ? "recurring bills" : "budget categories"}.
        </p>
      )}
      {atLimit && limitMessage && (
        <p role="status" className="workspace-note">
          {limitMessage}
        </p>
      )}
      <div
        className="onboarding-choices"
        aria-label={bills ? "Suggested bills" : "Suggested categories"}
      >
        {options.map((category) => (
          <button
            className="workspace-button"
            key={category.name}
            type="button"
            disabled={
              atLimit && !rows.some((row) => row.name === category.name)
            }
            aria-pressed={rows.some((row) => row.name === category.name)}
            onClick={() => toggle(category)}
          >
            <CategoryIcon name={category.icon} size={18} />
            {category.name}
          </button>
        ))}
      </div>
      {rows.length === 0 && (
        <p className="workspace-note">
          {bills ? "No bills selected." : "Choose your first category above."}
        </p>
      )}
      {rows.map((row, index) => (
        <SetupCategoryRow
          key={row.name}
          row={row}
          index={index}
          rows={rows}
          amountKey={amountKey}
          bills={bills}
          currency={currency}
          changeRows={changeRows}
        />
      ))}
      <div className="onboarding-custom">
        <CategoryIconPicker
          label="Choose custom category icon"
          input={{
            value: newIcon,
            onBlur: () => {},
            onChange: (icon) => setNewIcon(icon || "star"),
          }}
        />
        <label htmlFor="setup-custom-name">
          Custom {bills ? "bill" : "category"}
          <input
            id="setup-custom-name"
            value={newName}
            maxLength={100}
            onChange={(event) => setNewName(event.target.value)}
          />
        </label>
        <button
          className="workspace-button"
          type="button"
          onClick={addCustom}
          disabled={!newName.trim() || atLimit}
        >
          Add
        </button>
      </div>
    </>
  );
}
CategorySetup.propTypes = {
  bills: PropTypes.bool.isRequired,
  limit: PropTypes.number,
  atLimit: PropTypes.bool.isRequired,
  limitMessage: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggle: PropTypes.func.isRequired,
  amountKey: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  changeRows: PropTypes.func.isRequired,
  newIcon: PropTypes.string.isRequired,
  setNewIcon: PropTypes.func.isRequired,
  newName: PropTypes.string.isRequired,
  setNewName: PropTypes.func.isRequired,
  addCustom: PropTypes.func.isRequired,
};
CategorySetup.defaultProps = { limit: undefined, limitMessage: undefined };
