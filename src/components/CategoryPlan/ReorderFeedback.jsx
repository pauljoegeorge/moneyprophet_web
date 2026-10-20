import React from "react";
import PropTypes from "prop-types";
import { GripVertical } from "lucide-react";
import CategoryIcon from "../CategoryIcon";

export default function ReorderFeedback({ reorder, rows }) {
  const { drag, announcement } = reorder;
  return (
    <>
      <span className="workspace-sr-only" role="status">
        {announcement}
      </span>
      <span id="plan-reorder-help" className="workspace-sr-only">
        Drag to reorder. With keyboard focus, use Arrow Up or Arrow Down.
      </span>
      {drag && (
        <div
          className="workspace-plan-drag-preview"
          style={{ left: drag.x + 16, top: drag.y - 20 }}
        >
          <GripVertical size={16} aria-hidden="true" />
          <CategoryIcon name={rows[drag.from]?.icon} />
          <strong>{rows[drag.from]?.name || "Unnamed category"}</strong>
        </div>
      )}
    </>
  );
}
ReorderFeedback.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  reorder: PropTypes.shape({
    announcement: PropTypes.string,
    drag: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      from: PropTypes.number,
    }),
  }).isRequired,
};
