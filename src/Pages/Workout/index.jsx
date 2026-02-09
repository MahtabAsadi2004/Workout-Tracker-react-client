import React, { use, useEffect, useState } from "react";
import fetchData from "../../Utils/fetchData";
import useFormFields from "../../Hooks/useFormFields";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import notify from "../../Utils/notify";

export default function Workout() {
  const [exercises, setExercises] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [fields, handleChange, setFields] = useFormFields({
    exerciseId: "",
    title: "",
    scheduledDate: "",
  });

  useEffect(() => {
    (async () => {
      const res = await fetchData("exercises", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.success) {
        setExercises(res.data);
      }
    })();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(fields);

    const res = await fetchData("workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });

    if (res.success) {
      notify("success", "تمرین با موفقیت اضافه شد");
    } else {
      notify("error", res.message || "خطا در اضافه کردن تمرین");
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 4 }}>
      <Typography variant="h5" mb={3}>
        ساخت تمرین جدید
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          select
          label="انتخاب حرکت"
          value={fields.exerciseId}
          onChange={handleChange}
          name="exerciseId"
          required
        >
          {exercises?.map((ex) => (
            <MenuItem key={ex._id} value={ex._id}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{ex.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {ex.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ex.muscleGroup}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="عنوان تمرین"
          value={fields.title}
          onChange={handleChange}
          name="title"
          required
        />

        <TextField
          type="date"
          label="تاریخ انجام"
          InputLabelProps={{ shrink: true }}
          value={fields.scheduledDate}
          onChange={handleChange}
          name="scheduledDate"
          required
        />

        <Button variant="contained" type="submit">
          ایجاد تمرین
        </Button>
      </Box>
    </Paper>
  );
}
