import Box from "@mui/material/Box";
import { useCallback } from "react";
import { useEffect } from "react";
import "./App.css";
import { useSnackbarContext } from "./contexts/SnackbarContext";
import MainRouters from "./routers/MainRouters";

function App() {
  const { setOpened } = useSnackbarContext();

  const handleOffline = useCallback(() => {
    setOpened({ isOpened: true, severity: "error", message: "Network error" });
  }, [setOpened]);
  const handleOnline = useCallback(() => {
    setOpened({
      isOpened: true,
      severity: "success",
      message: "Network comeback",
    });
  }, [setOpened]);

  useEffect(() => {
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOffline);
    };
  }, [handleOffline, handleOnline]);
  return (
    <Box className="App">
      <MainRouters />
    </Box>
  );
}

export default App;
