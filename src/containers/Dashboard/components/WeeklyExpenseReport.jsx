import React from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formattedCurrency } from "../../../utils/currency";

function WeeklyExpenseReport(props) {
  const { weeklyReport } = props;
  const axisColor = "var(--muted-foreground)";
  const gridColor = "var(--border)";

  const data = Object.entries(weeklyReport).map(([week, value]) => ({
    week,
    value,
  }));

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "var(--muted-foreground)",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        Weekly Expense Report
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fill: axisColor, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: axisColor, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formattedCurrency(v)}
            width={80}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              color: "var(--foreground)",
            }}
            formatter={(v) => [formattedCurrency(v), "Total Expense"]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={{ r: 3, fill: "var(--primary)", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

WeeklyExpenseReport.propTypes = {
  weeklyReport: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default WeeklyExpenseReport;
