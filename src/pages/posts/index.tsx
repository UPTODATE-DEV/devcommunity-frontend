import Menu from "@/components/menu/Menu";
import AddPost from "@/components/posts/AddPost";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { withSessionSsr } from "@/lib/withSession";
import Divider from "@mui/material/Divider";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { getRequest } from "@/lib/api";
import dynamic from "next/dynamic";
import { PostsListSkeleton } from "@/components/posts/Skeleton";
import { CallToActionSkeleton } from "@/components/middle/Skeleton";

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});
const PostList = dynamic(import("@/components/posts/PostsList"), { ssr: false, loading: () => <PostsListSkeleton /> });

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const setPosts = useStore((state) => state.setPosts);

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
        <title>Posts | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />
      <MainContainer>
        {session?.user ? <AddPost /> : <CallToAction />}
        <Divider />
        <PostList />
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
