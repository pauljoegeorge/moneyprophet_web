import FixedExpenses from "./index";

const FixedExpensesRoutes = [
  {
    component: FixedExpenses,
    path: "/fixed_expenses",
    exact: true,
    type: "private",
  },
];

export default FixedExpensesRoutes;
