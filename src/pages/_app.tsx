import ToastNotification from "@/components/common/Toast";
import { BASE_API_URL } from "@/config/url";
import SEO from "@/utils/next-seo.config";
import { theme } from "@/utils/theme";
import { MantineProvider } from "@mantine/core";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "highlight.js/styles/tokyo-night-dark.css";
import withDarkMode, { useDarkMode } from "next-dark-mode";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import { useEffect } from "react";
import io from "socket.io-client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { darkModeActive } = useDarkMode();
  const mode = darkModeActive ? "dark" : "light";

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: mode,
        fontFamily: "Inter",
        colors: {
          dark: [
            "#C1C2C5",
            "#A6A7AB",
            "#909296",
            "#5C5F66",
            "#373A40",
            "#17212b",
            "#192734",
            "#17212b",
            "#192734",
            "#192734",
          ],
        },
      }}
    >
      <ThemeProvider theme={theme("light")}>
        <CssBaseline />
        <NextNprogress
          color={theme(mode).palette.primary.main}
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={false}
          options={{ easing: "ease", speed: 500 }}
        />

        <DefaultSeo {...SEO} />
        <ToastNotification />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </ThemeProvider>
    </MantineProvider>
  );
}

export default withDarkMode(MyApp);
