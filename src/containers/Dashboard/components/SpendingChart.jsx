import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
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

export default function SpendingChart({ spending }) {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <AreaChart
        data={spending}
        margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="workspace-spending" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.2} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="day"
          tickFormatter={(day) => moment(day).format("MMM D")}
          tick={{
            fontSize: 11,
            fill: "var(--muted-foreground)",
          }}
          axisLine={false}
          tickLine={false}
          minTickGap={35}
        />
        <YAxis
          tickFormatter={(value) => formattedCurrency(value)}
          width={75}
          tick={{
            fontSize: 11,
            fill: "var(--muted-foreground)",
          }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value) => [formattedCurrency(value), "Spent so far"]}
          contentStyle={{
            background: "var(--card)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            borderRadius: 10,
          }}
        />
        <Area
          type="monotone"
          dataKey="spent"
          stroke="var(--primary)"
          fill="url(#workspace-spending)"
          strokeWidth={2}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
SpendingChart.propTypes = {
  spending: PropTypes.arrayOf(
    PropTypes.shape({ day: PropTypes.string, spent: PropTypes.number })
  ).isRequired,
};
