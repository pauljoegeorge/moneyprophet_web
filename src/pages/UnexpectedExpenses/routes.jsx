import UnexpectedExpenses from "./index";

const UnexpectedExpensesRoutes = [
  {
    component: UnexpectedExpenses,
    path: "/unexpected_expenses",
    exact: true,
    type: "private",
  },
];

export default UnexpectedExpensesRoutes;
