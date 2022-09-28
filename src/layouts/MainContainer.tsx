import React, { PropsWithChildren } from "react";
import Menu from "@/components/menu/Menu";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LeftSideBar from "@/components/sideBars/LeftSideBar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CallToAction from "@/components/middle/CallToAction";
import RightSideBar from "@/components/sideBars/RightSideBar";

const MainContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ bgcolor: "background.paper", display: { xs: "none", md: "block" } }}>
      <Container sx={{ px: { xs: 2, md: 4 }, mx: "auto" }}>
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
              borderRight: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Paper elevation={0} sx={{ position: "relative", top: 70 }}>
              <LeftSideBar />
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Stack sx={{ mt: 10, px: 2 }} spacing={2}>
              {children}
            </Stack>
          </Grid>
          <Grid
            item
            md={4}
            className="hide-scrollbar"
            sx={{ position: "sticky", top: 0, height: "100vh", overflow: "auto" }}
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
