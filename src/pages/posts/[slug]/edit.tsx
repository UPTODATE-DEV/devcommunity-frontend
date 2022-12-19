import Menu from "@/components/menu/Menu";
import { QuestionFormSkeleton } from "@/components/questions/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";

const AddQuestionForm = dynamic(() => import("@/components/questions/AddQuestionForm"), {
  ssr: false,
  loading: () => <QuestionFormSkeleton />,
});

const Home: NextPage<{ session: Session; post: Post }> = ({ session, post }) => {
  const setSession = useStore((state) => state.setSession);
  const setPost = useStore((state) => state.setPost);

  React.useEffect(() => {
    setSession(session);
    setPost(post);
  }, []);

  return (
    <>
      <Head>
        <title>Edit post | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <MainContainer>
        <AddQuestionForm data={post} />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req, params } = context;

  const post = await getRequest({ endpoint: `/posts/${params?.slug}` });

  if (!post) {
    return {
      notFound: true,
    };
  }

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
      post: post.data,
    },
  };
});

export default Home;
