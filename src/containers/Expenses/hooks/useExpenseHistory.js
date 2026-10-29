import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { useExpenses } from "./useExpenses";
import useExpenseSearch from "./useExpenseSearch";
import { useBudget } from "../../ExpenseCategories/hooks/useBudget";
import {
  appendUrlToDate,
  addDateToUrl,
  formattedDate,
} from "../../../utils/utils";
import { getDefaultExpenseSortParams } from "../utils/utils";

export default function useExpenseHistory() {
  const [selectedMonth, setSelectedMonth] = useState();
  const { category, search, setSearch } = useExpenseSearch();
  const [viewMode, setViewMode] = useState(true);
  const [sortParams, setSortParams] = useState(getDefaultExpenseSortParams());
  const { actions, expenses: loadedExpenses, isLoading } = useExpenses([]);
  const expenses = useMemo(
    () =>
      category
        ? loadedExpenses.filter((expense) => expense.category_name === category)
        : loadedExpenses,
    [loadedExpenses, category]
  );
  const { actions: budgetActions, fixedExpenseCategories } = useBudget([]);
  const { getExpenses } = actions;
  const activeSort = sortParams.find((param) => param.active);
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
      budgetActions.getExpenseCategories(selectedMonth);
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (!selectedMonth) return undefined;
    return getExpenses(
      selectedMonth,
      category,
      activeSort.field,
      activeSort.order
    );
  }, [
    selectedMonth,
    category,
    activeSort.field,
    activeSort.order,
    getExpenses,
  ]);

  const handleMonthChange = (direction) => {
    const nextMonth =
      direction === "next"
        ? formattedDate(moment(selectedMonth).add(1, "months"))
        : formattedDate(moment(selectedMonth).subtract(1, "months"));
    appendUrlToDate(nextMonth);
    return setSelectedMonth(nextMonth);
  };

  const handleExportReport = () => {
    actions.exportExpenses(selectedMonth);
  };

  const handleSubmit = (values) => {
    return actions.updateExpenses(values, selectedMonth);
  };

  return {
    selectedMonth,
    category,
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
    handleExportReport,
    handleSubmit,
  };
}
