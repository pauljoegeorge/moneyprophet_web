import React from "react";
import PropTypes from "prop-types";

export default function PlanHeader({
  title,
  amountKey,
  editing,
  setEditing,
  pristine,
  browseMode,
}) {
  return (
    <div className="workspace-card-header">
      <div>
        <h2>
          {amountKey === "budget"
            ? "Plan your spending"
            : "Your recurring bills"}
        </h2>
        <p className="workspace-note">
          {editing
            ? `Choose an icon, name, and ${amountKey === "budget" ? "budget" : "amount"} for each category. Drag the handles to reorder across all months.`
            : "Your monthly plan, category by category."}
          {!pristine &&
            (editing
              ? " Unsaved changes."
              : " Unsaved changes — switch to Edit to save.")}
        </p>
      </div>
      {browseMode && (
        <div
          className="workspace-segmented"
          role="group"
          aria-label={`${title} view`}
        >
          <button
            type="button"
            aria-pressed={!editing}
            onClick={() => setEditing(false)}
          >
            Browse
          </button>
          <button
            type="button"
            aria-pressed={editing}
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
PlanHeader.propTypes = {
  title: PropTypes.string.isRequired,
  amountKey: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  browseMode: PropTypes.bool.isRequired,
};
