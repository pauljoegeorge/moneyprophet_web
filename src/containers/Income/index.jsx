import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import moment from "moment";
import { LeftArrow, RightArrow } from "../../components/Icon";
import { PrimaryButton } from "../../components/Button";
import { H2Purple } from "../../components/Text";
import WorkspacePage from "../../components/WorkspacePage";
import { useIncome } from "./hooks/useIncome";
import Input from "../../components/Input";
import { useValidations } from "../../utils/validation";
import {
  appendUrlToDate,
  addDateToUrl,
  formattedDate,
} from "../../utils/utils";
import { FlexContainer } from "../../components/Container";
import { getBeginningOfMonth } from "../../utils/date";

function IncomeContainer() {
  const [selectedMonth, setSelectedMonth] = useState();
  const { actions, incomes } = useIncome();
  const currentMonth = getBeginningOfMonth();
  const { number } = useValidations();
  const date = moment(selectedMonth).format("MMMM YYYY");
  const prevWeekDisabled = currentMonth === selectedMonth;

  useEffect(() => {
    const month = addDateToUrl();
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      actions.getIncomes(selectedMonth);
    }
  }, [selectedMonth]);

  const handleSubmit = (values) => {
    actions.updateIncomes(values, selectedMonth);
  };

  const handleMonthChange = (direction) => {
    if (prevWeekDisabled && direction === "previous") return 0;

    const nextMonth =
      direction === "next"
        ? formattedDate(moment(selectedMonth).add(1, "months"))
        : formattedDate(moment(selectedMonth).subtract(1, "months"));
    appendUrlToDate(nextMonth);
    return setSelectedMonth(nextMonth);
  };

  const initialValues = {
    incomes,
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit: formHandleSubmit, form: { getState } }) => {
        const { pristine, valid } = getState();
        return (
          <form onSubmit={formHandleSubmit}>
            <WorkspacePage
              focused
              title="Income"
              description="Keep your monthly income in view."
            >
              <div className="workspace-card workspace-form-card workspace-entry-card">
                <FlexContainer alignItems="baseline">
                  <LeftArrow
                    disabled={prevWeekDisabled}
                    onClick={() => handleMonthChange("previous")}
                  />
                  <H2Purple>{date}</H2Purple>
                  <RightArrow onClick={() => handleMonthChange("next")} />
                </FlexContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
                  {(initialValues.incomes || []).map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className="w-full md:w-64">
                      <Field
                        name={`incomes[${index}].amount`}
                        component={Input}
                        validate={number}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4 w-full">
                  <PrimaryButton
                    size="lg"
                    className="w-50"
                    type="submit"
                    disabled={pristine || !valid}
                  >
                    Update Income
                  </PrimaryButton>
                </div>
              </div>
            </WorkspacePage>
          </form>
        );
      }}
    />
  );
}

export default IncomeContainer;
