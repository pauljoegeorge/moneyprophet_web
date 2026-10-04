import Expenses from "./index";

const ExpensesRoutes = [
  {
    component: Expenses,
    path: "/expenses",
    exact: true,
    type: "private",
  },
];

export default ExpensesRoutes;
