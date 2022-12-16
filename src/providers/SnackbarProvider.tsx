import { ReactNode, useMemo, useState } from "react";
import { SnackbarContext, OpenedTypes } from "../contexts/SnackbarContext";

export interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarProvider = (props: SnackbarProviderProps) => {
  const { children } = props;

  const [opened, setOpened] = useState<OpenedTypes>({
    isOpened: false,
    severity: "success",
    message: "",
  });

  const value = useMemo(() => {
    return {
      opened,
      setOpened,
    };
  }, [opened]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
