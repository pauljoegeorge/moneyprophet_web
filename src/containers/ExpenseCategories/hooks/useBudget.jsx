import { useState } from "react";
import { get, put } from "../../../utils/api";
import { Notify } from "../../../components/Notify";

function useBudget() {
  const [isLoading, setLoading] = useState(false);
  const [fixedExpenseCategories, setFixedExpenseCategories] = useState([]);

  const getExpenseCategories = async (month) => {
    const response = await get(`fixed_expense_categories?from=${month}`);
    setFixedExpenseCategories(response);
  };

  const updateExpenseCategories = async (values, month) => {
    try {
      setLoading(true);
      const data = {
        from: month,
        categories: values.fixedExpenseCategories.map(item => ({ ...item }))
      };
      const response = await put("fixed_expense_categories", data);
      setFixedExpenseCategories(response);
      setLoading(false);
      Notify.success();
    } catch {
      setLoading(false);
      Notify.error();
    }
  };

  const exportBudget = async (month) => {
    try {
      setLoading(true);
      const response = await get(
        `fixed_expense_categories/export?from=${month}`
      );

      const blob = new Blob([response], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${month}_budget.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      setLoading(false);
      Notify.success();
    } catch {
      setLoading(false);
      Notify.error();
    }
  };

  return {
    isLoading,
    fixedExpenseCategories,
    actions: {
      getExpenseCategories,
      updateExpenseCategories,
      exportBudget,
    },
  };
}

export { useBudget };
