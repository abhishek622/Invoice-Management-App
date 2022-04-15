import React, { Suspense } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import TableContextProvider from "./helpers/providers/TableContextProvider";

const Home = React.lazy(() => import("./pages/Home"));

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#C3E0E5",
        contrastText: "#000",
      },
      secondary: {
        main: "#5885AF",
        contrastText: "#ffffff",
        dark: "#41729F",
      },
      success: {
        main: "#3dd443",
      },
      background: {
        default: "#283d4a",
        paper: "#2d4250",
      },
    },
  });

  return (
    <Suspense
      fallback={<div style={{ height: "100vh", backgroundColor: "#283d4a" }} />}
    >
      <TableContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Home />
        </ThemeProvider>
      </TableContextProvider>
    </Suspense>
  );
}

export default App;
