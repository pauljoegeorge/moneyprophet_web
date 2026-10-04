import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { FlexContainer } from "../../components/Container";
import InteractiveTable from "../../components/InteractiveTable";
import CategoryIcon from "../../components/CategoryIcon";
import { formattedCurrency } from "../../utils/currency";
import { P, PBold } from "../../components/Text";
import { setExpenseSortParams } from "./utils/utils";

const SORT_LABELS = {
  fixed_expense_category_id: "Category",
  amount: "Amount",
  notes: "Notes",
  transaction_date: "Date",
};

function ExpensesViewMode(props) {
  const { expenses, handleSortExpenses, sortParams, setSortParams } = props;

  useEffect(() => {
    const sortParam = sortParams.find((s) => s.active);
    handleSortExpenses(sortParam.field, sortParam.order);
  }, [sortParams]);

  const handleCategoryClick = (field) => {
    const updatedParams = setExpenseSortParams(sortParams, field);
    setSortParams(updatedParams);
  };

  const activeSort = sortParams.find((s) => s.active);

  return (
    <FlexContainer
      className="workspace-expense-table"
      width="100%"
      style={{ flexDirection: "column" }}
    >
      {/* mobile sort bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          padding: "12px 0 4px",
        }}
      >
        {sortParams.map((param) => {
          const isActive = param.active;
          return (
            <button
              key={param.field}
              type="button"
              onClick={() => handleCategoryClick(param.field)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
                padding: "5px 12px",
                borderRadius: "99px",
                border: `1px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
                backgroundColor: isActive ? "var(--accent)" : "var(--card)",
                color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                fontSize: "12px",
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {SORT_LABELS[param.field]}
              {isActive &&
                (activeSort.order === "asc" ? (
                  <ArrowDropDown
                    style={{ fontSize: "1rem", marginLeft: "-2px" }}
                  />
                ) : (
                  <ArrowDropUp
                    style={{ fontSize: "1rem", marginLeft: "-2px" }}
                  />
                ))}
            </button>
          );
        })}
      </div>

      <InteractiveTable
        heads={[
          { Category: "fixed_expense_category_id" },
          { Amount: "amount" },
          { Notes: "notes" },
          { Date: "transaction_date" },
        ]}
        handleClick={handleCategoryClick}
        sortParams={sortParams}
      >
        {(expenses || []).map((expense) => (
          <tr key={expense.uid || expense.transaction_date + expense.amount}>
            <td data-label="Category">
              <span className="category-with-icon">
                <CategoryIcon name={expense.category_icon} />
                <PBold tt="none" size="14px" align="left">{expense.category_name}</PBold>
              </span>
            </td>
            <td data-label="Amount">
              <P>{formattedCurrency(expense.amount)}</P>
            </td>
            <td data-label="Notes">
              <P tt="none">{expense.notes}</P>
            </td>
            <td data-label="Date">
              <P>{expense.transaction_date}</P>
            </td>
          </tr>
        ))}
      </InteractiveTable>
    </FlexContainer>
  );
}

ExpensesViewMode.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSortExpenses: PropTypes.func.isRequired,
  sortParams: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setSortParams: PropTypes.func.isRequired,
};

export default ExpensesViewMode;
