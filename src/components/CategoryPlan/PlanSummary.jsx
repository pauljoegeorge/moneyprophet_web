import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Download } from "lucide-react";
import PrivateTotal from "../PrivateTotal";
import budgetRemaining from "./budgetRemaining";
import { formattedCurrency } from "../../utils/currency";

export default function PlanSummary({
  rows,
  amountKey,
  month,
  isLoading,
  onExportBudget,
}) {
  const total = rows.reduce(
    (sum, row) => sum + (Number(row[amountKey]) || 0),
    0
  );
  const remaining = budgetRemaining(rows);
  const remainingLabel = remaining < 0 ? "Over budget" : "Budget left";

  return (
    <div className="workspace-plan-summary">
      <div>
        <span>
          {amountKey === "budget" ? "Monthly budget" : "Monthly fixed bills"}
        </span>
        <PrivateTotal
          key={amountKey}
          value={formattedCurrency(total)}
          label={
            amountKey === "budget" ? "Monthly budget" : "Monthly fixed bills"
          }
          storageKey={`mp-plan-${amountKey}-total-private`}
        />
        <p>
          {rows.length} {rows.length === 1 ? "category" : "categories"} ·{" "}
          {moment(month).format("MMMM YYYY")}
        </p>
      </div>
      {amountKey === "budget" && (
        <div>
          <span>{remainingLabel}</span>
          <PrivateTotal
            value={formattedCurrency(Math.abs(remaining))}
            label={remainingLabel}
            storageKey="mp-plan-budget-remaining-private"
          />
          <p>After category spending this month</p>
        </div>
      )}
      {onExportBudget && (
        <button
          className="workspace-button"
          type="button"
          disabled={isLoading}
          onClick={() => onExportBudget(month)}
        >
          <Download size={16} />
          Export CSV
        </button>
      )}
    </div>
  );
}
PlanSummary.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  amountKey: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onExportBudget: PropTypes.func,
};
PlanSummary.defaultProps = { onExportBudget: undefined };
