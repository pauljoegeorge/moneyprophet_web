import React from "react";
import PropTypes from "prop-types";
import { GripVertical } from "lucide-react";

export default function SortablePlanRow({
  row,
  index,
  disabled,
  reorder,
  children,
}) {
  const { drag, handleProps } = reorder;
  const classes = ["workspace-plan-row", "workspace-plan-sortable"];
  if (drag?.from === index) classes.push("is-dragging");
  if (drag?.to === index && drag.from !== index) {
    classes.push("is-drop-target");
    if (drag.to > drag.from) classes.push("is-drop-after");
  }
  return (
    <div className={classes.join(" ")} data-plan-index={index}>
      <button
        type="button"
        className="workspace-plan-grip"
        aria-label={`Reorder ${row.name || "category"}`}
        aria-describedby="plan-reorder-help"
        disabled={disabled}
        {...handleProps(index)}
      >
        <GripVertical size={18} aria-hidden="true" />
      </button>
      {children}
    </div>
  );
}
SortablePlanRow.propTypes = {
  row: PropTypes.shape({ name: PropTypes.string }).isRequired,
  index: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  reorder: PropTypes.shape({
    drag: PropTypes.shape({ from: PropTypes.number, to: PropTypes.number }),
    handleProps: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};
