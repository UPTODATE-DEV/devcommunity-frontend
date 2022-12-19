import Menu from "@/components/menu/Menu";
import CallToAction from "@/components/middle/CallToAction";
import { TopSkeleton } from "@/components/topPosts/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const TopPosts = dynamic(import("@/components/topPosts/TopPosts"), { ssr: false, loading: () => <TopSkeleton /> });

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const setTopPosts = useStore((state) => state.setTopPosts);

  React.useEffect(() => {
    const getTopPosts = async () => {
      const authors = await getRequest({ endpoint: "/posts/top/posts" });
      if (!authors.error) {
        setTopPosts(authors.data);
      }
    };

    getTopPosts();

    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>Top Posts | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />
      <MainContainer>
        {!session?.user && <CallToAction />}
        <TopPosts />
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
