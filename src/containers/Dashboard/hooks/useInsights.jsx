import { useState } from "react";
import moment from "moment";
import { normalizeCategoryAmounts } from "../../../utils/categoryMoney";
import { get } from "../../../utils/api";

function useInsights() {
  const [isLoading, setLoading] = useState(false);
  const [expenseInsights, setExpenseInsights] = useState([]);

  const getExpenseInsights = async (date) => {
    setLoading(true);
    const currentDate = moment();
    const currentMonth = currentDate.startOf("month").format("YYYY-MM-DD");
    const response = await get(`expenses/insights?from=${date}`);
    setExpenseInsights({
      ...response,
      expense_by_categories: normalizeCategoryAmounts(
        response.expense_by_categories || []
      ),
    });
    setLoading(false);
  };

  return {
    isLoading,
    expenseInsights,
    actions: {
      getExpenseInsights,
    },
  };
}

export { useInsights };
