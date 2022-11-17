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

  React.useEffect(() => {
    const getNotifications = async () => {
      const notifications = await getRequest({ endpoint: `/notifications/${user?.id}/count` });
      if (!notifications.error) {
        setNotifications(notifications.data);
      }
    };

    getNotifications();
  }, []);

  return (
    <Stack direction="row" alignItems="center" spacing={{ xs: 0, md: 1 }}>
      <IconButton onClick={toggleMode}>
        {darkModeActive ? <DarkModeIcon /> : <LightModeIcon color="warning" />}
      </IconButton>
      {/* <IconButton sx={{ display: { xs: "none", md: "flex" } }} onClick={toggleFullscreen}>
        {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton> */}
      <IconButton onClick={toggleLang}>
        {locale === "en" ? (
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
        )}
      </IconButton>
      {user && (
        <IconButton aria-label="cart" onClick={() => push("/notifications")}>
          <StyledBadge badgeContent={notifications} max={99} color="secondary">
            <NotificationsIcon />
          </StyledBadge>
        </IconButton>
      )}
    </Stack>
  );
};

export default Icons;
