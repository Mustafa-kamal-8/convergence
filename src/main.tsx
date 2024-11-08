import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { Toaster } from "react-hot-toast";

import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import "@/styles/globals.css";
import Modals from "./components/modals/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <App />

        <Modals />
      </BrowserRouter>
    </CookiesProvider>

    <Toaster />
  </React.StrictMode>
);
