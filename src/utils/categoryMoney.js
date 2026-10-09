// Rails decimal fields can arrive as strings; normalize before comparisons.
export function normalizeCategoryAmounts(categories) {
  return categories.map((category) => ({
    ...category,
    budget: Number(category.budget || 0),
    total_expense: Number(category.total_expense || 0),
    total_expense_of_week: Number(category.total_expense_of_week || 0),
  }));
}
