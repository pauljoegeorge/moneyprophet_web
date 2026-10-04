import { useState } from "react";
import { get } from "../../../utils/api";
import { Notify } from "../../../components/Notify";

function useInsights() {
  const [isLoading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);

  const getInsights = async () => {
    try {
      setLoading(true);
      const response = await get("expense_insights");
      setInsights(response?.analytics);
    } catch {
      setError("Failed to load insights.");
      Notify.error("Failed to load insights.");
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    insights,
    error,
    actions: {
      getInsights,
    },
  };
}

export { useInsights };
