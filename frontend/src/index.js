import { StyledEngineProvider } from "@mui/material";
import React from "react";
import App from "./App";

import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));

root.render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>
);
