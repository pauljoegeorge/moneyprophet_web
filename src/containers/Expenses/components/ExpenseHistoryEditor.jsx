import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import InputSelect from "../../../components/InputSelect";
import Input from "../../../components/Input";
import { PrimaryButton } from "../../../components/Button";
import { useValidations } from "../../../utils/validation";

export default function ExpenseHistoryEditor({
  expenses,
  fixedExpenseOptions,
  pristine,
  valid,
  isLoading,
}) {
  const { number } = useValidations();
  return (
    <div>
      <div className="mt-4 w-full">
        {(expenses || []).map((expense, index) => (
          <div
            key={expense.uid || index}
            className="workspace-expense-edit-row"
          >
            <Field
              name={`expenses[${index}].category_uid`}
              component={InputSelect}
              options={fixedExpenseOptions}
              label="Category"
            />
            <Field
              name={`expenses[${index}].amount`}
              component={Input}
              validate={number}
              label="Amount"
            />
            <Field
              name={`expenses[${index}].transaction_date`}
              component={Input}
              type="date"
              label="Date"
            />
            <Field
              name={`expenses[${index}].notes`}
              component={Input}
              label="Notes"
            />
          </div>
        ))}
        <div className="flex justify-center mt-8 w-full">
          <PrimaryButton
            size="lg"
            className="w-50"
            type="submit"
            disabled={pristine || !valid || isLoading}
          >
            {isLoading ? "Saving…" : "Save changes"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
ExpenseHistoryEditor.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({ uid: PropTypes.string }))
    .isRequired,
  fixedExpenseOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pristine: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
