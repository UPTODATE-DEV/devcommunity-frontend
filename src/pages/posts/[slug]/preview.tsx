import SEO from "@/components/common/SEO";
import Menu from "@/components/menu/Menu";
import QuestionDraft from "@/components/questions/QuestionDraft";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";

const Home: NextPage<{ session: Session; post: Post }> = ({ session, post }) => {
  const setSession = useStore((state) => state.setSession);
  const { setCurrentPost, setComments } = useStore((state) => state);

  React.useEffect(() => {
    setCurrentPost(post);

    return () => {
      setComments([]);
    };
  }, [post.id]);

  React.useEffect(() => {
    setSession(session);
  }, []);

  return (
    <>
      <SEO
        title={post?.title}
        description={post?.content?.substring(0, 180)}
        authors={post?.author}
        modifiedTime={post?.updatedAt?.toString()}
        publishedTime={post?.createdAt?.toString()}
        tags={post?.tags?.map((el) => el.tag.name)}
        url={`${process.env.NEXT_PUBLIC_URL}/posts/${post?.slug}`}
      />
      <Menu />
      <MainContainer>
        <QuestionDraft data={post} />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req, params } = context;

  const [postData] = await Promise.all([getRequest({ endpoint: `/posts/${params?.slug}` })]);

  if ((postData.data?.type !== "QUESTION" && postData.data?.type !== "EVENT") || !postData.data.draft) {
    return { notFound: true };
  }

  return {
    props: {
      session: req?.session?.user || null,
      post: postData.data,
    },
  };
});

export default Home;
