import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

function NavDrawerSection(props) {
  const { open, sectionHead, sectionItems } = props;
  const theme = useTheme();

  return (
    <List>
      <p
        style={{
          opacity: open ? 1 : 0,
          marginLeft: `calc(${theme.spacing(2)} + 1px)`,
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          marginBottom: "2px",
          marginTop: "16px",
        }}
      >
        {sectionHead}
      </p>
      {sectionItems.map((item) => {
        const isActive =
          window.location.pathname === item.href ||
          window.location.pathname.startsWith(`${item.href}/`);

        return (
          <ListItem
            key={item.name}
            disablePadding
            sx={{
              display: "block",
              borderRadius: "8px",
              mx: "6px",
              width: "calc(100% - 12px)",
              mb: "2px",
            }}
          >
            <ListItemButton
              aria-current={isActive ? "page" : undefined}
              sx={{
                minHeight: 40,
                justifyContent: open ? "initial" : "center",
                px: 1.5,
                borderRadius: "8px",
                backgroundColor: isActive
                  ? "var(--accent)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isActive
                    ? "var(--muted)"
                    : "var(--muted)",
                },
              }}
              href={item.href}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                  color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                }}
              >
                <item.icon sx={{ fontSize: "1.1rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{
                  opacity: open ? 1 : 0,
                  "& .MuiListItemText-primary": {
                    fontSize: "0.8125rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--primary)" : "var(--foreground)",
                    fontFamily: '"IBM Plex Sans", sans-serif',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

NavDrawerSection.propTypes = {
  open: PropTypes.bool,
  sectionHead: PropTypes.string.isRequired,
  sectionItems: PropTypes.instanceOf(Array).isRequired,
};

NavDrawerSection.defaultProps = {
  open: false,
};

export default NavDrawerSection;
