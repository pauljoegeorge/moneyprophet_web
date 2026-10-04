import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Plus,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import QuickExpense from "./components/QuickExpense";
import CategoryIcon from "../../components/CategoryIcon";
import { get } from "../../utils/api";
import { formattedCurrency } from "../../utils/currency";
import { addDateToUrl, appendUrlToDate } from "../../utils/utils";
import { getReportingPeriod } from "./utils/reportingPeriod";
import DailyExpenseReport from "./components/DailyExpenseReport";
import WeeklyExpenseReport from "./components/WeeklyExpenseReport";
import ExpenseInsight from "./components/ExpenseInsight";

export default function DashboardContainer() {
  const [month, setMonth] = useState(() => {
    const selected = addDateToUrl();
    if (moment(selected, "YYYY-MM-DD", true).isValid()) return selected;
    const fallback = moment().startOf("month").format("YYYY-MM-DD");
    appendUrlToDate(fallback);
    return fallback;
  });
  const [insights, setInsights] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentError, setRecentError] = useState(false);
  const [retry, setRetry] = useState(0);
  const [hidden, setHidden] = useState(
    () => localStorage.getItem("mp-dashboard-private") === "true",
  );

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    setRecentError(false);
    Promise.allSettled([
      get(`expenses/insights?from=${month}`),
      get(`expenses?from=${month}&sort_by=transaction_date&sort_order=desc`),
    ]).then(([summary, transactions]) => {
      if (!active) return;
      if (summary.status === "fulfilled") setInsights(summary.value);
      else setError("We couldn't load your overview. Please try again.");
      if (transactions.status === "fulfilled")
        setRecent(transactions.value.slice(0, 5));
      else {
        setRecent([]);
        setRecentError(true);
      }
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [month, retry]);

  const changeMonth = (next) => {
    const parsed = moment(next, "YYYY-MM-DD", true);
    if (!parsed.isValid()) return;
    const value = parsed.startOf("month").format("YYYY-MM-DD");
    appendUrlToDate(value);
    setMonth(value);
  };
  const togglePrivacy = () => {
    const next = !hidden;
    setHidden(next);
    localStorage.setItem("mp-dashboard-private", String(next));
  };
  const money = (value) =>
    hidden ? "••••" : formattedCurrency(Number(value) || 0);
  const cats = insights?.expense_by_categories || [];
  const totalBudget = cats.reduce(
    (sum, cat) => sum + Number(cat.budget || 0),
    0,
  );
  const totalExpense = Number(insights?.total_monthly_expense || 0);
  const categoryExpense = cats.reduce(
    (sum, cat) => sum + Number(cat.total_expense || 0),
    0,
  );
  const remaining = totalBudget - categoryExpense;
  const { daysElapsed, daysInMonth } = getReportingPeriod(month);
  const current = moment(month).isSame(moment(), "month");
  const dailyAverage = daysElapsed ? totalExpense / daysElapsed : null;
  const activeCats = cats.filter(
    (cat) => cat.budget > 0 || cat.total_expense > 0,
  );
  let cumulative = 0;
  const spending = Object.entries(insights?.daily_report || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, value]) => {
      cumulative += Number(value) || 0;
      return { day, spent: cumulative };
    });

  const averageLabel =
    dailyAverage === null ? "—" : money(Math.round(dailyAverage));
  const averageNote = daysElapsed
    ? `Across ${daysElapsed} days`
    : "This month hasn't started";

  return (
    <div className="workspace-overview">
      <div className="workspace-heading">
        <div>
          <h1>A little clarity, every day.</h1>
          <p>Your {moment(month).format("MMMM")} spending, all in one place.</p>
        </div>
        <div className="workspace-actions">
          <div className="workspace-month">
            <button
              type="button"
              className="workspace-icon-button"
              aria-label="Previous month"
              onClick={() =>
                changeMonth(
                  moment(month).subtract(1, "month").format("YYYY-MM-DD"),
                )
              }
            >
              <ChevronLeft size={16} />
            </button>
            <input
              type="month"
              aria-label="Reporting month"
              value={month.slice(0, 7)}
              onChange={(event) => changeMonth(`${event.target.value}-01`)}
            />
            <button
              type="button"
              className="workspace-icon-button"
              aria-label="Next month"
              onClick={() =>
                changeMonth(moment(month).add(1, "month").format("YYYY-MM-DD"))
              }
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <Link className="workspace-button primary" to="/new">
            <Plus size={16} aria-hidden="true" />
            Add expense
          </Link>
        </div>
      </div>
      <div className="workspace-actions" style={{ marginBottom: 18 }}>
        <button
          type="button"
          className="workspace-button"
          onClick={togglePrivacy}
          aria-pressed={hidden}
        >
          {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
          {hidden ? "Show amounts" : "Hide amounts"}
        </button>
      </div>
      {loading && (
        <div className="workspace-card workspace-empty" role="status">
          Loading your overview…
        </div>
      )}
      {!loading && error && (
        <div className="workspace-card" role="alert">
          <p>{error}</p>
          <button
            className="workspace-button"
            type="button"
            onClick={() => setRetry((value) => value + 1)}
          >
            Retry
          </button>
        </div>
      )}
      {!loading && !error && insights && (
        <>
          <div className="workspace-stats">
            <section className="workspace-card workspace-stat hero">
              <div className="workspace-stat-label">
                Remaining monthly budget
              </div>
              <div className="workspace-value">
                {totalBudget > 0 ? money(remaining) : "No budget set"}
              </div>
              <div className="workspace-note">
                {totalBudget > 0
                  ? `of ${money(totalBudget)}${current ? ` · ${daysInMonth - daysElapsed} days after today` : ""}`
                  : "Create a budget to give your spending a plan."}
              </div>
              {totalBudget <= 0 && (
                <Link
                  className="workspace-button"
                  to="/budget"
                  style={{ marginTop: 12 }}
                >
                  Set up budget
                </Link>
              )}
            </section>
            <section className="workspace-card workspace-stat">
              <div className="workspace-stat-label">Spent this month</div>
              <div className="workspace-value">{money(totalExpense)}</div>
              <div className="workspace-note">Includes fixed bills</div>
              {totalBudget > 0 ? (
                <span className="workspace-badge">
                  {hidden
                    ? "••••"
                    : `${Math.round((categoryExpense / totalBudget) * 100)}% of category budget used`}
                </span>
              ) : (
                <span className="workspace-note">
                  {moment(month).format("MMMM YYYY")}
                </span>
              )}
            </section>
            <section className="workspace-card workspace-stat">
              <div className="workspace-stat-label">Daily average</div>
              <div className="workspace-value">{averageLabel}</div>
              <div className="workspace-note">{averageNote}</div>
            </section>
          </div>
          {current && (
            <section
              aria-label="Current spending and quotas"
              className="workspace-current-stats"
            >
              <div className="workspace-card workspace-period-stat">
                <div className="workspace-stat-label">Spent today</div>
                <div className="workspace-value">
                  {money(insights.todays_expense)}
                </div>
                <div className="workspace-note">{moment().format("MMM D")}</div>
              </div>
              <div className="workspace-card workspace-period-stat">
                <div className="workspace-stat-label">Spent this week</div>
                <div className="workspace-value">
                  {money(insights.weekly_expense)}
                </div>
                <div className="workspace-note">This calendar week</div>
              </div>
              <div className="workspace-card workspace-period-stat">
                <div className="workspace-stat-label">Daily quota left</div>
                <div className="workspace-value">
                  {totalBudget > 0 ? money(insights.allowance_per_day) : "—"}
                </div>
                <div className="workspace-note">
                  {totalBudget > 0
                    ? "Based on your remaining monthly budget"
                    : "Set a budget to see your quota"}
                </div>
              </div>
              <div className="workspace-card workspace-period-stat">
                <div className="workspace-stat-label">Weekly quota left</div>
                <div className="workspace-value">
                  {totalBudget > 0 ? money(insights.allowance_per_week) : "—"}
                </div>
                <div className="workspace-note">
                  {totalBudget > 0
                    ? "Based on your remaining monthly budget"
                    : "Set a budget to see your quota"}
                </div>
              </div>
            </section>
          )}
          <div className="workspace-panels">
            <section className="workspace-card">
              <div className="workspace-card-header">
                <h2>Spending pace</h2>
                <span className="workspace-note">
                  {moment(month).format("MMMM")}
                </span>
              </div>
              {hidden && (
                <div className="workspace-empty">Chart hidden for privacy.</div>
              )}
              {!hidden &&
                (spending.length === 0 ? (
                  <div className="workspace-empty">
                    Add your first expense to see your spending over time.
                  </div>
                ) : (
                  <div
                    role="img"
                    aria-label="Cumulative spending for the selected month"
                  >
                    <ResponsiveContainer width="100%" height={230}>
                      <AreaChart
                        data={spending}
                        margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="workspace-spending"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="var(--primary)"
                              stopOpacity={0.2}
                            />
                            <stop
                              offset="100%"
                              stopColor="var(--primary)"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          vertical={false}
                          stroke="var(--border)"
                        />
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
                          formatter={(value) => [
                            formattedCurrency(value),
                            "Spent so far",
                          ]}
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
                  </div>
                ))}
              <div className="workspace-callout">
                <TrendingUp size={18} aria-hidden="true" />
                <div>
                  <div className="workspace-transaction-name">
                    {remaining < 0 && totalBudget > 0
                      ? "Spending is over budget"
                      : "A clearer view of your month"}
                  </div>
                  <div className="workspace-note">
                    {totalBudget > 0
                      ? `Daily average: ${dailyAverage === null ? "—" : money(Math.round(dailyAverage))}${current ? ` · Weekly allowance: ${money(insights.allowance_per_week)}` : ""}`
                      : "Set category budgets to start tracking your remaining allowance."}
                  </div>
                </div>
              </div>
            </section>
            <section className="workspace-card">
              <div className="workspace-card-header">
                <h2>Category budgets</h2>
                <Link to={`/budget?date=${month}`}>Manage budgets</Link>
              </div>
              {activeCats.length === 0 ? (
                <div className="workspace-empty">
                  No categories to show yet. Start with a budget or your first
                  expense.
                </div>
              ) : (
                activeCats.slice(0, 5).map((cat) => {
                  const pct =
                    cat.budget > 0
                      ? Math.max(
                          0,
                          (Number(cat.total_expense) / Number(cat.budget)) *
                            100,
                        )
                      : 0;
                  let progressColor = "var(--primary)";
                  if (pct >= 80) progressColor = "var(--warning)";
                  if (pct > 100) progressColor = "var(--destructive)";
                  return (
                    <Link
                      key={cat.uid || cat.name}
                      className="workspace-budget-row"
                      to={`/expenses?date=${month}&category=${encodeURIComponent(cat.name)}`}
                    >
                      <div className="workspace-budget-label">
                        <span className="category-with-icon">
                          <CategoryIcon name={cat.icon} />
                          {cat.name}
                        </span>
                        <span>
                          {money(cat.total_expense)} /{" "}
                          {cat.budget > 0 ? money(cat.budget) : "No budget"}
                        </span>
                      </div>
                      {!hidden && (
                        <div className="workspace-track">
                          <span
                            style={{
                              width: `${Math.min(pct, 100)}%`,
                              background: progressColor,
                            }}
                          />
                        </div>
                      )}
                      {pct > 100 && !hidden && (
                        <div
                          className="workspace-note"
                          style={{ color: "var(--destructive)", marginTop: 5 }}
                        >
                          {money(cat.total_expense - cat.budget)} over budget
                        </div>
                      )}
                    </Link>
                  );
                })
              )}
            </section>
          </div>
          <section className="workspace-card">
            <div className="workspace-card-header">
              <h2>Recent expenses</h2>
              <Link to={`/expenses?date=${month}`}>View all expenses ↗</Link>
            </div>
            {recentError && (
              <div className="workspace-empty">
                We couldn&apos;t load your recent expenses.{" "}
                <button
                  type="button"
                  className="workspace-button"
                  onClick={() => setRetry((value) => value + 1)}
                >
                  Retry
                </button>
              </div>
            )}
            {!recentError &&
              (recent.length === 0 ? (
                <div className="workspace-empty">
                  No expenses recorded this month.{" "}
                  <Link to="/new">Add an expense</Link> to get started.
                </div>
              ) : (
                recent.map((expense) => (
                  <div className="workspace-transaction" key={expense.uid}>
                    <span className="workspace-transaction-icon">
                      <CategoryIcon name={expense.category_icon} />
                    </span>
                    <div>
                      <div className="workspace-transaction-name">
                        {expense.notes || expense.category_name}
                      </div>
                      <div className="workspace-note">
                        {expense.category_name} ·{" "}
                        {moment(expense.transaction_date).format("MMM D")}
                      </div>
                    </div>
                    <span className="workspace-transaction-amount">
                      {money(expense.amount)}
                    </span>
                  </div>
                ))
              ))}
          </section>
          {!hidden && (
            <details className="workspace-reports" open>
              <summary>Detailed spending reports</summary>
              <div className="workspace-panels">
                <section className="workspace-card">
                  <DailyExpenseReport
                    dailyReport={insights.daily_report || {}}
                  />
                </section>
                <section className="workspace-card">
                  <WeeklyExpenseReport
                    weeklyReport={insights.weekly_report || {}}
                  />
                </section>
              </div>
              <section className="workspace-card">
                <ExpenseInsight expenseInsights={insights} />
              </section>
            </details>
          )}
        </>
      )}
      <QuickExpense
        onSaved={() => {
          changeMonth(moment().startOf("month").format("YYYY-MM-DD"));
          setRetry((value) => value + 1);
        }}
      />
    </div>
  );
}
