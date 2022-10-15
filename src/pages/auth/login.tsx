import React from "react";
import Login from "@/components/auth/Login";
import Head from "next/head";
import { withSessionSsr } from '@/lib/withSession';
import { GetServerSideProps } from 'next';

const Home = () => {
  return (
    <>
      <Head>
        <title>Login | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  );
};


export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req } = context;

  if (req.session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});


export default Home;
