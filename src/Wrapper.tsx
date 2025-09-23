import React, { useEffect } from "react";
import App from "./App";
import { Toaster } from "sonner";
import { useThemeStore } from "./store/themeStore";
import { ErrorProvider } from "./context/errorContext";

const Wrapper = () => {
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [setTheme]);
  return (
    <>
      <ErrorProvider>
        <App />
        <Toaster />
      </ErrorProvider>
    </>
  );
};

export default Wrapper;
