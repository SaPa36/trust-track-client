import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import RiderForm from "../pages/RiderForm/RiderForm";

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
          path: "/about",
          Component: About
        },
        {
          path: "/rider",
          Component: RiderForm
        }
      ]
    },
  ]);