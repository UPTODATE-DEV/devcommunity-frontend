import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDarkMode } from "next-dark-mode";

const Toast = () => {
  const { darkModeActive } = useDarkMode();
  const mode = darkModeActive ? "dark" : "light";
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      theme={mode}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Toast;
