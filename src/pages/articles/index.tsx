import Menu from "@/components/menu/Menu";
import { CallToActionSkeleton } from "@/components/middle/Skeleton";
import { PostsListSkeleton } from "@/components/posts/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { withSessionSsr } from "@/lib/withSession";
import PostAddIcon from "@mui/icons-material/PostAdd";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const AddPost = dynamic(import("@/components/common/AddPost"), { ssr: false, loading: () => null });

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});

const PostList = dynamic(import("@/components/posts/PostsList"), { ssr: false, loading: () => <PostsListSkeleton /> });

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const { push, locale } = useRouter();

  const handleGoToAddPage = () => {
    push("/articles/add");
  };

  React.useEffect(() => {
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
            icon={<PostAddIcon />}
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
  const { req, res } = context;
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  return {
    props: {
      session: req?.session?.user || null,
    },
  };
});

export default Home;
