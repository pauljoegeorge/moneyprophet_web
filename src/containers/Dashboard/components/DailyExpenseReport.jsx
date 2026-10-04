import React from "react";
import PropTypes from "prop-types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formattedCurrency } from "../../../utils/currency";

function DailyExpenseReport(props) {
  const { dailyReport } = props;
  const axisColor = "var(--muted-foreground)";
  const gridColor = "var(--border)";

  const data = Object.entries(dailyReport).map(([day, value]) => ({
    day,
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
        Daily Expense Report
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="dailyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: axisColor, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            hide
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
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#dailyGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "var(--primary)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

DailyExpenseReport.propTypes = {
  dailyReport: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default DailyExpenseReport;
