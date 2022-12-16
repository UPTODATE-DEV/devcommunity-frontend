import Menu from "@/components/menu/Menu";
import { CallToActionSkeleton, HomeFeedSkeleton } from "@/components/middle/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
// import { useRouter } from "next/router";
import * as React from "react";

// const AddPost = dynamic(import("@/components/common/AddPost"), { ssr: false, loading: () => null });

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});
const HomeFeed = dynamic(import("@/components/middle/HomeFeed"), {
  ssr: false,
  loading: () => <HomeFeedSkeleton />,
});

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  // const { locale } = useRouter();

  // const handleGoToAddPage = () => {};

  React.useEffect(() => {
    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>Updev community</title>
        <meta name="description" content="Updev community" />
      </Head>
      <Menu />
      <MainContainer>
        {!session?.user && <CallToAction />}
        {/* {session?.user ? (
          <AddPost
            label={
              locale === "en"
                ? "Share your questions, quick tips and ideas here"
                : "Partagez vos questions, astuces et idées ici"
            }
            handleClick={handleGoToAddPage}
          />
        ) : (
          <CallToAction />
        )} */}
        <HomeFeed />
      </MainContainer>
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
