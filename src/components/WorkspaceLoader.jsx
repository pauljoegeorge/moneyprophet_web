import React from "react";
import PropTypes from "prop-types";

export default function WorkspaceLoader({ label, fullPage }) {
  return (
    <div
      className={`workspace-loading${fullPage ? " workspace-loading-page" : ""}`}
      role="status"
      aria-label={label}
    >
      <span className="workspace-loading-spinner" aria-hidden="true" />
    </div>
  );
}
WorkspaceLoader.propTypes = {
  label: PropTypes.string,
  fullPage: PropTypes.bool,
};
WorkspaceLoader.defaultProps = { label: "Loading", fullPage: false };
