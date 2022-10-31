import Menu from "@/components/menu/Menu";
import AddPost from "@/components/posts/AddPost";
import CallToAction from "@/components/middle/CallToAction";
import PostList from "@/components/posts/PostsList";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { withSessionSsr } from "@/lib/withSession";
import Divider from "@mui/material/Divider";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import * as React from "react";
import dynamic from "next/dynamic";
import { PostsFormSkeleton } from "@/components/posts/Skeleton";

const AddQuestionForm = dynamic(() => import("@/components/questions/AddQuestionForm"), {
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
        <title>Add a post | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <MainContainer>
        <AddQuestionForm />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req } = context;

  if (!req.session?.user?.isLoggedIn) {
    return {
      redirect: {
        destination: "/auth/login",
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
