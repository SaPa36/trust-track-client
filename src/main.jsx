import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./router/router";

import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from "./context/AuthContext/AuthProvider";

AOS.init({
  duration: 800, // Animation duration in milliseconds
  easing: 'ease-in-out', // Easing function for the animation
  once: false, // Whether animation should happen only once - while scrolling down
  mirror: true, // Whether elements should animate out while scrolling past them
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-urbanist max-w-7xl mx-auto">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>
);
