import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import moment from "moment";
import { Plus, Download, Pencil } from "lucide-react";
import WorkspacePage, { MonthNavigation } from "./WorkspacePage";
import Input from "./Input";
import CategoryIcon from "./CategoryIcon";
import CategoryIconPicker from "./CategoryIconPicker";
import PrivateTotal from "./PrivateTotal";
import { PrimaryButton } from "./Button";
import { useValidations } from "../utils/validation";
import { addDateToUrl, appendUrlToDate, formattedDate } from "../utils/utils";
import { getBeginningOfMonth } from "../utils/date";
import { formattedCurrency } from "../utils/currency";

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
  const { number } = useValidations();
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
      moment(month).add(direction === "next" ? 1 : -1, "months"),
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
          render={({ handleSubmit, values, pristine, valid, form }) => {
            const rows = values[fieldName] || [];
            const total = rows.reduce(
              (sum, row) => sum + (Number(row[amountKey]) || 0),
              0,
            );
            return (
              <form onSubmit={handleSubmit} aria-busy={loading || isLoading}>
                <div className="workspace-plan-summary">
                  <div>
                    <span>
                      {amountKey === "budget"
                        ? "Monthly budget"
                        : "Monthly fixed bills"}
                    </span>
                    <PrivateTotal
                      key={amountKey}
                      value={formattedCurrency(total)}
                      label={amountKey === "budget" ? "Monthly budget" : "Monthly fixed bills"}
                      storageKey={`mp-plan-${amountKey}-total-private`}
                    />
                    <p>
                      {rows.length}{" "}
                      {rows.length === 1 ? "category" : "categories"} ·{" "}
                      {moment(month).format("MMMM YYYY")}
                    </p>
                  </div>
                  {actions.exportBudget && (
                    <button
                      className="workspace-button"
                      type="button"
                      disabled={isLoading}
                      onClick={() => actions.exportBudget(month)}
                    >
                      <Download size={16} />
                      Export CSV
                    </button>
                  )}
                </div>
                <div className="workspace-card workspace-form-card">
                  <div className="workspace-card-header">
                    <div>
                      <h2>
                        {amountKey === "budget"
                          ? "Plan your spending"
                          : "Your recurring bills"}
                      </h2>
                      <p className="workspace-note">
                        {editing
                          ? `Choose an icon, name, and ${amountKey === "budget" ? "budget" : "amount"} for each category.`
                          : "Your monthly plan, category by category."}
                        {!pristine &&
                          (editing
                            ? " Unsaved changes."
                            : " Unsaved changes — switch to Edit to save.")}
                      </p>
                    </div>
                    {browseMode && (
                      <div
                        className="workspace-segmented"
                        role="group"
                        aria-label={`${title} view`}
                      >
                        <button
                          type="button"
                          aria-pressed={!editing}
                          onClick={() => setEditing(false)}
                        >
                          Browse
                        </button>
                        <button
                          type="button"
                          aria-pressed={editing}
                          onClick={() => setEditing(true)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                  {!loading && !editing && rows.length > 0 && (
                    <ul
                      className="workspace-budget-list"
                      aria-label={`${title} categories`}
                    >
                      {rows.map((row, index) => (
                        <li key={row.uid || index}>
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
                                    .getElementById(
                                      `${fieldName}[${index}].name`,
                                    )
                                    ?.focus(),
                                );
                              }}
                            >
                              <Pencil size={16} />
                            </button>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div hidden={!editing}>
                    {loading && (
                      <p className="workspace-empty" role="status">
                        Loading categories…
                      </p>
                    )}
                    {!loading && rows.length === 0 && (
                      <p className="workspace-empty">
                        Start with your first category.
                      </p>
                    )}
                    {!loading &&
                      rows.map((row, index) => (
                        <div
                          className="workspace-plan-row"
                          key={row.uid || index}
                        >
                          <div className="workspace-plan-fields">
                            <Field
                              name={`${fieldName}[${index}].icon`}
                              component={CategoryIconPicker}
                              label={`Choose icon for category ${index + 1}`}
                            />
                            <Field
                              name={`${fieldName}[${index}].name`}
                              component={Input}
                              label="Category"
                            />
                            <Field
                              name={`${fieldName}[${index}].${amountKey}`}
                              component={Input}
                              validate={number}
                              label={
                                amountKey === "budget" ? "Budget" : "Amount"
                              }
                            />
                          </div>
                          <Field
                            name={`${fieldName}[${index}].update_future`}
                            type="checkbox"
                          >
                            {({ input }) => (
                              <label
                                className="workspace-check"
                                htmlFor={input.name}
                              >
                                <input id={input.name} {...input} />
                                Apply to future months
                              </label>
                            )}
                          </Field>
                        </div>
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
                  {!editing && loading && (
                    <p className="workspace-empty" role="status">
                      Loading categories…
                    </p>
                  )}
                  {!editing && !loading && rows.length === 0 && (
                    <div className="workspace-empty">
                      <p>
                        No categories yet. Add your first category to start
                        planning.
                      </p>
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
          }}
        />
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
