import Menu from "@/components/menu/Menu";
import { CallToActionSkeleton } from "@/components/middle/Skeleton";
import { PostsListSkeleton } from "@/components/posts/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import hljs from "highlight.js";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

const AddPost = dynamic(import("@/components/common/AddPost"), { ssr: false, loading: () => null });

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});

const PostList = dynamic(import("@/components/posts/PostsList"), { ssr: false, loading: () => <PostsListSkeleton /> });

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const setPosts = useStore((state) => state.setPosts);
  const { push, locale } = useRouter();

  React.useEffect(() => {
    document.querySelectorAll("pre").forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  const handleGoToAddPage = () => {
    push("/articles/add");
  };

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
        <title>Articles | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />
      <MainContainer>
        {session?.user ? (
          <AddPost
            label={locale === "en" ? "Start an article..." : "Commencer un article..."}
            handleClick={handleGoToAddPage}
          />
        ) : (
          <CallToAction />
        )}
        <PostList />
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
