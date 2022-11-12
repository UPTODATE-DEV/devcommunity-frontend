import Menu from "@/components/menu/Menu";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import Typography from "@mui/material/Typography";
import type { NextPage } from "next";
import Head from "next/head";
import * as React from "react";

const Home: NextPage<{ session: Session }> = ({ session }) => {
  return (
    <>
      <Head>
        <title>404 | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <MainContainer>
        <Typography sx={{ mt: 10 }} color="text.primary" variant="h6" textAlign="center">
          404
        </Typography>
        <Typography color="text.secondary" textAlign="center">
          Page Not Found
        </Typography>
      </MainContainer>
    </>
  );
};

export default Home;
