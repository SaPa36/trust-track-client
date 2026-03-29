import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import RiderForm from "../pages/RiderForm/RiderForm";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/AuthLayout/Login/Login";
import Register from "../pages/AuthLayout/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoutes from "../routes/PrivateRoutes";
import SendParcel from "../pages/SendParcel/SendParcel";


export const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children:[
        {
            index: true,
            Component: Home
        },
        {
          path: "/coverage",
          Component: Coverage
        },
        {
          path: "/about",
          Component: About
        },
        {
          path: "/sendParcel",
          element: <PrivateRoutes><SendParcel /></PrivateRoutes>
        },
        {
          path: "/rider",
          element: <PrivateRoutes><RiderForm /></PrivateRoutes>
        }
      ]
    },
    {
      path: "/",
      Component: AuthLayout,
      children:[
        {
          path: "/login",
          Component: Login
        },
        {
          path: "/register",
          Component: Register
        }
      ]
    }
  ]);