import Menu from "@/components/menu/Menu";
import CallToAction from "@/components/middle/CallToAction";
import { HomeFeedSkeleton } from "@/components/middle/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const FilterByTagsResult = dynamic(
  import("@/components/tags/FilterByTagsResult"),
  {
    ssr: false,
    loading: () => <HomeFeedSkeleton />,
  }
);

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const { setMultiTagsFilters } = useStore((state) => state);

  React.useEffect(() => {
    setSession(session);
    setMultiTagsFilters([
      {
        _count: { posts: 0 },
        id: "ckuq7q7xw0000jx9x9q7q7xwz",
        name: "polkadot",
      },
    ]);
    return () => setMultiTagsFilters([]);
  }, []);

  return (
    <>
      <Head>
        <title>Blockchain | Dev Community</title>
        <meta name="description" content="Dev Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />
      <MainContainer>
        {!session?.user && <CallToAction />}
        <FilterByTagsResult />
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
