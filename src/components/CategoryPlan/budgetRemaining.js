export default function budgetRemaining(rows) {
  return rows.reduce((remaining, row) => {
    const budget = Number(row.budget ?? 0);
    const spent = Number(row.total_expense ?? 0);
    if (!Number.isFinite(budget) || !Number.isFinite(spent)) return NaN;
    return remaining + budget - spent;
  }, 0);
}
