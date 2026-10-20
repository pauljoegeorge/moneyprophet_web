import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { Plus, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";

export default function DashboardHeader({
  month,
  firstMonth,
  changeMonth,
  togglePrivacy,
  hidden,
}) {
  return (
    <>
      <div className="workspace-heading">
        <div>
          <h1>A little clarity, every day.</h1>
          <p>Your {moment(month).format("MMMM")} spending, all in one place.</p>
        </div>
        <div className="workspace-actions">
          <div className="workspace-month">
            <button
              type="button"
              className="workspace-icon-button"
              aria-label="Previous month"
              disabled={!moment(month).isAfter(firstMonth, "month")}
              onClick={() =>
                changeMonth(
                  moment(month).subtract(1, "month").format("YYYY-MM-DD")
                )
              }
            >
              <ChevronLeft size={16} />
            </button>
            <input
              type="month"
              min={firstMonth.slice(0, 7)}
              aria-label="Reporting month"
              value={month.slice(0, 7)}
              onChange={(event) => changeMonth(`${event.target.value}-01`)}
            />
            <button
              type="button"
              className="workspace-icon-button"
              aria-label="Next month"
              onClick={() =>
                changeMonth(moment(month).add(1, "month").format("YYYY-MM-DD"))
              }
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <Link className="workspace-button primary" to="/new">
            <Plus size={16} aria-hidden="true" />
            Add expense
          </Link>
        </div>
      </div>
      <div className="workspace-actions" style={{ marginBottom: 18 }}>
        <button
          type="button"
          className="workspace-button"
          onClick={togglePrivacy}
          aria-pressed={hidden}
        >
          {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
          {hidden ? "Show amounts" : "Hide amounts"}
        </button>
      </div>
    </>
  );
}
DashboardHeader.propTypes = {
  month: PropTypes.string.isRequired,
  firstMonth: PropTypes.string.isRequired,
  changeMonth: PropTypes.func.isRequired,
  togglePrivacy: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired,
};
