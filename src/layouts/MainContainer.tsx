import { LeftBarSkeleton, RightBarSkeleton } from "@/components/sideBars/Skeleton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dynamic from "next/dynamic";
import React, { PropsWithChildren } from "react";

const RightSideBar = dynamic(import("@/components/sideBars/RightSideBar"), {
  ssr: false,
  loading: () => <RightBarSkeleton />,
});
const LeftSideBar = dynamic(import("@/components/sideBars/LeftSideBar"), {
  ssr: false,
  loading: () => <LeftBarSkeleton />,
});

const MainContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {!isMobile && (
            <Grid
              item
              md={3}
              lg={2}
              className="hide-scrollbar"
              sx={{
                position: "sticky",
                top: 76,
                height: 1,
                overflow: "auto",
                display: { sm: "none", md: "flex" },
              }}
            >
              <LeftSideBar />
            </Grid>
          )}
          <Grid item md={9} lg={7} sx={{ position: "relative", minHeight: "100vh", my: { xs: 2, md: 3.3, lg: 1.9 } }}>
            <Stack sx={{ position: "relative" }} spacing={2}>
              {children}
            </Stack>
          </Grid>
          {!isMobile && (
            <Grid
              item
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
