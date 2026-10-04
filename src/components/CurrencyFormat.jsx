import React from "react";
import PropTypes from "prop-types";
import { constants } from "../utils/constants";

function CurrencyFormat({ amount }) {
  const formattedAmount = amount.toLocaleString("ja-JP", {
    style: "currency",
    currency: constants.defaultCurrency,
  });

  return <span>{formattedAmount}</span>;
}

CurrencyFormat.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default CurrencyFormat;
