import Menu from "@/components/menu/Menu";
import AddPost from "@/components/posts/AddPost";
import PostList from "@/components/posts/PostsList";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { withSessionSsr } from "@/lib/withSession";
import Divider from "@mui/material/Divider";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";
import { getRequest } from "@/lib/api";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import { CallToActionSkeleton, HomeFeedSkeleton } from "@/components/middle/Skeleton";

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});
const HomeFeed = dynamic(import("@/components/middle/HomeFeed"), {
  ssr: false,
  loading: () => <HomeFeedSkeleton />,
});

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const setPosts = useStore((state) => state.setPosts);
  const posts = useStore((state) => state.posts);

  React.useEffect(() => {
    const getPosts = async () => {
      const posts = await getRequest({ endpoint: "/posts" });
      if (!posts.error) {
        setPosts(posts.data);
      }
    };

    getPosts();

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
        {!session?.user && <CallToAction />}
        <Divider />
        <HomeFeed />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req } = context;

  return {
    props: {
      session: req?.session?.user || null,
    },
  };
});

export default Home;
