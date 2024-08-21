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
const Partners = dynamic(import("@/components/landingPage/Partners"));
const Widget = dynamic(import("@/components/landingPage/Widget"));
const Widget2 = dynamic(import("@/components/landingPage/Widget2"));
const Widget3 = dynamic(import("@/components/landingPage/Widget3"));
const FAQ = dynamic(import("@/components/landingPage/FAQ"));
const Footer = dynamic(import("@/components/landingPage/Footer"), { ssr: false, loading: () => null });

const Home: NextPage<{ session: Session; data: any; menu: any }> = ({ session, menu }) => {
  const setSession = useStore((state) => state.setSession);

  React.useEffect(() => {
    setSession(session);
  }, []);
  return (
    <>
      <Head>
        <title>Dev community</title>
        <meta name="description" content="Dev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ bgcolor: "background.paper" }}>
        <Menu />
        <Banner />
        <Value />
        <Widget />
        <Widget2 />
        <Widget3 />
        {/* <Partners /> */}
        <FAQ />
        <Contributors />
        <Footer menu={menu?.footer} />
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req, locale } = context;
  const footerMenu = fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/home?populate=deep&locale=${locale}`).then((res) =>
    res.json()
  ) as any;

  return {
    props: {
      session: req?.session?.user || null,
      menu: await footerMenu.then((res: any) => res?.data),
    },
  };
});

export default Home;
