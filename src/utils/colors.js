// All values reference CSS variables defined in index.css.
// SVG charts inherit the workspace theme.
export const dataColors = {
  primary: "var(--primary)",
  primaryLight: "var(--primary)",
  purpleGrey: "var(--muted-foreground)",
  lightGrey: "var(--muted)", // used in chart fill + subtle UI surfaces
  cherry: "#ef4444",
  orange: "#f97316",
  yellow: "#f59e0b",
  blue: "var(--primary)",
  pastelPurple: "var(--chart-budget)",
  lavender: "var(--accent)",
  lightOrange: "rgba(249, 115, 22, 0.38)",
};

// Theme-aware tokens — use these in styled-components
export const colors = {
  // Surfaces
  bgPage: "var(--background)",
  bgCard: "var(--card)",
  bgSidebar: "var(--bg-sidebar)",

  // Text
  textPrimary: "var(--foreground)",
  textSecondary: "var(--muted-foreground)",
  textMuted: "var(--muted-foreground)",

  // Brand
  primary: "var(--primary)",
  primaryFg: "var(--primary-foreground)",

  // Borders & shadows
  borderLight: "var(--border)",
  shadowColor: "var(--shadow-color)",

  // Semantic
  destructive: "var(--destructive)",

  // Chart/data-viz tokens
  ...dataColors,
};
