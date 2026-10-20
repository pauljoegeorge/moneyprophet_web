import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import Input from "../Input";
import CategoryIconPicker from "../CategoryIconPicker";
import { useValidations } from "../../utils/validation";

export default function PlanRowFields({ fieldName, index, amountKey }) {
  const { number } = useValidations();
  return (
    <>
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
          label={amountKey === "budget" ? "Budget" : "Amount"}
        />
      </div>
      <Field name={`${fieldName}[${index}].update_future`} type="checkbox">
        {({ input }) => (
          <label className="workspace-check" htmlFor={input.name}>
            <input id={input.name} {...input} />
            Apply to future months
          </label>
        )}
      </Field>
    </>
  );
}
PlanRowFields.propTypes = {
  fieldName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  amountKey: PropTypes.string.isRequired,
};
