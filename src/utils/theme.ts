import { createTheme } from "@mui/material/styles";

export const theme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#1A237E",
      },
      secondary: {
        main: "#F48FB1",
      },
      accent: {
        main: "#5B759F",
      },
    },
    typography: {
      fontFamily: ["Raleway", "sans-serif"].join(","),
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
