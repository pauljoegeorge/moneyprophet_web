import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WorkspacePage({
  title,
  description,
  actions,
  children,
  focused,
}) {
  return (
    <section
      className={`workspace-page${focused ? " workspace-page-focused" : ""}`}
    >
      <div className="workspace-heading">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="workspace-page-actions">{actions}</div>
      </div>
      {children}
    </section>
  );
}
WorkspacePage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actions: PropTypes.node,
  children: PropTypes.node,
  focused: PropTypes.bool,
};
export function MonthNavigation({ month, onChange, previousDisabled = false }) {
  return (
    <div className="workspace-month">
      <button
        type="button"
        className="workspace-icon-button"
        aria-label="Previous month"
        disabled={previousDisabled}
        onClick={() => onChange("previous")}
      >
        <ChevronLeft size={18} />
      </button>
      <strong>{moment(month).format("MMMM YYYY")}</strong>
      <button
        type="button"
        className="workspace-icon-button"
        aria-label="Next month"
        onClick={() => onChange("next")}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
MonthNavigation.propTypes = {
  month: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  previousDisabled: PropTypes.bool,
};

WorkspacePage.defaultProps = {
  description: "",
  actions: null,
  children: null,
  focused: false,
};
MonthNavigation.defaultProps = { month: undefined, previousDisabled: false };
