import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { AccountCircle } from "@mui/icons-material";
import { PBold } from "../../../components/Text";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/sign_in";
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        sx={{
          marginLeft: "auto",
          borderRadius: "8px",
          padding: "8px",
          color: "var(--foreground)",
          "&:hover": { backgroundColor: "var(--muted)" },
        }}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={{
          "& .MuiPaper-root": {
            padding: "8px 16px",
          },
        }}
      >
        <PBold>Profile</PBold>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ margin: "16px 0px 0px 0px" }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProfileMenu;
