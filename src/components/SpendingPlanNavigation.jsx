import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function SpendingPlanNavigation() {
  const { search } = useLocation();
  return (
    <nav
      className="workspace-plan-navigation"
      aria-label="Spending plan sections"
    >
      <NavLink
        exact
        to={{ pathname: "/budget", search }}
        activeClassName="is-active"
      >
        Monthly budget
      </NavLink>
      <NavLink
        exact
        to={{ pathname: "/r_expenses", search }}
        activeClassName="is-active"
      >
        Fixed bills
      </NavLink>
    </nav>
  );
}
