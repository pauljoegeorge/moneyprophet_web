import React from "react";
import PropTypes from "prop-types";
import { BoxWithShadow } from "../../../components/Div";
import { P, H3Bold } from "../../../components/Text";
import { THead } from "../../../components/Table";

function PlannedExpenses(props) {
  const { fixedExpenses } = props;

  return (
    <BoxWithShadow className="mt-12">
      <H3Bold className="mb-4">Planned Expenses</H3Bold>
      <div className="overflow-x-auto">
        <table className="w-full">
          <THead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </THead>
          <tbody>
            {(fixedExpenses || []).map((fixedExpense) => (
              <tr key={fixedExpense.name}>
                <td><P>{fixedExpense.name}</P></td>
                <td><P>{fixedExpense.amount}</P></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BoxWithShadow>
  );
}

PlannedExpenses.propTypes = {
  fixedExpenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default PlannedExpenses;
