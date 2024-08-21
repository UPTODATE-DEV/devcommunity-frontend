import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";

const CallToActionSkeleton = dynamic(
  () => import("@/components/middle/Skeleton").then((mod) => mod.CallToActionSkeleton),
  { ssr: false }
);
const HomeFeedSkeleton = dynamic(() => import("@/components/middle/Skeleton").then((mod) => mod.HomeFeedSkeleton), {
  ssr: false,
});
const Menu = dynamic(import("@/components/menu/Menu"), { ssr: false });

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

  React.useEffect(() => {
    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>Dev Community</title>
        <meta name="description" content="Dev Community" />
      </Head>
      <Menu />
      <MainContainer>
        {!session?.user && <CallToAction />}
        <HomeFeed />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req, res } = context;
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  return {
    props: {
      session: req?.session?.user || null,
    },
  };
});

export default Home;
