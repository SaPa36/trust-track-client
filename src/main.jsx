import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./router/router";

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 800, // Animation duration in milliseconds
  easing: 'ease-in-out', // Easing function for the animation
  once: true, // Whether animation should happen only once - while scrolling down
  mirror: false, // Whether elements should animate out while scrolling past them
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-urbanist max-w-7xl mx-auto">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
