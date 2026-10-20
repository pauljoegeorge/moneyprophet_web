import { useEffect, useState } from "react";
import moment from "moment";
import { apiErrorMessage } from "../../../utils/apiError";
import { get } from "../../../utils/api";
import { normalizeCategoryAmounts } from "../../../utils/categoryMoney";
import { formattedCurrency } from "../../../utils/currency";
import { addDateToUrl, appendUrlToDate } from "../../../utils/utils";
import dashboardMetrics from "../utils/dashboardMetrics";

export default function useDashboard(expenseStartDate) {
  const firstMonth = expenseStartDate;
  const [month, setMonth] = useState(() => {
    const selected = addDateToUrl();
    if (moment(selected, "YYYY-MM-DD", true).isValid()) {
      const validMonth = moment(selected).isBefore(firstMonth, "month")
        ? firstMonth
        : selected;
      appendUrlToDate(validMonth);
      return validMonth;
    }
    const fallback = moment().startOf("month").format("YYYY-MM-DD");
    appendUrlToDate(fallback);
    return fallback;
  });
  const [insights, setInsights] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentError, setRecentError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [hidden, setHidden] = useState(
    () => localStorage.getItem("mp-dashboard-private") === "true"
  );

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    setRecentError(false);
    Promise.allSettled([
      get(`expenses/insights?from=${month}`),
      get(`expenses?from=${month}&sort_by=transaction_date&sort_order=desc`),
    ]).then(([summary, transactions]) => {
      if (!active) return;
      if (summary.status === "fulfilled")
        setInsights({
          ...summary.value,
          expense_by_categories: normalizeCategoryAmounts(
            summary.value.expense_by_categories || []
          ),
        });
      else
        setError(
          apiErrorMessage(
            summary.reason,
            "We couldn't load your overview. Please try again."
          )
        );
      if (transactions.status === "fulfilled")
        setRecent(transactions.value.slice(0, 5));
      else {
        setRecent([]);
        setRecentError(true);
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [month, retry]);

  const changeMonth = (next) => {
    const parsed = moment(next, "YYYY-MM-DD", true);
    if (!parsed.isValid() || parsed.isBefore(firstMonth, "month")) return;
    const value = parsed.startOf("month").format("YYYY-MM-DD");
    appendUrlToDate(value);
    setMonth(value);
  };
  const togglePrivacy = () => {
    const next = !hidden;
    setHidden(next);
    localStorage.setItem("mp-dashboard-private", String(next));
  };
  const money = (value) =>
    hidden ? "••••" : formattedCurrency(Number(value) || 0);

  const onRetry = () => setRetry((value) => value + 1);
  const onSaved = () => {
    changeMonth(moment().startOf("month").format("YYYY-MM-DD"));
    onRetry();
  };
  return {
    firstMonth,
    month,
    changeMonth,
    hidden,
    togglePrivacy,
    loading,
    error,
    insights,
    recent,
    recentError,
    money,
    onRetry,
    onSaved,
    metrics: dashboardMetrics(insights, month, money),
  };
}
