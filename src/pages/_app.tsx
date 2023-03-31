import ToastNotification from "@/components/common/Toast";
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
import Script from "next/script";
import NextNprogress from "nextjs-progressbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { darkModeActive } = useDarkMode();
  const mode = darkModeActive ? "dark" : "light";

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>

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
              "rgba(255, 255, 255, 0.12)",
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Component {...pageProps} />
          </LocalizationProvider>
        </ThemeProvider>
      </MantineProvider>
    </>
  );
}

export default withDarkMode(MyApp);
