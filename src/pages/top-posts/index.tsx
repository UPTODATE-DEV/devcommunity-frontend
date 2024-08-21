import Menu from "@/components/menu/Menu";
import CallToAction from "@/components/middle/CallToAction";
import { TopSkeleton } from "@/components/topPosts/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const TopPosts = dynamic(import("@/components/topPosts/TopPosts"), {
  ssr: false,
  loading: () => <TopSkeleton />,
});

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);

  React.useEffect(() => {
    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>Top Posts | Dev Community</title>
        <meta name='description' content='Dev Community' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Menu />
      <MainContainer>
        {!session?.user && <CallToAction />}
        <TopPosts />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const { req } = context;

    return {
      props: {
        session: req?.session?.user || null,
      },
    };
  }
);

export default Home;
