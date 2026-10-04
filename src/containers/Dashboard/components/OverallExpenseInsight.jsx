import * as React from "react";
import PropTypes from "prop-types";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { formattedCurrency } from "../../../utils/currency";
import { dataColors } from "../../../utils/colors";
import { useThemeMode } from "../../../contexts/ThemeContext";

export default function OverallExpenseInsight(props) {
  const { expenseInsights } = props;
  const { expense_by_categories } = expenseInsights || [];
  const { mode } = useThemeMode();
  const axisColor = mode === "dark" ? "#94a3b8" : "#6b6b6b";
  const gridColor = mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  const { totalBudget, totalExpense } = (expense_by_categories || []).reduce(
    (totals, category) => ({
      totalBudget: totals.totalBudget + (category?.budget || 0),
      totalExpense: totals.totalExpense + (category?.total_expense || 0),
    }),
    { totalBudget: 0, totalExpense: 0 }
  );

  const data = [{ name: "Overview", Budget: totalBudget, Expense: totalExpense }];

  return (
    <div>
      <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--primary)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "16px" }}>Overall Expense</div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid stroke={gridColor} horizontal={false} />
          <XAxis type="number" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => formattedCurrency(v)} />
          <YAxis type="category" dataKey="name" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", color: "var(--foreground)" }}
            formatter={(v) => formattedCurrency(v)}
          />
          <Legend wrapperStyle={{ color: axisColor, fontSize: 12 }} />
          <Bar dataKey="Budget" fill={dataColors.yellow} radius={[0, 4, 4, 0]} barSize={20} />
          <Bar dataKey="Expense" fill={dataColors.pastelPurple} radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

OverallExpenseInsight.propTypes = {
  expenseInsights: PropTypes.shape({
    expense_by_categories: PropTypes.instanceOf(Array),
  }).isRequired,
};
