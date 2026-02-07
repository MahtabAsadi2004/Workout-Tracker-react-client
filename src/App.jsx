import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
