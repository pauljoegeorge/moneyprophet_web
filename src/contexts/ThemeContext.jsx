import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const ThemeContext = createContext();
const STORAGE_KEY = "mp-theme";

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = useCallback(() => setMode((m) => (m === "light" ? "dark" : "light")), []);
  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeContext);
