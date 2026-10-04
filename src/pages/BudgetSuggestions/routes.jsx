import BudgetSuggestions from "./index";

const BudgetSuggestionsRoutes = [
  {
    component: BudgetSuggestions,
    path: "/budget-suggestions",
    exact: true,
    type: "private",
  },
];

export default BudgetSuggestionsRoutes;
