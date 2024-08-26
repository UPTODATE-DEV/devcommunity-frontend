import Menu from "@/components/menu/Menu";
import useStore from "@/hooks/useStore";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import Sheet from "../components/common/Sheet";

const Footer = dynamic(import("@/components/landingPage/Footer"), { ssr: false, loading: () => null });

const Home: NextPage<{ session: Session; data: any; menu: any }> = ({ session, data, menu }) => {
  const setSession = useStore((state) => state.setSession);

  React.useEffect(() => {
    setSession(session);
  }, []);
  return (
    <>
      <Head>
        <title>Dev Community</title>
        <meta name="description" content="Dev Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <Sheet data={data?.howToBecomeModerator} />
      <Footer menu={menu?.footer} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req, locale } = context;

  const results = fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/page?populate=deep&locale=${locale}`).then((res) =>
    res.json()
  ) as any;

  const footerMenu = fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/home?populate=deep&locale=${locale}`).then((res) =>
    res.json()
  ) as any;

  return {
    props: {
      session: req?.session?.user || null,
      data: await results.then((res: any) => res?.data),
      menu: await footerMenu.then((res: any) => res?.data),
    },
  };
});

export default Home;
