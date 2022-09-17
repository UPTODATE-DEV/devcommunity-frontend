import { Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Menu from "@/components/Menu";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LeftSideBar from "layouts/LeftSideBar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CallToAction from "@/components/CallToAction";
import RightSideBar from "layouts/RightSideBar";
import MainContainer from "layouts/MainContent";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />
      {/* Content */}
      <Box sx={{ bgcolor: "background.paper" }}>
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
                <CallToAction />
                <MainContainer />
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
    </>
  );
};

export default Home;
