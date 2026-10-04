import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import { AddAPhoto, DarkMode, LightMode } from "@mui/icons-material";
import { AppBar } from "../utils/drawer";
import { FlexContainer } from "../../../components/Div";
import { useThemeMode } from "../../../contexts/ThemeContext";
import ProfileMenu from "./ProfileMenu";
import NavDrawer from "./NavDrawer";

const iconBtnSx = {
  borderRadius: "8px",
  padding: "8px",
  color: "var(--foreground)",
  "&:hover": { backgroundColor: "var(--muted)" },
};

function NavigationBar() {
  const [open, setOpen] = useState(() => window.innerWidth >= 1200);
  const { mode, toggleMode } = useThemeMode();
  const isMapPage = window.location.pathname.includes("/map") && !open;

  const muiTheme = createTheme({ palette: { mode } });

  const handleDrawer = (state) => {
    setOpen(state);
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            paddingRight: "16px",
            paddingLeft: "16px",
            minHeight: "56px",
          }}
        >
          <FlexContainer justify="flex-start">
            <IconButton
              aria-label="open navigation menu"
              onClick={() => handleDrawer(true)}
              edge="start"
              sx={{
                marginRight: 3,
                ...(open && window.innerWidth >= 1200 && { display: "none" }),
                ...iconBtnSx,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "-0.03em",
                color: "var(--foreground)",
              }}
            >
              MoneyProphet
            </Typography>
          </FlexContainer>
          <IconButton
            aria-label="Open AI chat"
            onClick={() => navigateTo("/chat")}
            sx={iconBtnSx}
          >
            <AutoAwesome sx={{ fontSize: "1.25rem" }} />
          </IconButton>
          <IconButton
            aria-label="Add transaction from photo"
            onClick={() => navigateTo("/new/bill")}
            sx={iconBtnSx}
          >
            <AddAPhoto sx={{ fontSize: "1.25rem" }} />
          </IconButton>
          <IconButton
            aria-label={
              mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleMode}
            sx={iconBtnSx}
          >
            {mode === "dark" ? (
              <LightMode sx={{ fontSize: "1.25rem" }} />
            ) : (
              <DarkMode sx={{ fontSize: "1.25rem" }} />
            )}
          </IconButton>
          <ProfileMenu />
        </Toolbar>
      </AppBar>
      {!isMapPage && <NavDrawer open={open} handleDrawer={handleDrawer} />}
    </ThemeProvider>
  );
}

export default NavigationBar;
