import { createTheme } from "@mui/material/styles";

export const theme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode: mode,
      background: {
        paper: mode === "light" ? "#ffffff" : "#192734",
        default: mode === "light" ? "rgba(0, 0, 0, 0.04)" : "#17212b",
      },
      primary: {
        main: "#0179bb",
      },
      secondary: {
        main: "#e18e11",
        light: "#fcf3e6",
      },
      accent: {
        main: "#5B759F",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1280,
        xl: 1536,
      },
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 14,
    },
  });

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}
