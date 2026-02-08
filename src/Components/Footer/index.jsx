// components/Footer.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
      }}
      mt={2}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Workout Tracker — همه حقوق محفوظ است
      </Typography>
    </Box>
  );
}
