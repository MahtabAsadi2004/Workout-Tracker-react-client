import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../Pages/Home";
import PublicLayout from "../Layout/Public";
import Auth from "../Pages/Auth";
import NotFound from "../Pages/NotFound";
import Workout from "../Pages/Workout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/auth",
            element: <Auth />,
          },
        ],
      },
      {
        path: "/workout",
        element: <Workout />,
      },
      {
        path:'*',
        element: <NotFound />,
      }
    ],
  },
]);
export default router;
