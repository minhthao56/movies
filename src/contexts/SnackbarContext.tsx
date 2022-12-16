import type { AlertColor } from "@mui/material/Alert";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type OpenedTypes = {
  isOpened?: boolean;
  severity?: AlertColor;
  message: string;
};

export interface SnackbarContextReturn {
  opened?: OpenedTypes;
  setOpened: Dispatch<SetStateAction<OpenedTypes>>;
}

const SnackbarContext = createContext<SnackbarContextReturn>({
  setOpened: () => {},
  opened: {
    isOpened: false,
    severity: "success",
    message: "",
  },
});

SnackbarContext.displayName = "SnackbarContext";

const useSnackbarContext = () => useContext(SnackbarContext);
export { SnackbarContext, useSnackbarContext };
