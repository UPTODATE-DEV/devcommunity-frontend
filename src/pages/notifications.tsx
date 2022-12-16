import Menu from "@/components/menu/Menu";
import CallToAction from "@/components/middle/CallToAction";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const Notifications = dynamic(import("@/components/notifications/Notifications"), { ssr: false, loading: () => null });

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const setNotifications = useStore((state) => state.setNotifications);

  React.useEffect(() => {
    const getNotifications = async () => {
      const notifications = await getRequest({ endpoint: `/notifications/${session.user?.id}` });
      if (!notifications.error) {
        setNotifications(notifications.data);
      }
    };

    getNotifications();

    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>Notifications | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />
      <MainContainer>
        {!session?.user && <CallToAction />}
        <Notifications />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req } = context;

  if (!req.session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: req?.session?.user || null,
    },
  };
});

export default Home;
