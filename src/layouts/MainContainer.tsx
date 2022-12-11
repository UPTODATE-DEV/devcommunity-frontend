import React, { PropsWithChildren } from "react";
import Menu from "@/components/menu/Menu";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CallToAction from "@/components/middle/CallToAction";
import dynamic from "next/dynamic";
import { LeftBarSkeleton, RightBarSkeleton } from "@/components/sideBars/Skeleton";
import { useMediaQuery, useTheme } from "@mui/material";

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
    <Box sx={{ bgcolor: "background.paper", minHeight: "100vh" }}>
      <Grid container>
        {!isMobile && (
          <Grid
            item
            md={3}
            lg={2}
            xl={1.5}
            className="hide-scrollbar"
            sx={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "auto",
              display: { xs: "none", md: "flex" },
              borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Paper elevation={0} sx={{ position: "relative", top: 70, width: 1 }}>
              <LeftSideBar />
            </Paper>
          </Grid>
        )}
        <Grid item md={9} lg={7} sx={{ width: 1 }}>
          <Stack sx={{ mt: 10, px: { xs: 0, md: 2 } }} spacing={2}>
            {children}
          </Stack>
        </Grid>
        {!isMobile && (
          <Grid
            item
            lg={3}
            xl={3.5}
            className="hide-scrollbar"
            sx={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "auto",
              width: 1,
              display: { xs: "none", lg: "flex" },
              borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <RightSideBar />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default MainContainer;
