import Menu from "@/components/menu/Menu";
import Post from "@/components/posts/Post";
import MainContainer from "@/layouts/MainContainer";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <MainContainer>
        <Post />
      </MainContainer>
    </>
  );
};

export default Home;
