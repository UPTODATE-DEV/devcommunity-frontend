import { theme } from "@/utils/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import withDarkMode, { useDarkMode } from "next-dark-mode";
import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import "../styles/globals.css";
import "highlight.js/styles/androidstudio.css";
import { MantineProvider } from "@mantine/core";
import ToastNotification from "@/components/common/Toast";

import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const { darkModeActive } = useDarkMode();
  const mode = darkModeActive ? "dark" : "light";

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: mode,
        fontFamily: "Roboto",
        colors: {
          dark: [
            "#C1C2C5",
            "#A6A7AB",
            "#909296",
            "#5C5F66",
            "#373A40",
            "#2C2E33",
            "#000f21",
            "#000d21",
            "#141517",
            "#101113",
          ],
        },
      }}
    >
      <ThemeProvider theme={theme(mode)}>
        <CssBaseline />
        <NextNprogress
          color={theme(mode).palette.primary.main}
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={false}
          options={{ easing: "ease", speed: 500 }}
        />

        <ToastNotification />
        <Component {...pageProps} />
      </ThemeProvider>
    </MantineProvider>
  );
}

export default withDarkMode(MyApp);
