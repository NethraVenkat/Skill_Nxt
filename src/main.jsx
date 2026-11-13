import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LessonProvider } from "./state/LessonProvider";
import App from "./app/App";
import "./styles/global.css";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LessonProvider>
        <App />
      </LessonProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
import "./styles/home-v2.css";

import "./styles/rooms-v2.css";
