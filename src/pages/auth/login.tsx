import React from "react";
import Login from "@/components/auth/Login";
import Head from "next/head";

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

export default Home;
