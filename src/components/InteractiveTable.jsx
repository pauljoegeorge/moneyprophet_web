import React from "react";
import PropTypes from "prop-types";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { H3Bold } from "./Text";
import { THead } from "./Table";
import { FlexContainer } from "./Container";

function InteractiveTable(props) {
  const { title, heads, children, handleClick, sortParams } = props;
  const activeSortParam = sortParams.find((s) => s.active);

  return (
    <FlexContainer
      width="100%"
      className="mt-4"
      style={{ flexDirection: "column" }}
    >
      {title && (
        <div>
          <H3Bold>{title}</H3Bold>
        </div>
      )}
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <THead>
            <tr>
              {(heads || []).map((head) => {
                const key = Object.keys(head)[0];
                const value = Object.values(head)[0];
                let icon = null;
                if (activeSortParam.field === value) {
                  icon =
                    activeSortParam.order === "asc" ? (
                      <ArrowDropDown />
                    ) : (
                      <ArrowDropUp />
                    );
                }
                return (
                  <th key={key} style={{ cursor: "pointer" }}>
                    <button
                      type="button"
                      className="workspace-table-sort"
                      onClick={() => handleClick(value)}
                    >
                      {key}
                      {icon}
                    </button>
                  </th>
                );
              })}
            </tr>
          </THead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </FlexContainer>
  );
}

InteractiveTable.propTypes = {
  handleClick: PropTypes.func.isRequired,
  sortParams: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  heads: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InteractiveTable;
