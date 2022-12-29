import ToastNotification from "@/components/common/Toast";
import { BASE_API_URL } from "@/config/url";
import SEO from "@/utils/next-seo.config";
import { theme } from "@/utils/theme";
import { MantineProvider } from "@mantine/core";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "highlight.js/styles/tokyo-night-dark.css";
import withDarkMode, { useDarkMode } from "next-dark-mode";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import { useEffect } from "react";
import io from "socket.io-client";
import "../styles/globals.css";

const socket = io(BASE_API_URL);

function MyApp({ Component, pageProps }: AppProps) {
  const { darkModeActive } = useDarkMode();
  const mode = darkModeActive ? "dark" : "light";

  useEffect(() => {
    // Notification.requestPermission().then((result) => {
    //   console.log("NOTIFICATIONS:" + result);
    // });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("notification");
    };
  }, []);

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
            "#17212b",
            "#192734",
            "#17212b",
            "#192734",
            "#192734",
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

        <DefaultSeo {...SEO} />
        <ToastNotification />
        <Component {...pageProps} />
      </ThemeProvider>
    </MantineProvider>
  );
}

export default withDarkMode(MyApp);
