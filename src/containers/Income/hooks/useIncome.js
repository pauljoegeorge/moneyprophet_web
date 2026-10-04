import { useState } from "react";
import { get, put } from "../../../utils/api";
import { Notify } from "../../../components/Notify";

function useIncome() {
  const [isLoading, setLoading] = useState(false);
  const [incomes, setIncomes] = useState([]);

  const getIncomes = async (month) => {
    const response = await get(`incomes?from=${month}`);
    setIncomes(response);
  };

  const updateIncomes = async (values, month) => {
    try {
      setLoading(true);
      const data = { from: month, incomes: values.incomes };
      const response = await put("incomes", data);
      setIncomes(response);
      setLoading(false);
      Notify.success();
    } catch {
      setLoading(false);
      Notify.error();
    }
  };

  return {
    isLoading,
    incomes,
    actions: {
      getIncomes,
      updateIncomes,
    },
  };
}

export { useIncome };
