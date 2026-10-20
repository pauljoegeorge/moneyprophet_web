import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { formattedCurrency } from "../../../utils/currency";

export default function SavedExpense({ saved, onAddAnother }) {
  return (
    <div className="workspace-saved-state" role="status">
      <CheckCircle2 size={36} />
      <h2>Expense saved</h2>
      <p>
        {saved.category_name} · {formattedCurrency(Number(saved.amount))}
      </p>
      <div className="workspace-page-actions">
        <button
          type="button"
          className="workspace-button primary"
          onClick={onAddAnother}
        >
          Add another expense
        </button>
        <Link className="workspace-button" to="/expenses">
          View expenses
        </Link>
      </div>
    </div>
  );
}
SavedExpense.propTypes = {
  saved: PropTypes.shape({
    category_name: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onAddAnother: PropTypes.func.isRequired,
};
