import { useEffect, useState } from "react";
import { useExpenses } from "../../Expenses/hooks/useExpenses";
import { useBudget } from "../../ExpenseCategories/hooks/useBudget";
import useExpenseLocation from "../../../utils/useExpenseLocation";
import { getBeginningOfMonth, currentDate } from "../../../utils/date";

const createInitialValues = () => ({
  expenses: {
    category_uid: "",
    amount: "",
    transaction_date: currentDate(),
    notes: "",
  },
});

export default function useExpenseEntry() {
  const location = useExpenseLocation();
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(false);
  const [saved, setSaved] = useState(null);
  const [initialValues, setInitialValues] = useState(createInitialValues);
  const [entryNumber, setEntryNumber] = useState(0);
  const { actions, isLoading } = useExpenses();
  const { actions: budgetActions, fixedExpenseCategories } = useBudget();
  const options = fixedExpenseCategories.map((category) => ({
    value: category.uid,
    label: category.name,
    icon: category.icon,
  }));
  const loadCategories = async () => {
    setCategoriesLoading(true);
    setCategoriesError(false);
    try {
      await budgetActions.getExpenseCategories(getBeginningOfMonth());
    } catch {
      setCategoriesError(true);
    }
    setCategoriesLoading(false);
  };
  useEffect(() => {
    loadCategories();
  }, []);
  const submit = async (values) => {
    const success = await actions.createExpense({
      ...values,
      expenses: { ...values.expenses, ...location },
    });
    if (success)
      setSaved({
        ...values.expenses,
        category_name: options.find(
          (option) => option.value === values.expenses.category_uid
        )?.label,
      });
  };
  const categoriesEmpty =
    !categoriesLoading && !categoriesError && options.length === 0;
  const categoriesReady =
    !categoriesLoading && !categoriesError && options.length > 0;
  const addAnother = () => {
    setInitialValues({
      expenses: {
        ...initialValues.expenses,
        category_uid: saved.category_uid,
        transaction_date: currentDate(),
      },
    });
    setEntryNumber((value) => value + 1);
    setSaved(null);
  };
  return {
    categoriesLoading,
    categoriesError,
    saved,
    initialValues,
    entryNumber,
    options,
    isLoading,
    loadCategories,
    submit,
    categoriesEmpty,
    categoriesReady,
    addAnother,
  };
}
