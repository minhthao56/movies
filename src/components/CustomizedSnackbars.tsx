import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSnackbarContext } from "../contexts/SnackbarContext";
import { forwardRef } from "react";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const { opened, setOpened } = useSnackbarContext();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpened({
      isOpened: false,
      severity: "success",
      message: "",
    });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={opened?.isOpened}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={opened?.severity}
          sx={{ width: "100%" }}
        >
          {opened?.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
