import withDarkMode from "next-dark-mode";
import { theme } from '@/utils/theme';
import type { AppProps } from "next/app";
import { useDarkMode } from "next-dark-mode";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import NextNprogress from "nextjs-progressbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { darkModeActive } = useDarkMode();
  const mode = darkModeActive ? "dark" : "light";

  return (
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
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default withDarkMode(MyApp);
