import {
  Box,
  Button,
  Chip,
  CircularProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useSelector } from "react-redux";
import fetchData from "../../Utils/fetchData";
import notify from "../../Utils/notify";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const statusMap = {
    planned: { label: "برنامه‌ریزی شده", color: "info" },
    completed: { label: "انجام شده", color: "success" },
    skipped: { label: "رد شده", color: "warning" },
  };


  useEffect(() => {
    (async () => {
      const res = await fetchData("workouts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.success) {
        setWorkouts(res.data);
      }
      setLoading(false);
    })();
  }, [token]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }


  const handleStatusChange = async (workoutId, newStatus) => {
    const res = await fetchData(`workouts/${workoutId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if(res.success) {
      notify("success", "وضعیت تمرین با موفقیت به‌روزرسانی شد");
      setWorkouts((workout) =>
        workout.map((w) =>
          w._id === workoutId ? { ...w, status: newStatus } : w
        )
      );
    } else {
      notify("error", "خطا در تغییر وضعیت");
    }
  };


  const workoutItems = workouts.map((workout) => {
    const statusInfo = statusMap[workout.status] || statusMap.planned;

    return <Paper
      key={workout._id}
      elevation={2}
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 3,
      }}
    >
      <Box gap={4}>
        <Typography variant="h6">{workout.title}</Typography>

        <Typography variant="body2" color="text.secondary" mt={0.5}>
          تاریخ: {new Date(workout.scheduledDate).toLocaleDateString("fa-IR")}
        </Typography>

        <Stack direction="row" spacing={1} mt={1} gap={1}>
          <Chip label={workout.exerciseId?.title} size="small" />
          <Chip
            label={statusInfo.label}
            color={statusInfo.color}
            size="small"
          />
        </Stack>
      </Box>
      <Select
        size="small"
        value={workout.status}
        onChange={(e) =>
          handleStatusChange(workout._id, e.target.value)
        }
      >
        <MenuItem value="planned">در انتظار</MenuItem>
        <MenuItem value="completed">انجام شده</MenuItem>
        <MenuItem value="skipped">رد شده</MenuItem>
      </Select>

      <FitnessCenterIcon color="action" />
    </Paper>
  }  );


  return (
    <Box maxWidth={900} mx="auto" my={6}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        تمرین‌های من
      </Typography>

      {workouts.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary">
            هنوز هیچ تمرینی ثبت نکردی 💪
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/workout")}>ثبت تمرین</Button>
        </Paper>
      ) : (
        <Stack spacing={2}>{workoutItems}</Stack>
      )}
    </Box>
  );
}
