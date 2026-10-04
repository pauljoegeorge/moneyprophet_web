import React from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formattedCurrency, getCurrency } from "../../../utils/currency";

function CategoryLabel({ x, y, payload }) {
  const name = payload.value;
  const words = name.split(" ");
  const lines = [""];
  words.forEach((word) => {
    const last = lines.length - 1;
    if (lines[last].length + word.length + 1 > 16 && lines[last])
      lines.push(word);
    else lines[last] = `${lines[last]} ${word}`.trim();
  });
  const visible = lines.slice(0, 2);
  if (lines.length > 2) visible[1] = `${visible[1].slice(0, 13)}…`;
  const firstLineOffset = visible.length === 2 ? -4 : 4;
  return (
    <text
      x={x - 8}
      y={y}
      textAnchor="end"
      fill="var(--foreground)"
      fontSize={12}
    >
      <title>{name}</title>
      {visible.map((line, index) => (
        <tspan key={line} x={x - 8} dy={index === 0 ? firstLineOffset : 15}>
          {line.length > 18 ? `${line.slice(0, 16)}…` : line}
        </tspan>
      ))}
    </text>
  );
}
CategoryLabel.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.shape({ value: PropTypes.string }),
};
CategoryLabel.defaultProps = { x: 0, y: 0, payload: { value: "" } };

export default function ExpenseInsight({ expenseInsights }) {
  const data = (expenseInsights?.expense_by_categories || [])
    .map((category) => ({
      name: category.name || "Uncategorized",
      Budget: Number(category.budget) || 0,
      Spending: Number(category.total_expense) || 0,
    }))
    .filter((category) => category.Budget !== 0 || category.Spending !== 0);
  const compactCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: getCurrency(),
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);

  return (
    <div>
      <div className="workspace-card-header">
        <h2>Expense by category</h2>
        <div className="category-chart-legend" aria-label="Chart legend">
          <span>
            <i style={{ background: "var(--chart-budget)" }} />
            Budget
          </span>
          <span>
            <i style={{ background: "var(--primary)" }} />
            Spending
          </span>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="workspace-empty">
          Add a budget or expense to compare your categories.
        </div>
      ) : (
        <div role="img" aria-label="Budget and recorded spending by category">
          <ResponsiveContainer width="100%" height={data.length * 70 + 45}>
            <BarChart
              data={data}
              layout="vertical"
              barGap={4}
              barCategoryGap={12}
              margin={{ top: 4, right: 18, left: 0, bottom: 4 }}
            >
              <CartesianGrid stroke="var(--border)" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={compactCurrency}
                minTickGap={25}
                tickCount={4}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={116}
                tick={<CategoryLabel />}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)" }}
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--foreground)",
                }}
                formatter={(value) => formattedCurrency(value)}
              />
              <Bar
                dataKey="Budget"
                fill="var(--chart-budget)"
                radius={[0, 4, 4, 0]}
                maxBarSize={16}
                isAnimationActive={false}
              />
              <Bar
                dataKey="Spending"
                fill="var(--primary)"
                radius={[0, 4, 4, 0]}
                maxBarSize={16}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
ExpenseInsight.propTypes = {
  expenseInsights: PropTypes.shape({
    expense_by_categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        budget: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        total_expense: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
      }),
    ),
  }).isRequired,
};
