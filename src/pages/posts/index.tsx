import { Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
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
import MainContainer from "@/layouts/MainContainer";
import PostList from "@/components/posts/PostsList";
import AddPost from "@/components/middle/AddPost";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Posts | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />
      {/* Content */}
      <MainContainer>
        <AddPost />
        <Divider />
        <PostList />
      </MainContainer>
    </>
  );
};

export default Home;
