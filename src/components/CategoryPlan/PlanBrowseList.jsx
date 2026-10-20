import React from "react";
import PropTypes from "prop-types";
import { Pencil } from "lucide-react";
import CategoryIcon from "../CategoryIcon";
import CategoryBudgetProgress from "../CategoryBudgetProgress";
import { formattedCurrency } from "../../utils/currency";

export default function PlanBrowseList({
  rows,
  title,
  amountKey,
  fieldName,
  setEditing,
}) {
  return (
    <ul className="workspace-budget-list" aria-label={`${title} categories`}>
      {rows.map((row, index) => (
        <li
          key={row.uid || index}
          className={
            amountKey === "budget"
              ? "workspace-budget-with-progress"
              : undefined
          }
        >
          <span className="workspace-budget-category">
            <span className="workspace-settings-icon">
              <CategoryIcon name={row.icon} />
            </span>
            <strong>{row.name || "Unnamed category"}</strong>
          </span>
          <span className="workspace-budget-row-actions">
            <span className="workspace-budget-amount">
              {formattedCurrency(Number(row[amountKey]) || 0)}
            </span>
            <button
              className="workspace-icon-button"
              type="button"
              aria-label={`Edit ${row.name || "category"}`}
              onClick={() => {
                setEditing(true);
                requestAnimationFrame(() =>
                  document
                    .getElementById(`${fieldName}[${index}].name`)
                    ?.focus()
                );
              }}
            >
              <Pencil size={16} />
            </button>
          </span>
          {amountKey === "budget" && (
            <CategoryBudgetProgress
              name={row.name || "Unnamed category"}
              budget={row.budget}
              spent={row.total_expense}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
PlanBrowseList.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string.isRequired,
  amountKey: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  setEditing: PropTypes.func.isRequired,
};
