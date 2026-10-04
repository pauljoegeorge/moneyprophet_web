import { useState, useCallback, useMemo, useRef } from "react";
import { get, post } from "../../../utils/api";
import { Notify } from "../../../components/Notify";

export function useForecasts() {
  const [isLoading, setLoading] = useState(false);
  const [isGenerating, setGenerating] = useState(false);
  const [forecasts, setForecasts] = useState([]);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const getForecasts = useCallback(async (force = false) => {
    if (hasFetched.current && !force) return;
    try {
      setLoading(true);
      const response = await get("expense_insights/forecasts");
      setForecasts(response || []);
      hasFetched.current = true;
    } catch (err) {
      setError("Failed to load forecasts.");
      Notify.error("Failed to load forecasts.");
    } finally {
      setLoading(false);
    }
  }, []);

  const generateForecast = useCallback(async () => {
    try {
      setGenerating(true);
      const response = await post("expense_insights/forecast");
      setForecasts((prev) => [response, ...prev]);
      Notify.success("Forecast generated successfully.");
    } catch (err) {
      Notify.error("Failed to generate forecast.");
    } finally {
      setGenerating(false);
    }
  }, []);

  const actions = useMemo(() => ({
    getForecasts,
    generateForecast,
  }), [getForecasts, generateForecast]);

  return {
    isLoading,
    isGenerating,
    forecasts,
    error,
    actions,
  };
}
