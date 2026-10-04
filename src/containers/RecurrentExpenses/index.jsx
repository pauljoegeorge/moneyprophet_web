import React from "react";
import SpendingPlanNavigation from "../../components/SpendingPlanNavigation";
import CategoryPlanPage from "../../components/CategoryPlanPage";
import { useRecurrentExpenses } from "./hooks/useRecurrentExpenses";

export default function RecurrentExpensesContainer() {
  const { actions, recurrentExpenseCategories, isLoading } =
    useRecurrentExpenses();
  return (
    <div className="workspace-budget-page">
      <SpendingPlanNavigation />
      <CategoryPlanPage
        browseMode
        title="Fixed bills"
        description="Plan monthly amounts for recurring commitments like rent, utilities, and subscriptions."
        entries={recurrentExpenseCategories}
        fieldName="recurrentExpenseCategories"
        amountKey="amount"
        actions={actions}
        isLoading={isLoading}
      />
    </div>
  );
}
