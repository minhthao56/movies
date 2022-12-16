import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CustomizedSnackbars from "./components/CustomizedSnackbars";
import SnackbarProvider from "./providers/SnackbarProvider";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
        <CustomizedSnackbars />
      </SnackbarProvider>
    </ThemeProvider>
    <CssBaseline />
  </React.StrictMode>
);
