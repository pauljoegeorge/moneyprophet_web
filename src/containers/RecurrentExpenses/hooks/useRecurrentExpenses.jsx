import { useState } from "react";
import { get, put } from "../../../utils/api";
import { Notify } from "../../../components/Notify";

function useRecurrentExpenses() {
  const [isLoading, setLoading] = useState(false);
  const [recurrentExpenseCategories, setRecurrentExpenseCategories] = useState(
    []
  );

  const getExpenseCategories = async (month) => {
    const response = await get(`recurrent_expenses?from=${month}`);
    setRecurrentExpenseCategories(response);
  };

  const updateExpenseCategories = async (values, month) => {
    try {
      setLoading(true);
      const data = {
        from: month,
        recurrent_expenses: values.recurrentExpenseCategories.map((item) => ({ ...item })),
      };
      const response = await put("recurrent_expenses", data);
      setRecurrentExpenseCategories(response);
      setLoading(false);
      Notify.success();
    } catch {
      setLoading(false);
      Notify.error();
    }
  };

  return {
    isLoading,
    recurrentExpenseCategories,
    actions: {
      getExpenseCategories,
      updateExpenseCategories,
    },
  };
}

export { useRecurrentExpenses };
