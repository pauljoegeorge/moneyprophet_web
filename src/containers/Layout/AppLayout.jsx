import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Sprout,
  LayoutDashboard,
  Wallet,
  ChartPie,
  MapPin,
  Settings,
  Plus,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { useThemeMode } from "../../contexts/ThemeContext";
import { clearTokens, getCurrentUser } from "../../utils/auth";
import "./workspace.css";

const workspace = [
  { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "Expenses", path: "/expenses", icon: Wallet },
  { label: "Add expense", path: "/new", icon: Plus },
  { label: "Spending plan", path: "/budget", icon: ChartPie },
  { label: "Map", path: "/map", icon: MapPin },
];
const tools = [{ label: "Settings", path: "/settings", icon: Settings }];

export default function AppLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { mode, toggleMode } = useThemeMode();
  const { pathname } = useLocation();
  const user = getCurrentUser();
  const name = user?.name || "Personal workspace";
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const page =
    [...workspace, ...tools].find(
      (item) =>
        item.path === pathname ||
        (item.path === "/new" && ["/chat", "/new/bill"].includes(pathname)) ||
        (item.path === "/budget" && pathname === "/r_expenses"),
    )?.label || "Add expense";
  const renderLinks = (items) =>
    items.map(({ label, path, icon: Icon }) => (
      <NavLink
        key={path}
        to={path}
        exact
        className="workspace-nav"
        activeClassName="is-active"
        isActive={(_, location) =>
          location.pathname === path ||
          (path === "/new" &&
            ["/chat", "/new/bill"].includes(location.pathname)) ||
          (path === "/budget" && location.pathname === "/r_expenses")
        }
        onClick={() => setMenuOpen(false)}
      >
        <Icon size={18} aria-hidden="true" />
        {label}
      </NavLink>
    ));

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode,
          primary: { main: mode === "dark" ? "#afd9bb" : "#35674d" },
          background: { paper: mode === "dark" ? "#202923" : "#ffffff" },
          text: {
            primary: mode === "dark" ? "#ecf2ed" : "#22352c",
            secondary: mode === "dark" ? "#aab8af" : "#647369",
          },
        },
        typography: { fontFamily: '"IBM Plex Sans", sans-serif' },
        shape: { borderRadius: 10 },
      })}
    >
      <div className="money-workspace">
        {menuOpen && (
          <button
            className="workspace-backdrop"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
            type="button"
          />
        )}
        <aside
          className={`workspace-sidebar ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <Link to="/dashboard" className="workspace-brand">
            <span>
              <Sprout size={22} aria-hidden="true" />
            </span>
            Money Prophet
          </Link>
          <button
            className="workspace-close workspace-icon-button"
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
          >
            <X size={20} />
          </button>
          <p className="workspace-nav-label">Your workspace</p>
          <nav>{renderLinks(workspace)}</nav>
          <p className="workspace-nav-label">Preferences</p>
          <nav>{renderLinks(tools)}</nav>
          <div className="workspace-profile">
            <span className="workspace-avatar">{initials}</span>
            <div>
              <strong>{name}</strong>
              <span>Personal workspace</span>
            </div>
          </div>
          <button
            className="workspace-nav"
            type="button"
            onClick={() => {
              clearTokens();
              window.location.href = "/sign_in";
            }}
          >
            <LogOut size={18} aria-hidden="true" />
            Sign out
          </button>
        </aside>
        <div className="workspace-body">
          <header className="workspace-topbar">
            <div className="workspace-breadcrumb">
              <button
                className="workspace-menu workspace-icon-button"
                type="button"
                aria-label="Open navigation"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={20} />
              </button>
              <span>
                Workspace <span aria-hidden="true">/</span>{" "}
                <strong>{page}</strong>
              </span>
            </div>
            <button
              className="workspace-icon-button"
              type="button"
              aria-label={
                mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
              onClick={toggleMode}
            >
              {mode === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
          </header>
          <main className="workspace-content">{children}</main>
          <footer className="workspace-footer">
            <span>Money Prophet · Personal finance, thoughtfully.</span>
            <Link to="/privacy.html" target="_blank">
              Privacy policy
            </Link>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

AppLayout.propTypes = { children: PropTypes.node.isRequired };
