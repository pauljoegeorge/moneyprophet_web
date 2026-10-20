import React from "react";
import PropTypes from "prop-types";
import { Field, useForm, useFormState } from "react-final-form";
import CategoryChoices from "../../../components/CategoryChoices";
import Input from "../../../components/Input";
import { PrimaryButton } from "../../../components/Button";
import { currentDate, getPastDate } from "../../../utils/date";
import { getCurrencySymbol, formattedCurrency } from "../../../utils/currency";

const requiredCategory = (value) => (value ? undefined : "Choose a category.");
const positiveAmount = (value) =>
  Number.isFinite(Number(value)) && Number(value) > 0
    ? undefined
    : "Enter an amount greater than zero.";

export default function ExpenseFields({ options, isLoading }) {
  const form = useForm();
  const { values, valid } = useFormState();
  return (
    <>
      <Field
        name="expenses.category_uid"
        component={CategoryChoices}
        options={options}
        validate={requiredCategory}
        disabled={isLoading}
      />
      <div className="workspace-entry-fields">
        <Field
          name="expenses.amount"
          label={`Amount (${getCurrencySymbol()})`}
          component={Input}
          type="number"
          inputMode="decimal"
          step="any"
          min="0.01"
          placeholder="0"
          validate={positiveAmount}
        />
        <div>
          <div
            className="workspace-quick-dates"
            role="group"
            aria-label="Quick date"
          >
            <button
              type="button"
              className="workspace-button"
              aria-pressed={values.expenses.transaction_date === currentDate()}
              onClick={() =>
                form.change("expenses.transaction_date", currentDate())
              }
            >
              Today
            </button>
            <button
              type="button"
              className="workspace-button"
              aria-pressed={
                values.expenses.transaction_date === getPastDate(1, "days")
              }
              onClick={() =>
                form.change("expenses.transaction_date", getPastDate(1, "days"))
              }
            >
              Yesterday
            </button>
          </div>
          <Field
            name="expenses.transaction_date"
            label="Date"
            type="date"
            validate={(value) => (value ? undefined : "Choose a date.")}
            component={Input}
          />
        </div>
        <div className="workspace-entry-notes">
          <Field
            name="expenses.notes"
            label="Notes (optional)"
            placeholder="What was it for?"
            component={Input}
          />
        </div>
      </div>
      <div className="workspace-form-footer">
        <p className="workspace-note">
          {options.find(
            (option) => option.value === values.expenses.category_uid
          )?.label || "Choose a category"}
          {Number(values.expenses.amount) > 0
            ? ` · ${formattedCurrency(Number(values.expenses.amount))}`
            : ""}
        </p>
        <PrimaryButton size="lg" type="submit" disabled={!valid || isLoading}>
          {isLoading ? "Saving…" : "Save expense"}
        </PrimaryButton>
      </div>
    </>
  );
}
ExpenseFields.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
