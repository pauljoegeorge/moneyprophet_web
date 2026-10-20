import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import moment from "moment";
import WorkspacePage, { MonthNavigation } from "./WorkspacePage";
import PlanForm from "./CategoryPlan/PlanForm";
import { addDateToUrl, appendUrlToDate, formattedDate } from "../utils/utils";
import { getBeginningOfMonth } from "../utils/date";

export default function CategoryPlanPage({
  title,
  description,
  entries,
  fieldName,
  amountKey,
  actions,
  isLoading,
  browseMode,
}) {
  const [month, setMonth] = useState(() => addDateToUrl());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(!browseMode);
  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      await actions.getExpenseCategories(month);
    } catch {
      setError(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, [month]);
  const changeMonth = (direction) => {
    const next = formattedDate(
      moment(month).add(direction === "next" ? 1 : -1, "months")
    );
    appendUrlToDate(next);
    setMonth(next);
    if (browseMode) setEditing(false);
  };
  return (
    <WorkspacePage
      focused
      title={title}
      description={description}
      actions={
        <MonthNavigation
          month={month}
          onChange={changeMonth}
          previousDisabled={month === getBeginningOfMonth()}
        />
      }
    >
      {error ? (
        <div className="workspace-card workspace-empty">
          <p>Couldn’t load your categories.</p>
          <button className="workspace-button" type="button" onClick={load}>
            Try again
          </button>
        </div>
      ) : (
        <Form
          initialValues={{ [fieldName]: entries }}
          onSubmit={(values) => actions.updateExpenseCategories(values, month)}
        >
          {({ handleSubmit }) => (
            <PlanForm
              title={title}
              month={month}
              fieldName={fieldName}
              amountKey={amountKey}
              loading={loading}
              isLoading={isLoading}
              editing={editing}
              setEditing={setEditing}
              browseMode={browseMode}
              onExportBudget={actions.exportBudget}
              handleSubmit={handleSubmit}
            />
          )}
        </Form>
      )}
    </WorkspacePage>
  );
}
CategoryPlanPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fieldName: PropTypes.string.isRequired,
  amountKey: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    getExpenseCategories: PropTypes.func.isRequired,
    updateExpenseCategories: PropTypes.func.isRequired,
    exportBudget: PropTypes.func,
  }).isRequired,
  isLoading: PropTypes.bool,
  browseMode: PropTypes.bool,
};

CategoryPlanPage.defaultProps = { isLoading: false, browseMode: false };
