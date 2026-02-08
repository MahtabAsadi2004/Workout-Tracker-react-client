import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useFormFields from "../../../Hooks/useFormFields";
import { login } from "../../../Store/Slice/AuthSlice";
import notify from "../../../Utils/notify";
import { useDispatch } from "react-redux";
import fetchData from "../../../Utils/fetchData";
import { Link } from "react-router-dom";

export default function Register({ handlePageType }) {
  const [fields, handleChange, setFields] = useFormFields({
    username: "",
    password: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};

    if (!fields.username.trim()) {
      newErrors.username = "نام کاربری الزامی است";
    }

    if (!fields.password) {
      newErrors.password = "رمز عبور الزامی است";
    }

    // setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetchData("auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (res.success) {
        notify("success", "خوش آمدید! ثبت‌نام با موفقیت انجام شد");
        handlePageType("login");

      } else {
        notify("error", res.message || "ثبت‌نام ناموفق بود");
        setFields({
          username: "",
          password: "",
        });
      }
    } catch (error) {
      notify("error", "An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: "auto", mt: 8 }}>
        <Typography textAlign={"center"}>ایجاد حساب کاربری</Typography>

        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{ mt: 2 }}
          gap={2}
          display="flex"
          flexDirection="column"
        >
          <TextField
            fullWidth
            label="نام کاربری"
            name="username"
            value={fields.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="ایمیل"
            name="email"
            value={fields.email}
            onChange={handleChange}
          />
          
          <TextField
            fullWidth
            label="رمز عبور"
            name="password"
            type="password"
            value={fields.password}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
          >
            {loading ? "در حال ورود..." : "ورود"}
          </Button>
        </Box>

        <Typography textAlign={"center"} my={2}>
          قبلاً ثبت‌نام کرده‌اید؟
          <Link
            onClick={() => handlePageType("login")}
            style={{ marginLeft: 4 }}
          >
            ورود به حساب کاربری
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
