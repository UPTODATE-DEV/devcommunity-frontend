import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import MainTabs from "../components/common/MainTabs";

const CallToActionSkeleton = dynamic(
  () => import("@/components/middle/Skeleton").then((mod) => mod.CallToActionSkeleton),
  { ssr: false }
);
const RightBarSkeleton = dynamic(() => import("@/components/sideBars/Skeleton").then((mod) => mod.RightBarSkeleton), {
  ssr: false,
});
const LeftBarSkeleton = dynamic(() => import("@/components/sideBars/Skeleton").then((mod) => mod.LeftBarSkeleton), {
  ssr: false,
});

const RightSideBar = dynamic(import("@/components/sideBars/RightSideBar"), {
  ssr: false,
  loading: () => <RightBarSkeleton />,
});
const LeftSideBar = dynamic(import("@/components/sideBars/LeftSideBar"), {
  ssr: false,
  loading: () => <LeftBarSkeleton />,
});

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});

const MainContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { locale } = useRouter();
  const { setOpenLoginModal, openLoginModal } = useStoreNoPersist();

  locale === "en" ? dayjs.locale("en") : dayjs.locale("fr");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpenLoginModal(false);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Dialog
        open={openLoginModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CallToAction />
      </Dialog>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {!isMobile && (
            <Grid
              item
              xs
              md={3}
              lg={2}
              className="hide-scrollbar"
              sx={{
                position: "sticky",
                top: 76,
                height: 1,
                overflow: "auto",
                display: { xs: "none", md: "flex" },
              }}
            >
              <LeftSideBar />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md={9}
            lg={7}
            sx={{ position: "relative", minHeight: "100vh", my: { xs: 2, md: 3.3, lg: 1.9 } }}
          >
            <Stack sx={{ position: "relative" }} spacing={2}>
              {!isMobile && <MainTabs />}
              {children}
            </Stack>
          </Grid>
          {!isMobile && (
            <Grid
              item
              xs
              lg={3}
              className="hide-scrollbar"
              sx={{
                position: "sticky",
                top: 76,
                height: "100vh",
                overflow: "auto",
                width: 1,
                display: { xs: "none", lg: "flex" },
              }}
            >
              <RightSideBar />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default MainContainer;
