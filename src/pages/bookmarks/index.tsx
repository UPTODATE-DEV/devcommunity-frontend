import Menu from "@/components/menu/Menu";
import { HomeFeedSkeleton } from "@/components/middle/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const BookmarkFeed = dynamic(import("@/components/bookmarks/BookmarkFeed"), {
  ssr: false,
  loading: () => <HomeFeedSkeleton />,
});

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);

  React.useEffect(() => {
    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>My bookmarks | Dev Community</title>
        <meta name="description" content="Dev Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />
      <MainContainer>
        <BookmarkFeed />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req } = context;

  if (!req.session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: req?.session?.user || null,
    },
  };
});

export default Home;
