import RecurrentExpenses from "./index";

const RecurrentExpensesRoutes = [
  {
    component: RecurrentExpenses,
    path: "/r_expenses",
    exact: true,
    type: "private",
  },
];

export default RecurrentExpensesRoutes;
