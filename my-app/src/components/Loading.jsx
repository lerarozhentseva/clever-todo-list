import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "../index";

export function Loading() {
  return (
    <div className="loading">
      <CircularProgress color="inherit" />
    </div>
  );
}
