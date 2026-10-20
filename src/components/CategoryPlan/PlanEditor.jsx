import React from "react";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import { PrimaryButton } from "../Button";
import SortablePlanRow from "./SortablePlanRow";
import PlanRowFields from "./PlanRowFields";

export default function PlanEditor({
  editing,
  loading,
  isLoading,
  rows,
  fieldName,
  amountKey,
  form,
  pristine,
  valid,
  reorder,
}) {
  return (
    <div hidden={!editing}>
      {loading && (
        <p className="workspace-empty" role="status">
          Loading categories…
        </p>
      )}
      {!loading && rows.length === 0 && (
        <p className="workspace-empty">Start with your first category.</p>
      )}
      {!loading &&
        rows.map((row, index) => (
          <SortablePlanRow
            key={row.uid || row.category_uid || index}
            row={row}
            index={index}
            disabled={loading || isLoading || rows.length < 2}
            reorder={reorder}
          >
            <PlanRowFields
              fieldName={fieldName}
              index={index}
              amountKey={amountKey}
            />
          </SortablePlanRow>
        ))}
      <div className="workspace-form-footer">
        <button
          type="button"
          className="workspace-button"
          disabled={loading || isLoading}
          onClick={() =>
            form.change(fieldName, [
              ...rows,
              { name: "", [amountKey]: "", icon: null },
            ])
          }
        >
          <Plus size={16} />
          Add category
        </button>
        <PrimaryButton
          type="submit"
          disabled={pristine || !valid || loading || isLoading}
        >
          {isLoading ? "Saving…" : "Save changes"}
        </PrimaryButton>
      </div>
    </div>
  );
}
PlanEditor.propTypes = {
  editing: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fieldName: PropTypes.string.isRequired,
  amountKey: PropTypes.string.isRequired,
  form: PropTypes.shape({ change: PropTypes.func.isRequired }).isRequired,
  pristine: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  reorder: PropTypes.shape({}).isRequired,
};
