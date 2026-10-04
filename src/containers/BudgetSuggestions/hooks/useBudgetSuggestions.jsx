import { useState, useCallback, useMemo, useRef } from "react";
import { get, post } from "../../../utils/api";
import { Notify } from "../../../components/Notify";

export function useBudgetSuggestions() {
  const [isLoading, setLoading] = useState(false);
  const [isGenerating, setGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const getSuggestions = useCallback(async (force = false) => {
    if (hasFetched.current && !force) return;
    try {
      setLoading(true);
      const response = await get("expense_insights/suggestions");
      setSuggestions(response || []);
      hasFetched.current = true;
    } catch (err) {
      setError("Failed to load budget suggestions.");
      Notify.error("Failed to load budget suggestions.");
    } finally {
      setLoading(false);
    }
  }, []);

  const generateSuggestions = useCallback(async (maxOverBudget, additionalExpenses) => {
    try {
      setGenerating(true);
      const response = await post("expense_insights/suggest_reductions", {
        max_over_budget: maxOverBudget,
        expected_additional_expenses: additionalExpenses,
      });
      setSuggestions((prev) => [response, ...prev]);
      Notify.success("Suggestions generated successfully.");
    } catch (err) {
      Notify.error("Failed to generate suggestions.");
    } finally {
      setGenerating(false);
    }
  }, [getSuggestions]);

  const actions = useMemo(() => ({
    getSuggestions,
    generateSuggestions,
  }), [getSuggestions, generateSuggestions]);

  return {
    isLoading,
    isGenerating,
    suggestions,
    error,
    actions,
  };
}
