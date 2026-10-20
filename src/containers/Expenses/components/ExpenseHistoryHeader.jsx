import React from "react";
import PropTypes from "prop-types";
import { Download } from "lucide-react";

export default function ExpenseHistoryHeader({
  viewMode,
  setViewMode,
  isLoading,
  handleExportReport,
}) {
  return (
    <div className="workspace-card-header">
      <div>
        <h2>Spending history</h2>
        <p className="workspace-note">
          Review transactions or edit the details below.
        </p>
      </div>
      <div className="workspace-page-actions">
        <div className="workspace-segmented">
          <button
            type="button"
            aria-pressed={viewMode}
            onClick={() => setViewMode(true)}
          >
            Browse
          </button>
          <button
            type="button"
            aria-pressed={!viewMode}
            onClick={() => setViewMode(false)}
          >
            Edit
          </button>
        </div>
        <button
          type="button"
          className="workspace-button"
          disabled={isLoading}
          onClick={handleExportReport}
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>
    </div>
  );
}
ExpenseHistoryHeader.propTypes = {
  viewMode: PropTypes.bool.isRequired,
  setViewMode: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleExportReport: PropTypes.func.isRequired,
};
