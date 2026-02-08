import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useFormFields from "../../../Hooks/useFormFields";
import { login } from "../../../Store/Slice/AuthSlice";
import notify from "../../../Utils/notify";
import { useDispatch } from "react-redux";
import fetchData from "../../../Utils/fetchData";
import { Link } from "react-router-dom";

export default function Login({ handlePageType }) {
  const [fields, handleChange, setFields] = useFormFields({
    username: "",
    password: "",
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
      const res = await fetchData("auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (res.success) {
        notify("success", "خوش آمدید! ورود با موفقیت انجام شد");
        dispatch(login(res.data));
      } else {
        notify("error", res.message || "ورود ناموفق بود");
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
        <Typography textAlign={"center"}>ورود به حساب کاربری</Typography>

        <Box onSubmit={handleSubmit} component="form" sx={{ mt: 2 }} gap={2} display="flex" flexDirection="column">
          <TextField
            fullWidth
            label="نام کاربری"
            name="username"
            value={fields.username}
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

          <Button fullWidth variant="contained" type="submit" disabled={loading}>
            {loading ? "در حال ورود..." : "ورود"}
          </Button>
        </Box>

        <Typography textAlign={"center"} my={2}> 
           حساب کاربری ندارید؟
           <Link onClick={() => handlePageType("register")} style={{ marginLeft: 4 }}>ثبت نام کنید</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
