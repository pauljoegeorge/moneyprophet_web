import { useState } from "react";
import { get, put } from "../../../utils/api";
import { Notify } from "../../../components/Notify";

function useFixedExpense() {
  const [isLoading, setLoading] = useState(false);
  const [fixedExpenses, setFixedExpenses] = useState([]);

  const getFixedExpenses = async (month) => {
    const response = await get(`fixed_expenses?from=${month}`);
    setFixedExpenses(response);
  };

  const updateFixedExpenses = async (values, month) => {
    try {
      setLoading(true);
      const data = { from: month, expenses: values.fixedExpenses };
      const response = await put("fixed_expenses", data);
      setFixedExpenses(response);
      setLoading(false);
      Notify.success();
    } catch {
      setLoading(false);
      Notify.error();
    }
  };

  return {
    isLoading,
    fixedExpenses,
    actions: {
      getFixedExpenses,
      updateFixedExpenses,
    },
  };
}

export { useFixedExpense };
