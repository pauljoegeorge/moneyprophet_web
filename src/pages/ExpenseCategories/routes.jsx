import ExpenseCategories from "./index";

const ExpenseCategoriesRoutes = [
  {
    component: ExpenseCategories,
    path: "/budget",
    exact: true,
    type: "private",
  },
];

export default ExpenseCategoriesRoutes;
