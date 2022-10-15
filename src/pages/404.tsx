import Menu from "@/components/menu/Menu";
import AddPost from "@/components/posts/AddPost";
import CallToAction from "@/components/middle/CallToAction";
import PostList from "@/components/posts/PostsList";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { withSessionSsr } from "@/lib/withSession";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);

  React.useEffect(() => {
    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>Updev community</title>
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
