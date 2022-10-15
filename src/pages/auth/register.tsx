import React from "react";
import Login from "@/components/auth/Login";
import Head from "next/head";
import { withSessionSsr } from "@/lib/withSession";
import { GetServerSideProps } from "next";
import Register from "@/components/auth/Register";

const Home = () => {
  return (
    <>
      <Head>
        <title>Register | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Register />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req } = context;

  if (req.session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});

export default Home;
