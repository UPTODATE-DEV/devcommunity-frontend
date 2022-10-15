import React from "react";
import Head from "next/head";
import Confirmation from "@/components/auth/Confirmation";
import { withSessionSsr } from "@/lib/withSession";
import { GetServerSideProps } from "next";

const Home = () => {
  return (
    <>
      <Head>
        <title>Confirmation | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Confirmation />
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
