import React, { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import { useForecasts } from "./hooks/useForecasts";
import CentralLoader from "../../components/CentralLoader";
import { MainWrapper } from "../Dashboard/components/Div";
import { BoxWithShadow, Flex } from "../../components/Div";
import { H2Purple, H3Bold, PBold, P } from "../../components/Text";
import { PrimaryButton } from "../../components/Button";
import { THead } from "../../components/Table";

const STATUS_COLORS = {
  ok: "var(--success)",
  warning: "var(--warning)",
  over_budget: "var(--destructive)",
  no_budget: "var(--muted-foreground)",
};

export default function ForecastsContainer() {
  const { isLoading, isGenerating, forecasts, error, actions } = useForecasts();

  useEffect(() => { actions.getForecasts(); }, []);

  return (
    <MainWrapper>
      <Toolbar />
      <div>
        <Flex justify="space-between" align="center" className="mb-4">
          <H2Purple>Expense Forecasts</H2Purple>
          <PrimaryButton
            size="lg"
            onClick={actions.generateForecast}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Forecast"}
          </PrimaryButton>
        </Flex>

        {error && (
          <div style={{
            padding: "12px 16px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--destructive)",
            color: "var(--destructive)",
            backgroundColor: "rgba(239,68,68,0.08)",
            marginBottom: "16px",
            fontSize: "14px",
          }}>
            {error}
          </div>
        )}

        {isLoading && <CentralLoader />}

        {!isLoading && forecasts.length === 0 && (
          <div style={{
            padding: "12px 16px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            color: "var(--muted-foreground)",
            backgroundColor: "var(--muted)",
            fontSize: "14px",
          }}>
            No forecasts available. Generate one to see predictions.
          </div>
        )}

        {!isLoading && forecasts.map((forecastData) => {
          const analytics = forecastData.analytics || {};
          const generatedDate = new Date(forecastData.generated_on).toLocaleDateString(
            undefined,
            { year: "numeric", month: "long", day: "numeric" }
          );

          return (
            <BoxWithShadow key={forecastData.id} padding="0" style={{ overflow: "hidden", marginBottom: "20px" }}>
              <div style={{
                padding: "10px 20px",
                borderBottom: "1px solid var(--border)",
                backgroundColor: "var(--muted)",
                color: "var(--muted-foreground)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.3px",
              }}>
                Forecast from {generatedDate}
              </div>

              <div style={{ padding: "20px" }}>
                <Flex gap="32px" className="mb-4" style={{ flexWrap: "wrap" }}>
                  <div>
                    <PBold align="left" mb="4px">Spent So Far</PBold>
                    <P size="1.125rem" style={{ fontWeight: 700, color: "var(--foreground)" }}>
                      {analytics.total_spent_so_far ?? "—"}
                    </P>
                  </div>
                  <div>
                    <PBold align="left" mb="4px">Forecasted Total</PBold>
                    <P size="1.125rem" style={{ fontWeight: 700, color: "var(--foreground)" }}>
                      {analytics.forecasted_total_expense}
                    </P>
                  </div>
                  {analytics.total_budget && (
                    <div>
                      <PBold align="left" mb="4px">Total Budget</PBold>
                      <P size="1.125rem" style={{ fontWeight: 700, color: "var(--foreground)" }}>
                        {analytics.total_budget}
                      </P>
                    </div>
                  )}
                </Flex>

                {analytics.message && (
                  <P size="0.875rem" style={{ color: "var(--muted-foreground)", marginBottom: "16px" }}>
                    {analytics.message}
                  </P>
                )}

                <H3Bold style={{ marginBottom: "12px", marginTop: "16px" }}>
                  Forecast by Category
                </H3Bold>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <THead>
                      <tr>
                        <th>Category</th>
                        <th>Spent So Far</th>
                        <th>Forecasted Amount</th>
                        <th>Budget</th>
                      </tr>
                    </THead>
                    <tbody>
                      {analytics.forecast_by_category?.length > 0 ? (
                        analytics.forecast_by_category.map((item) => (
                          <tr key={item.category}>
                            <td style={{ color: STATUS_COLORS[item.status] ?? "inherit", fontWeight: item.status === "over_budget" ? 600 : "inherit" }}>
                              {item.category}
                            </td>
                            <td>{item.spent_so_far ?? "—"}</td>
                            <td>{item.forecasted_amount}</td>
                            <td style={{ color: "var(--muted-foreground)" }}>
                              {item.budget ?? "—"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" style={{ color: "var(--muted-foreground)", textAlign: "center", padding: "16px", fontSize: "0.875rem" }}>
                            No category breakdown available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </BoxWithShadow>
          );
        })}
      </div>
    </MainWrapper>
  );
}
