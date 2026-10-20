import React from "react";
import PropTypes from "prop-types";
import { useForm, useFormState } from "react-final-form";
import PlanSummary from "./PlanSummary";
import PlanHeader from "./PlanHeader";
import PlanBrowseList from "./PlanBrowseList";
import PlanEditor from "./PlanEditor";
import ReorderFeedback from "./ReorderFeedback";
import usePlanReorder from "./usePlanReorder";

export default function PlanForm({
  title,
  month,
  fieldName,
  amountKey,
  isLoading,
  editing,
  setEditing,
  browseMode,
  onExportBudget,
  handleSubmit,
}) {
  const form = useForm();
  const { values, pristine, valid } = useFormState();
  const rows = values[fieldName] || [];
  const reorder = usePlanReorder(rows, (next) => form.change(fieldName, next));
  return (
    <form ref={reorder.container} onSubmit={handleSubmit} aria-busy={isLoading}>
      <ReorderFeedback reorder={reorder} rows={rows} />
      <PlanSummary
        rows={rows}
        amountKey={amountKey}
        month={month}
        isLoading={isLoading}
        onExportBudget={onExportBudget}
      />
      <div className="workspace-card workspace-form-card">
        <PlanHeader
          title={title}
          amountKey={amountKey}
          editing={editing}
          setEditing={setEditing}
          pristine={pristine}
          browseMode={browseMode}
        />
        {!editing && rows.length > 0 && (
          <PlanBrowseList
            rows={rows}
            title={title}
            amountKey={amountKey}
            fieldName={fieldName}
            setEditing={setEditing}
          />
        )}
        <PlanEditor
          editing={editing}
          isLoading={isLoading}
          rows={rows}
          fieldName={fieldName}
          amountKey={amountKey}
          form={form}
          pristine={pristine}
          valid={valid}
          reorder={reorder}
        />
        {!editing && rows.length === 0 && (
          <div className="workspace-empty">
            <p>No categories yet. Add your first category to start planning.</p>
            <button
              className="workspace-button"
              type="button"
              onClick={() => setEditing(true)}
            >
              Add your first category
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
PlanForm.propTypes = {
  title: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  amountKey: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
  browseMode: PropTypes.bool.isRequired,
  onExportBudget: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};
PlanForm.defaultProps = { onExportBudget: undefined };
