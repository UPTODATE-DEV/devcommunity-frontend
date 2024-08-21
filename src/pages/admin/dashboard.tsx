import useStore from "@/hooks/useStore";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";

const Menu = dynamic(import("@/components/menu/Menu"), { ssr: false });

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
      <h2>Dashboard</h2>
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
