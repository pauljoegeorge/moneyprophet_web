import React from "react";
import PropTypes from "prop-types";
import { H3Bold } from "./Text";
import { THead } from "./Table";

function TableLayout({ title, heads, children }) {
  return (
    <div
      className="mt-12"
      style={{
        backgroundColor: "var(--card)",
        color: "var(--foreground)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--border)",
        padding: "24px",
        transition: "box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-hover)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="mb-4">
        <H3Bold>{title}</H3Bold>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <THead>
            <tr>
              {(heads || []).map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </THead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

TableLayout.propTypes = {
  title: PropTypes.string.isRequired,
  heads: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default TableLayout;
