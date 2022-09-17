import React from "react";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDarkMode } from "next-dark-mode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";

const Menu = () => {
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode();
  const [fullscreen, setFullscreen] = React.useState(false);

  const toggleMode = () => {
    darkModeActive ? switchToLightMode() : switchToDarkMode();
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    }
  };

  return (
    <AppBar position="fixed" elevation={0} variant="outlined" color="transparent" sx={{ backdropFilter: "blur(20px)" }}>
      <Container sx={{ mx: "auto" }}>
        <Toolbar>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: 1, py: 1 }}>
            <Stack sx={{ width: 100, height: 50, position: "relative" }}>
              <Image src="/logo.svg" layout="fill" objectFit="contain" />
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              sx={{
                borderRadius: 10,
                bgcolor: "action.hover",
                minWidth: { xs: 300, md: 500 },
                height: 40,
                px: 4,
                cursor: "pointer",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Search...
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ⌘K
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={toggleMode}>
                {darkModeActive ? <DarkModeIcon /> : <LightModeIcon color="warning" />}
              </IconButton>
              <IconButton onClick={toggleFullscreen}>
                {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" color="secondary" sx={{ borderRadius: 10, px: 4, py: 1 }} disableElevation>
                Log In
              </Button>
              <Button variant="contained" color="primary" sx={{ borderRadius: 10, px: 4, py: 1 }} disableElevation>
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Menu;
