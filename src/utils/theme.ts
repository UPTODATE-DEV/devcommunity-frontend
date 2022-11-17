import { createTheme } from "@mui/material/styles";

export const theme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode: mode,
      background: {
        paper: mode === "light" ? "#ffffff" : "#000f21",
        default: "#000f21",
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
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
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
