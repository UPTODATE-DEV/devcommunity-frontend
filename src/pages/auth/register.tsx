import React from "react";
import Login from "@/components/auth/Login";
import Head from "next/head";
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

export default Home;
