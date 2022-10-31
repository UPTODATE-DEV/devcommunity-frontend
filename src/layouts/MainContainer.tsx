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

const RightSideBar = dynamic(import("@/components/sideBars/RightSideBar"), {
  ssr: false,
  loading: () => <RightBarSkeleton />,
});
const LeftSideBar = dynamic(import("@/components/sideBars/LeftSideBar"), {
  ssr: false,
  loading: () => <LeftBarSkeleton />,
});

const MainContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Container sx={{ mx: "auto" }}>
        <Grid container>
          <Grid
            item
            md={2}
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
            <Paper elevation={0} sx={{ position: "relative", top: 70 }}>
              <LeftSideBar />
            </Paper>
          </Grid>
          <Grid item md={6} sx={{ width: 1 }}>
            <Stack sx={{ mt: 10, px: { xs: 0, md: 2 } }} spacing={2}>
              {children}
            </Stack>
          </Grid>
          <Grid
            item
            md={4}
            className="hide-scrollbar"
            sx={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "auto",
              width: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Paper variant="outlined" sx={{ position: "relative", top: 80 }}>
              <RightSideBar />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MainContainer;
