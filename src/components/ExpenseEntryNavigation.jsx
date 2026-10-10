import React from "react";
import { NavLink } from "react-router-dom";
import { PenLine, Sparkles } from "lucide-react";

export default function ExpenseEntryNavigation() {
  return (
    <nav
      className="workspace-plan-navigation workspace-entry-navigation"
      aria-label="Expense entry methods"
    >
      <NavLink exact to="/new" activeClassName="is-active">
        <PenLine size={16} />
        Manual
      </NavLink>
      <NavLink exact to="/chat" activeClassName="is-active">
        <Sparkles size={16} />
        Text
      </NavLink>
    </nav>
  );
}
