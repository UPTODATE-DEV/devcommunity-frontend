import useStore from "@/hooks/useStore";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";
import { IconsSkeletons, ProfileSkeleton, LogoSkeleton } from "./Skeleton";
import dynamic from "next/dynamic";

const CallToAction = dynamic(() => import("./CallToAction"), {
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
  const { push } = useRouter();

  return (
    <AppBar position="fixed" elevation={0} variant="outlined" color="transparent" sx={{ backdropFilter: "blur(20px)" }}>
      <Container sx={{ mx: "auto" }}>
        <Toolbar>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: 1, py: 1 }}>
            <Logo />
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
            <Icons />
            {user ? <Profile /> : <CallToAction />}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Menu;
