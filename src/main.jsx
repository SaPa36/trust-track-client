import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./router/router";

import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from "./context/AuthContext/AuthProvider";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
AOS.init({
  duration: 800, // Animation duration in milliseconds
  easing: 'ease-in-out', // Easing function for the animation
  once: false, // Whether animation should happen only once - while scrolling down
  mirror: true, // Whether elements should animate out while scrolling past them
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
