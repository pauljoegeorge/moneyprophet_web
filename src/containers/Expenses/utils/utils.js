export const setExpenseSortParams = (sortParams, field) => {
  const newSortParams = [...sortParams];
  for (let i = 0; i < newSortParams.length; i += 1) {
    if (newSortParams[i].field === field) {
      newSortParams[i].order =
        newSortParams[i].order === "asc" ? "desc" : "asc";
      newSortParams[i].active = true;
    } else {
      newSortParams[i].order = "asc";
      newSortParams[i].active = false;
    }
  }
  return newSortParams;
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
