import Menu from "@/components/menu/Menu";
import useStore from "@/hooks/useStore";
import { withSessionSsr } from "@/lib/withSession";
import Box from "@mui/material/Box";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const Banner = dynamic(import("@/components/landingPage/Banner"));
const Value = dynamic(import("@/components/landingPage/Value"));
const Contributors = dynamic(import("@/components/landingPage/Contributors"));
const Widget = dynamic(import("@/components/landingPage/Widget"));
const Widget2 = dynamic(import("@/components/landingPage/Widget2"));
const Widget3 = dynamic(import("@/components/landingPage/Widget3"));
const FAQ = dynamic(import("@/components/landingPage/FAQ"));
const Footer = dynamic(import("@/components/landingPage/Footer"), { ssr: false, loading: () => null });

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const setPosts = useStore((state) => state.setPosts);

  React.useEffect(() => {
    setSession(session);
  }, []);
  return (
    <>
      <Head>
        <title>Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ bgcolor: "background.paper" }}>
        <Menu />
        <Banner />
        <Value />
        <Widget />
        <Widget2 />
        <Widget3 />
        <Contributors />
        <FAQ />
        <Footer />
      </Box>
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
