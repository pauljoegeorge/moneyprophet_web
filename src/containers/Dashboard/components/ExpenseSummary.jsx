import React from "react";
import PropTypes from "prop-types";
import { formattedCurrency } from "../../../utils/currency";

function SectionCard({ title, children }) {
  return (
    <div style={{
      flex: "1 1 280px",
      backgroundColor: "var(--card)",
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--border)",
      padding: "20px 20px 12px",
      transition: "box-shadow 0.2s ease",
    }}>
      <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted-foreground)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "16px" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

SectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function Row({ left, right, sub }) {
  return (
    <div style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px" }}>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--foreground)", textTransform: "capitalize", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {left}
        </span>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--foreground)", whiteSpace: "nowrap" }}>
          {right}
        </span>
      </div>
      {sub && <div style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "3px" }}>{sub}</div>}
    </div>
  );
}

Row.defaultProps = { sub: null };
Row.propTypes = {
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
  sub: PropTypes.string,
};

function ExpenseSummary({ filteredExpenseCategories, topTransactions, popularTransactions, isCurrentMonth }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "32px" }}>
      {isCurrentMonth && filteredExpenseCategories.length > 0 && (
        <SectionCard title="This Week">
          {filteredExpenseCategories.map((category) => (
            <Row
              key={category.name}
              left={category.name}
              right={formattedCurrency(category.total_expense_of_week)}
            />
          ))}
        </SectionCard>
      )}
      {topTransactions.length > 0 && (
        <SectionCard title="Peak Transactions">
          {topTransactions.map((transaction) => {
            const dateObject = new Date(transaction.transaction_date);
            const month = dateObject.toLocaleString("default", { month: "short" });
            const day = `0${dateObject.getDate()}`.slice(-2);
            return (
              <Row
                key={transaction.transaction_date}
                left={transaction.category_name}
                right={formattedCurrency(transaction.amount)}
                sub={`${day} ${month}${transaction.notes ? `  ·  ${transaction.notes}` : ""}`}
              />
            );
          })}
        </SectionCard>
      )}
      {Object.keys(popularTransactions).length > 0 && (
        <SectionCard title="Popular Transactions">
          {Object.entries(popularTransactions).map(([notes, transaction]) => (
            <Row
              key={notes}
              left={`${notes} (${transaction.count}x)`}
              right={formattedCurrency(transaction.total_spent)}
            />
          ))}
        </SectionCard>
      )}
    </div>
  );
}

ExpenseSummary.propTypes = {
  isCurrentMonth: PropTypes.bool.isRequired,
  filteredExpenseCategories: PropTypes.instanceOf(Array).isRequired,
  topTransactions: PropTypes.instanceOf(Array).isRequired,
  popularTransactions: PropTypes.instanceOf(Array).isRequired,
};

export default ExpenseSummary;
