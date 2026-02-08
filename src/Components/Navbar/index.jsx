// components/Navbar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        background: "linear-gradient(90deg, #1e3c72, #2a5298)",
        direction: "ltr"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Title */}
        <Box display="flex" alignItems="center" gap={1}>
          <FitnessCenterIcon />
          <Typography variant="h6" fontWeight="bold">
            Workout Tracker
          </Typography>
        </Box>

        {/* Navigation */}
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            خانه
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/workout"
          >
            ساخت تمرین
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
