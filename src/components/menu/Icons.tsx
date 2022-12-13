import DarkModeIcon from "@mui/icons-material/DarkMode";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LightModeIcon from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useDarkMode } from "next-dark-mode";
import { useRouter } from "next/router";
import React from "react";
import { useI18n } from "@/hooks/useI18n";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib/api";
import Image from "next/image";
import useSocket from "@/hooks/useSocket";
import { Button } from "@mui/material";

import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import TungstenIcon from "@mui/icons-material/Tungsten";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import ArrowDown from "@mui/icons-material/KeyboardArrowDown";

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
  const { push, locale } = useRouter();
  const [notifications, setNotifications] = React.useState(0);
  const socket = useSocket();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const toggleMode = () => {
    darkModeActive ? switchToLightMode() : switchToDarkMode();
  };

  const switchLanguages = useI18n<"fr" | "en">();

  const toggleLang = () => {
    switchLanguages(locale === "fr" ? "en" : "fr");
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

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  React.useEffect(() => {
    const getNotifications = async () => {
      const notifications = await getRequest({ endpoint: `/notifications/${user?.id}/count` });
      if (!notifications.error) {
        setNotifications(notifications.data);
      }
    };

    getNotifications();

    socket.on("notification", () => {
      getNotifications();
    });
  }, []);

  return (
    <Stack direction="row" alignItems="center" spacing={{ xs: 0, md: 1 }}>
      {user && (
        <IconButton aria-label="cart" onClick={() => push("/notifications")}>
          <StyledBadge badgeContent={notifications} max={99} color="secondary">
            <NotificationsIcon />
          </StyledBadge>
        </IconButton>
      )}

      <IconButton onClick={toggleMode}>
        {darkModeActive ? <DarkModeIcon /> : <LightModeIcon color="warning" />}
      </IconButton>

      {/* <IconButton sx={{ display: { xs: "none", md: "flex" } }} onClick={toggleFullscreen}>
        {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton> */}

      <Button
        ref={anchorRef}
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleToggle}
        color="inherit"
        variant='outlined'
        sx={{ display: { xs: "none", md: "flex" }, px: 1 }}
        endIcon={
          locale === "fr" ? (
            <Stack
              sx={{
                boxShadow: "0 0 5px 0 rgba(0,0,0,0.3)",
                borderRadius: 30,
              }}
            >
              <Image src="/icons/fr.png" width={20} height={20} alt="Logo fr" />
            </Stack>
          ) : (
            <Stack
              sx={{
                boxShadow: "0 0 5px 0 rgba(0,0,0,0.3)",
                borderRadius: 30,
              }}
            >
              <Image src="/icons/en.png" width={20} height={20} alt="Logo en" />
            </Stack>
          )
        }
      >
        <ArrowDown />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    selected={locale === "en"}
                    onClick={(e) => {
                      handleClose(e);
                      switchLanguages("en");
                    }}
                  >
                    En
                  </MenuItem>
                  <MenuItem
                    selected={locale === "fr"}
                    onClick={(e) => {
                      handleClose(e);
                      switchLanguages("fr");
                    }}
                  >
                    Fr
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
};

export default Icons;
