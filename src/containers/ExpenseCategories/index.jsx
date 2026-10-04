import React from "react";
import SpendingPlanNavigation from "../../components/SpendingPlanNavigation";
import CategoryPlanPage from "../../components/CategoryPlanPage";
import { useBudget } from "./hooks/useBudget";

export default function ExpenseCategoriesContainer() {
  const { actions, fixedExpenseCategories, isLoading } = useBudget();
  return (
    <div className="workspace-budget-page">
      <SpendingPlanNavigation />
      <CategoryPlanPage
        browseMode
        title="Monthly budget"
        description="Set monthly limits for everyday categories like groceries and dining out."
        entries={fixedExpenseCategories}
        fieldName="fixedExpenseCategories"
        amountKey="budget"
        actions={actions}
        isLoading={isLoading}
      />
    </div>
  );
}
