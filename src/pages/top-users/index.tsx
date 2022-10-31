import Menu from "@/components/menu/Menu";
import CallToAction from "@/components/middle/CallToAction";
import Search from "@/components/tags/Search";
import { TagsSkeleton } from "@/components/tags/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import Divider from "@mui/material/Divider";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const TopUsers = dynamic(import("@/components/topUsers/TopUsers"), { ssr: false, loading: () => null });

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const setTopUsers = useStore((state) => state.setTopUsers);

  React.useEffect(() => {
    const getTopUsers = async () => {
      const authors = await getRequest({ endpoint: "/posts/top/authors" });
      if (!authors.error) {
        setTopUsers(authors.data);
      }
    };

    getTopUsers();

    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>Top Users | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />
      <MainContainer>
        {!session?.user && <CallToAction />}
        <TopUsers />
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
