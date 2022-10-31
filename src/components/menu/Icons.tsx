import DarkModeIcon from "@mui/icons-material/DarkMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useDarkMode } from "next-dark-mode";
import { useRouter } from "next/router";
import React from "react";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import useStore from "@/hooks/useStore";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 3,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    color: "white",
  },
}));

const Icons = () => {
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode();
  const [fullscreen, setFullscreen] = React.useState(false);
  const user = useStore((state) => state.session?.user);
  const { push } = useRouter();

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
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton sx={{ display: { xs: "none", md: "flex" } }} onClick={toggleMode}>
        {darkModeActive ? <DarkModeIcon /> : <LightModeIcon color="warning" />}
      </IconButton>
      <IconButton sx={{ display: { xs: "none", md: "flex" } }} onClick={toggleFullscreen}>
        {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
      {user && (
        <IconButton aria-label="cart" onClick={() => push("/notifications")}>
          <StyledBadge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </StyledBadge>
        </IconButton>
      )}
    </Stack>
  );
};

export default Icons;
