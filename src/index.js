import React from "react";
import ReactDOM from "react-dom/client";

import { HelmetProvider } from "react-helmet-async";
import './i18n';

// LEVEL2
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import App from './App';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
