import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useBudgetSuggestions } from "./hooks/useBudgetSuggestions";
import CentralLoader from "../../components/CentralLoader";
import { MainWrapper } from "../Dashboard/components/Div";
import { BoxWithShadow } from "../../components/Div";
import { H2Purple, H3Bold, PBold, P } from "../../components/Text";
import { PrimaryButton } from "../../components/Button";
import { THead } from "../../components/Table";
import { Input } from "../../components/ui/input";
import { getCurrencySymbol } from "../../utils/currency";

const fieldLabel = {
  display: "block",
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "var(--muted-foreground)",
  marginBottom: "6px",
  letterSpacing: "0.3px",
  textTransform: "uppercase",
};

function AmountInput({ value, onChange, symbol }) {
  return (
    <div style={{ position: "relative" }}>
      <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", fontSize: "14px", pointerEvents: "none" }}>
        {symbol}
      </span>
      <Input type="number" min="0" placeholder="0" value={value} onChange={(e) => onChange(e.target.value)} style={{ paddingLeft: "28px" }} />
    </div>
  );
}

export default function BudgetSuggestionsContainer() {
  const { isLoading, isGenerating, suggestions, error, actions } = useBudgetSuggestions();
  const [maxOverBudget, setMaxOverBudget] = useState("");
  const [additionalExpenses, setAdditionalExpenses] = useState([{ id: 1, category: "", amount: "" }]);
  const currencySymbol = getCurrencySymbol();

  useEffect(() => { actions.getSuggestions(); }, []);

  const updateRow = (index, field, value) => {
    setAdditionalExpenses((prev) => prev.map((row, i) => i === index ? { ...row, [field]: value } : row));
  };

  const addRow = () => setAdditionalExpenses((prev) => [...prev, { id: Date.now(), category: "", amount: "" }]);

  const removeRow = (index) => setAdditionalExpenses((prev) => prev.filter((_, i) => i !== index));

  const handleGenerate = () => {
    const expenses = additionalExpenses
      .filter((r) => r.category.trim() || r.amount)
      .map((r) => ({ category: r.category.trim(), amount: parseInt(r.amount, 10) || 0 }));
    actions.generateSuggestions(parseInt(maxOverBudget, 10) || 0, expenses);
  };

  return (
    <MainWrapper>
      <Toolbar />
      <div>
        <H2Purple className="mb-6">Budget Suggestions</H2Purple>

        {/* Input form */}
        <BoxWithShadow className="mb-6">
          <H3Bold style={{ marginBottom: "4px" }}>Generate Suggestions</H3Bold>
          <P size="0.875rem" style={{ color: "var(--muted-foreground)", marginBottom: "20px" }}>
            Tell us about your month so we can recommend smarter budget reductions.
          </P>

          {/* Max Over Budget */}
          <div className="mb-5" style={{ maxWidth: "280px" }}>
            <div style={fieldLabel}>Max Over Budget Allowed</div>
            <AmountInput symbol={currencySymbol} value={maxOverBudget} onChange={setMaxOverBudget} />
          </div>

          {/* Additional expenses by category */}
          <div className="mb-2">
            <div style={fieldLabel}>Expected Additional Expenses</div>
          </div>
          <div className="flex flex-col gap-2 mb-3">
            {additionalExpenses.map((row, index) => (
              <div key={row.id} className="flex items-center gap-3">
                <div style={{ flex: "1 1 160px" }}>
                  <Input
                    placeholder="Category (e.g. Vacation)"
                    value={row.category}
                    onChange={(e) => updateRow(index, "category", e.target.value)}
                  />
                </div>
                <div style={{ flex: "0 0 140px" }}>
                  <AmountInput symbol={currencySymbol} value={row.amount} onChange={(v) => updateRow(index, "amount", v)} />
                </div>
                <IconButton
                  onClick={() => removeRow(index)}
                  disabled={additionalExpenses.length === 1}
                  size="small"
                  sx={{ color: "var(--muted-foreground)", "&:hover": { color: "var(--destructive)" }, "&:disabled": { opacity: 0.3 } }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addRow}
            className="flex items-center gap-1 mb-5"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "var(--primary)", fontSize: "0.875rem", fontWeight: 500 }}
          >
            <AddIcon style={{ fontSize: "16px" }} /> Add expense
          </button>

<PrimaryButton size="lg" onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate Suggestions"}
          </PrimaryButton>
        </BoxWithShadow>

        {error && (
          <div style={{ padding: "12px 16px", borderRadius: "var(--radius-lg)", border: "1px solid var(--destructive)", color: "var(--destructive)", backgroundColor: "rgba(239,68,68,0.08)", marginBottom: "16px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        {isLoading && <CentralLoader />}

        {!isLoading && suggestions.length === 0 && (
          <div style={{ padding: "12px 16px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", color: "var(--muted-foreground)", backgroundColor: "var(--muted)", fontSize: "14px" }}>
            No suggestions yet. Fill in the form above and click Generate.
          </div>
        )}

        {!isLoading && suggestions.map((suggestionData) => {
          const analytics = suggestionData.analytics || {};
          const isOverBudget = analytics.is_over_budget;
          const generatedDate = new Date(suggestionData.generated_on).toLocaleDateString(
            undefined, { year: "numeric", month: "long", day: "numeric" }
          );

          return (
            <BoxWithShadow key={suggestionData.id} padding="0" style={{ overflow: "hidden", marginBottom: "20px" }}>
              <div style={{
                padding: "10px 20px",
                borderBottom: "1px solid var(--border)",
                backgroundColor: isOverBudget ? "rgba(239,68,68,0.1)" : "var(--accent)",
                color: isOverBudget ? "var(--destructive)" : "var(--success)",
                fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.3px",
              }}>
                {isOverBudget ? "Over budget" : "Within budget"} · Generated {generatedDate}
                {isOverBudget && analytics.is_possible_to_reduce_to_ceiling !== undefined && (
                  <span style={{ marginLeft: "12px", fontWeight: 400 }}>
                    · {analytics.is_possible_to_reduce_to_ceiling ? "Can meet ceiling with reductions" : "Cannot meet ceiling"}
                  </span>
                )}
              </div>

              <div style={{ padding: "20px" }}>
                <div className="flex flex-wrap gap-8 mb-4">
                  <div>
                    <PBold align="left" mb="2px">Expected Total Expense</PBold>
                    <P size="1.125rem" style={{ fontWeight: 700, color: "var(--foreground)" }}>
                      {analytics.forecasted_total_expense}
                    </P>
                  </div>
                  {analytics.total_budget && (
                    <div>
                      <PBold align="left" mb="2px">Total Budget</PBold>
                      <P size="1.125rem" style={{ fontWeight: 700, color: "var(--foreground)" }}>
                        {analytics.total_budget}
                      </P>
                    </div>
                  )}
                  {analytics.spending_ceiling && (
                    <div>
                      <PBold align="left" mb="2px">Spending Ceiling</PBold>
                      <P size="1.125rem" style={{ fontWeight: 700, color: "var(--foreground)" }}>
                        {analytics.spending_ceiling}
                      </P>
                    </div>
                  )}
                  {suggestionData.max_over_budget != null && (
                    <div>
                      <PBold align="left" mb="2px">Max Over Budget</PBold>
                      <P size="1.125rem" style={{ fontWeight: 700, color: "var(--foreground)" }}>
                        {currencySymbol}{suggestionData.max_over_budget}
                      </P>
                    </div>
                  )}
                  {Array.isArray(suggestionData.expected_additional_expenses) && suggestionData.expected_additional_expenses.length > 0 && (
                    <div>
                      <PBold align="left" mb="6px">Additional Expenses</PBold>
                      {suggestionData.expected_additional_expenses.map((item) => (
                        <P key={item.category} size="0.875rem" style={{ color: "var(--foreground)", marginBottom: "2px" }}>
                          {item.category}: <strong>{currencySymbol}{item.amount}</strong>
                        </P>
                      ))}
                    </div>
                  )}
                </div>

                {analytics.message && (
                  <P size="0.875rem" style={{ color: "var(--muted-foreground)", marginBottom: "16px" }}>
                    {analytics.message}
                  </P>
                )}

                {analytics.suggestions?.length > 0 && (
                  <>
                    <H3Bold style={{ marginBottom: "12px", marginTop: "16px" }}>Suggested Reductions</H3Bold>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <THead>
                          <tr>
                            <th>Category</th>
                            <th>Spent So Far</th>
                            <th>Forecasted</th>
                            <th>Target (rest of month)</th>
                            <th>Reduce By</th>
                            <th>Reason</th>
                          </tr>
                        </THead>
                        <tbody>
                          {analytics.suggestions.map((item) => (
                            <tr key={item.category}>
                              <td>{item.category}</td>
                              <td>{item.spent_so_far ?? "—"}</td>
                              <td>{item.forecasted_amount ?? "—"}</td>
                              <td style={{ color: "var(--success)", fontWeight: 600 }}>
                                {item.target_for_rest_of_month ?? item.target_amount ?? "—"}
                              </td>
                              <td style={{ color: "var(--destructive)", fontWeight: 600 }}>
                                {item.reduce_by}
                              </td>
                              <td style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>{item.reason}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {analytics.forecast_by_category?.length > 0 && (
                  <>
                    <H3Bold style={{ marginBottom: "12px", marginTop: "24px" }}>Forecast by Category</H3Bold>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <THead>
                          <tr>
                            <th>Category</th>
                            <th>Spent So Far</th>
                            <th>Forecasted Amount</th>
                            <th>Budget</th>
                            <th>Controllable</th>
                          </tr>
                        </THead>
                        <tbody>
                          {analytics.forecast_by_category.map((item) => (
                            <tr key={item.category}>
                              <td>{item.category}</td>
                              <td>{item.spent_so_far ?? "—"}</td>
                              <td>{item.forecasted_amount ?? "—"}</td>
                              <td style={{ color: "var(--muted-foreground)" }}>{item.budget ?? "—"}</td>
                              <td style={{ color: item.is_controllable ? "var(--success)" : "var(--muted-foreground)", fontSize: "0.8125rem" }}>
                                {item.is_controllable ? "Yes" : "No"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </BoxWithShadow>
          );
        })}
      </div>
    </MainWrapper>
  );
}
