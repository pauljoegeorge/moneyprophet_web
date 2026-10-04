import { useState } from "react";
import { get, put } from "../../../utils/api";
import { Notify } from "../../../components/Notify";

function useUnexpectedExpense() {
  const [isLoading, setLoading] = useState(false);
  const defaultValue = [{ name: "overall", amount: 0 }];
  const [unexpectedExpenses, setUnexpectedExpenses] = useState(defaultValue);

  const getUnexpectedExpense = async (month) => {
    const response = await get(`unexpected_expenses?from=${month}`);
    setUnexpectedExpenses(response);
  };

  const updateUnexpectedExpense = async (values, month) => {
    try {
      setLoading(true);
      const data = {
        from: month,
        expenses: values.unexpectedExpenses,
      };
      const response = await put("unexpected_expenses", data);
      setUnexpectedExpenses(response);
      setLoading(false);
      Notify.success();
    } catch {
      setLoading(false);
      Notify.error();
    }
  };

  return {
    isLoading,
    unexpectedExpenses,
    actions: {
      getUnexpectedExpense,
      updateUnexpectedExpense,
    },
  };
}

export { useUnexpectedExpense };
