import useStore from "@/hooks/useStore";
import type { SpotlightAction } from "@mantine/spotlight";
import { openSpotlight, SpotlightProvider } from "@mantine/spotlight";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { IconsSkeletons, LogoSkeleton, ProfileSkeleton } from "./Skeleton";

import { getRequest } from "@/lib/api";
import { Grid, IconButton } from "@mui/material";
import { IconSearch } from "@tabler/icons";
import Mobile from "./Mobile";

const Auth = dynamic(() => import("./Auth"), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
});

const Profile = dynamic(() => import("./Profile"), {
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
  const user = useStore((state) => state.session?.user);
  const { push, locale } = useRouter();
  const { openMobileMenu, setOpenMobileMenu } = useStore((state) => state);
  const setPosts = useStore((state) => state.setPosts);
  const posts = useStore((state) => state.posts);

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
      position="fixed"
      elevation={0}
      variant="outlined"
      color="transparent"
      sx={{ backdropFilter: "blur(20px)", borderTop: "none", borderLeft: "none", borderRight: "none" }}
    >
      <Container sx={{ mx: "auto" }}>
        <Mobile />
        <Toolbar>
          <Grid
            container
            spacing={{ xs: 0, md: 2 }}
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: 1, py: 1 }}
          >
            <Grid item xs={2}>
              <Logo />
              <IconButton sx={{ display: { md: "none" } }} onClick={toggleDrawer()}>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={5} md={6}>
              <SpotlightProvider
                actions={actions}
                searchIcon={<IconSearch size={18} />}
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
            </Grid>
            <Grid item xs={3} md={4}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Icons />
                <Stack sx={{ display: { xs: "none", md: "flex" } }}>{user ? <Profile /> : <Auth />}</Stack>
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Menu;
