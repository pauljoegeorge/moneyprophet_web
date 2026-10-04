import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  BalanceOutlined,
  ReceiptLong,
  PostAdd,
  PinDrop,
  Settings,
  AccountBalance,
  AutoAwesome,
} from "@mui/icons-material";
import { DrawerHeader, Drawer } from "../utils/drawer";
import NavDrawerSection from "./NaviDrawerSection";

function NavDrawer(props) {
  const { open, handleDrawer } = props;
  const theme = useTheme();
  const isDesktop = window.innerWidth >= 1200;
  const drawerVariant = isDesktop ? "permanent" : "temporary";
  const overViewItems = [
    { name: "Dashboard", icon: DashboardIcon, href: "/dashboard" },
    { name: "Expenses", icon: ReceiptLong, href: "/expenses" },
    { name: "Fixed Expenses", icon: AccountBalance, href: "/r_expenses" },
    { name: "Map", icon: PinDrop, href: "/map" },
  ];
  const managementItems = [
    { name: "Chat", icon: AutoAwesome, href: "/chat" },
    { name: "New", icon: PostAdd, href: "/new" },
    { name: "Budget", icon: BalanceOutlined, href: "/budget" },
  ];
  const OtherItems = [{ name: "Settings", icon: Settings, href: "/settings" }];

  return (
    <Drawer
      variant={drawerVariant}
      open={open}
      onClose={() => handleDrawer(false)}
    >
      <DrawerHeader>
        <IconButton onClick={() => handleDrawer(false)}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <NavDrawerSection
        open={open}
        sectionHead="OVERVIEW"
        sectionItems={overViewItems}
      />
      <NavDrawerSection
        open={open}
        sectionHead="MANAGEMENT"
        sectionItems={managementItems}
      />
      <NavDrawerSection
        open={open}
        sectionHead="OTHERS"
        sectionItems={OtherItems}
      />
    </Drawer>
  );
}

NavDrawer.propTypes = {
  open: PropTypes.bool,
  handleDrawer: PropTypes.func.isRequired,
};

NavDrawer.defaultProps = {
  open: false,
};

export default NavDrawer;
