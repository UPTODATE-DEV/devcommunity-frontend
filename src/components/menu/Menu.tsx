import useStore from "@/hooks/useStore";
import useUser from "@/hooks/useUser";
import { getRequest } from "@/lib/api";
import { getUserFullName, getUserProfileImageUrl } from "@/lib/posts";
import type { SpotlightAction } from "@mantine/spotlight";
import { openSpotlight, SpotlightProvider } from "@mantine/spotlight";
import MenuIcon from "@mui/icons-material/Menu";
import IconSearch from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Mobile from "./Mobile";
import { IconsSkeletons, LogoSkeleton, ProfileSkeleton } from "./Skeleton";

const Auth = dynamic(() => import("./Auth"), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
});

const UserAvatar = dynamic(() => import("@/components/common/UserAvatar"), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
});

const Icons = dynamic(() => import("./Icons"), {
  ssr: false,
  loading: () => <IconsSkeletons />,
});

const Logo = dynamic(() => import("./Logo"), {
  ssr: false,
  loading: () => <LogoSkeleton />,
});

const Menu: React.FC = () => {
  const session = useStore((state) => state.session?.user);
  const user = useUser(session?.id);
  const { push, locale } = useRouter();
  const { openMobileMenu, setOpenMobileMenu } = useStore((state) => state);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const actions: SpotlightAction[] =
    posts?.map((_, index) => ({
      title: _.title,
      onTrigger: () => push(`/${_.type === "ARTICLE" ? "articles" : "posts"}/${_.slug}`),
    })) || [];

  const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpenMobileMenu(true);
  };

  const handleClickGoToProfile = () => {
    push("/profile");
  };

  React.useEffect(() => {
    const getPosts = async () => {
      const posts = await getRequest({ endpoint: "/posts" });
      if (!posts.error) {
        setPosts(posts.data);
      }
    };

    getPosts();
  }, []);

  return (
    <AppBar
      position="sticky"
      variant="outlined"
      elevation={0}
      color="inherit"
      sx={{ borderTop: "none", borderLeft: "none", borderRight: "none" }}
    >
      <Mobile />
      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Grid container alignItems="center" spacing={{ xs: 0, md: 2 }}>
          <Grid item xs={2} md={3} lg={2} justifyContent="center" alignItems="center" sx={{ height: 65 }}>
            {isMobile ? (
              <IconButton sx={{ width: 1, height: 1 }} onClick={toggleDrawer()}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Logo />
            )}
          </Grid>
          <Grid item xs={7} md={9} lg={7} justifyContent="center" alignItems="center" sx={{ height: 1 }}>
            <Stack sx={{ height: 1 }} justifyContent="center">
              <SpotlightProvider
                actions={actions}
                searchIcon={<IconSearch fontSize="large" />}
                searchPlaceholder="Search..."
                shortcut={["mod + P", "mod + K", "/"]}
                limit={7}
                nothingFoundMessage="Nothing found..."
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  onClick={() => openSpotlight()}
                  sx={{
                    borderRadius: 10,
                    bgcolor: "action.hover",
                    minWidth: 1,
                    height: 40,
                    px: 4,
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {locale === "en" ? "Search..." : "Rechercher..."}
                  </Typography>
                  <Typography sx={{ display: { xs: "none", md: "inline" } }} variant="caption" color="text.secondary">
                    Cmd + K
                  </Typography>
                </Stack>
              </SpotlightProvider>
            </Stack>
          </Grid>
          <Grid item xs={3} md={0} lg={3} alignItems="center" sx={{ height: 1, display: { md: "none", lg: "flex" } }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent={{ xs: "flex-end", md: "flex-start" }}
              sx={{ height: 60, width: 1 }}
            >
              {!isMobile && (
                <Stack sx={{ display: { xs: "none", lg: "flex" } }}>
                  {session?.id ? (
                    <UserAvatar
                      name={getUserFullName(user)}
                      pictureUrl={getUserProfileImageUrl(user)}
                      handleClick={handleClickGoToProfile}
                    />
                  ) : (
                    <Auth />
                  )}
                </Stack>
              )}
              <Icons />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Menu;
