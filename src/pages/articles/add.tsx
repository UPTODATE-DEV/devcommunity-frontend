import Menu from "@/components/menu/Menu";
import { PostsFormSkeleton } from "@/components/posts/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";

const AddPostForm = dynamic(() => import("@/components/posts/AddPostForm"), {
  ssr: false,
  loading: () => <PostsFormSkeleton />,
});

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);

  React.useEffect(() => {
    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>Add an article | Dev Community</title>
        <meta name="description" content="Dev Community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <MainContainer>
        <AddPostForm />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req } = context;

  if (!req.session?.user?.isLoggedIn) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: req.session?.user,
    },
  };
});

export default Home;
