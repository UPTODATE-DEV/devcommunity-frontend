import { useI18n } from "@/hooks/useI18n";
import useSocket from "@/hooks/useSocket";
import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib/api";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ArrowDown from "@mui/icons-material/KeyboardArrowDown";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Typography } from "@mui/material";
import Badge, { BadgeProps } from "@mui/material/Badge";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useDarkMode } from "next-dark-mode";
import { useRouter } from "next/router";
import React from "react";
import useUser from "../../hooks/useUser";

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
  const session = useStore((state) => state.session?.user);
  const { notificationsCount, setNotificationsCount } = useStore((state) => state);
  const user = useUser(session?.id);
  const { push, locale } = useRouter();
  const socket = useSocket();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);

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
        setNotificationsCount(notifications.data);
      }
    };

    getNotifications();

    socket.on("notification", () => {
      getNotifications();
    });
  }, [user?.id]);

  return (
    <Stack direction="row" alignItems="center" spacing={{ xs: 0, md: 1 }}>
      {user?.id && (
        <IconButton aria-label="cart" onClick={() => push("/notifications")}>
          <StyledBadge badgeContent={notificationsCount} max={99} color="secondary">
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

      <Stack
        ref={anchorRef}
        onClick={handleToggle}
        color="inherit"
        direction="row"
        sx={{
          px: 2,
          py: 1,
          display: {
            xs: "none",
            md: "flex",
          },
          borderRadius: 50,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        {locale === "fr" ? (
          <Typography color="text.secondary" fontWeight={700}>
            FR
          </Typography>
        ) : (
          <Typography color="text.secondary" fontWeight={700}>
            EN
          </Typography>
        )}
        <ArrowDown color="primary" />
      </Stack>
      {/* @ts-ignore */}
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
                    <Typography>English</Typography>
                  </MenuItem>
                  <MenuItem
                    selected={locale === "fr"}
                    onClick={(e) => {
                      handleClose(e);
                      switchLanguages("fr");
                    }}
                  >
                    <Typography>Français</Typography>
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
