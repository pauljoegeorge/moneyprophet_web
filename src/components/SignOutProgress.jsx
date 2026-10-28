import React from "react";
import PropTypes from "prop-types";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function SignOutProgress({ open }) {
  return (
    <Dialog
      open={open}
      fullScreen
      disableEscapeKeyDown
      transitionDuration={0}
      aria-labelledby="sign-out-title"
      aria-describedby="sign-out-description"
      slotProps={{
        paper: {
          sx: { alignItems: "center", justifyContent: "center", p: 3 },
        },
      }}
    >
      <CircularProgress size={28} aria-hidden="true" />
      <DialogTitle id="sign-out-title">Signing out…</DialogTitle>
      <DialogContent sx={{ flex: "0 0 auto", textAlign: "center" }}>
        <p id="sign-out-description" role="status">
          Please wait a moment.
        </p>
      </DialogContent>
    </Dialog>
  );
}

SignOutProgress.propTypes = { open: PropTypes.bool.isRequired };
