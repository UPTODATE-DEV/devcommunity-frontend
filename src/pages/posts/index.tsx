import Menu from "@/components/menu/Menu";
import { CallToActionSkeleton } from "@/components/middle/Skeleton";
import { QuestionsListSkeleton } from "@/components/questions/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import Divider from "@mui/material/Divider";
import hljs from "highlight.js";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const AddQuestion = dynamic(import("@/components/questions/AddQuestion"), { ssr: false, loading: () => null });

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});
const QuestionsList = dynamic(import("@/components/questions/QuestionsList"), {
  ssr: false,
  loading: () => <QuestionsListSkeleton />,
});

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const setPosts = useStore((state) => state.setPosts);

  React.useEffect(() => {
    document.querySelectorAll("pre").forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  React.useEffect(() => {
    const getPosts = async () => {
      const posts = await getRequest({ endpoint: "/posts" });
      if (!posts.error) {
        setPosts(posts.data);
      }
    };

    getPosts();

    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>Posts | Updev community</title>
      </Head>

      <Menu />
      <MainContainer>
        {session?.user ? <AddQuestion /> : <CallToAction />}
        <QuestionsList />
      </MainContainer>
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
