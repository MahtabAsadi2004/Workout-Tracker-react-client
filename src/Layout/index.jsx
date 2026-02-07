import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Auth from "../Pages/Auth";

export default function Layout() {
  const token = useSelector((state) => state.auth.token);

  // if (!token) {
  //   return <Navigate to="/auth" replace />;
  // }

  return (
    <>
      <Navbar />
      <Box component={"main"} minHeight={"70vh"}>
        {token ? <Outlet /> : <Auth/>}
      </Box>

      <Footer />
    </>
  );
}
