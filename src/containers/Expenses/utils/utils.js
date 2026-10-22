export const setExpenseSortParams = (sortParams, field) => {
  return sortParams.map((param) => ({
    ...param,
    active: param.field === field,
    order:
      param.field === field && param.active && param.order === "asc"
        ? "desc"
        : "asc",
  }));
};

export const getDefaultExpenseSortParams = () => {
  const defaultValues = [
    { field: "fixed_expense_category_id", order: "asc", active: false },
    { field: "amount", order: "asc", active: false },
    { field: "notes", order: "asc", active: false },
    { field: "transaction_date", order: "desc", active: true },
  ];
  return defaultValues;
};
