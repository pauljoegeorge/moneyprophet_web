import { useEffect, useState } from "react";
import moment from "moment";
import { useExpenses } from "./useExpenses";
import { useBudget } from "../../ExpenseCategories/hooks/useBudget";
import {
  appendUrlToDate,
  addDateToUrl,
  formattedDate,
} from "../../../utils/utils";
import { getDefaultExpenseSortParams } from "../utils/utils";

export default function useExpenseHistory() {
  const [selectedMonth, setSelectedMonth] = useState();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState(true);
  const [sortParams, setSortParams] = useState(getDefaultExpenseSortParams());
  const { actions, expenses, isLoading } = useExpenses([]);
  const { actions: budgetActions, fixedExpenseCategories } = useBudget([]);
  const initialValues = { expenses };
  const visibleExpenses = expenses.filter((expense) =>
    [
      expense.category_name,
      expense.notes,
      expense.amount,
      expense.transaction_date,
    ].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    )
  );
  const noSearchResults =
    viewMode && visibleExpenses.length === 0 && expenses.length > 0;
  const fixedExpenseOptions = Object.keys(fixedExpenseCategories).map(
    (ind) => ({
      value: fixedExpenseCategories[ind].uid,
      label: fixedExpenseCategories[ind].name,
      icon: fixedExpenseCategories[ind].icon,
    })
  );

  useEffect(() => {
    const month = addDateToUrl();
    setSelectedMonth(month);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const query = new URLSearchParams(window.location.search);
      const category = query.get("category") || "";
      setSortParams(getDefaultExpenseSortParams());
      actions.getExpenses(selectedMonth, category);
      budgetActions.getExpenseCategories(selectedMonth);
    }
  }, [selectedMonth]);

  const handleMonthChange = (direction) => {
    const nextMonth =
      direction === "next"
        ? formattedDate(moment(selectedMonth).add(1, "months"))
        : formattedDate(moment(selectedMonth).subtract(1, "months"));
    appendUrlToDate(nextMonth);
    return setSelectedMonth(nextMonth);
  };

  const handleSortExpenses = (sortBy, sortOrder) => {
    const query = new URLSearchParams(window.location.search);
    const category = query.get("category") || "";
    actions.getExpenses(selectedMonth, category, sortBy, sortOrder);
  };

  const handleExportReport = () => {
    actions.exportExpenses(selectedMonth);
  };

  const handleSubmit = (values) => {
    return actions.updateExpenses(values, selectedMonth);
  };

  return {
    selectedMonth,
    search,
    setSearch,
    viewMode,
    setViewMode,
    sortParams,
    setSortParams,
    expenses,
    isLoading,
    initialValues,
    visibleExpenses,
    noSearchResults,
    fixedExpenseOptions,
    handleMonthChange,
    handleSortExpenses,
    handleExportReport,
    handleSubmit,
  };
}
