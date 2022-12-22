import SEO from "@/components/common/SEO";
import Menu from "@/components/menu/Menu";
import Post from "@/components/posts/Post";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";

const Home: NextPage<{ session: Session; post: Post; comments: PostComment[] }> = ({ session, post, comments }) => {
  const setSession = useStore((state) => state.setSession);
  const { setCurrentPost, setComments, setCurrentComment } = useStore((state) => state);

  React.useEffect(() => {
    setCurrentPost(post);
    setSession(session);
    setComments(comments.filter((el) => !el.depth));
    setCurrentComment(null);

    return () => {
      setComments([]);
    };
  }, []);

  return (
    <>
      <SEO
        title={post?.title}
        description={post?.content?.substring(0, 180)}
        authors={post?.author}
        image={post?.article?.image}
        modifiedTime={post?.updatedAt?.toString()}
        publishedTime={post?.createdAt?.toString()}
        tags={post?.tags?.map((el) => el.tag.name)}
        url={`${process.env.NEXT_PUBLIC_URL}/posts/${post?.slug}`}
      />
      <Menu />
      <MainContainer>
        <Post data={post} comments={comments} />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req, params } = context;

  const [postData, commentsData] = await Promise.all([
    getRequest({ endpoint: `/posts/${params?.slug}` }),
    getRequest({ endpoint: `/comments/${params?.slug}/post-comments` }),
  ]);

  if (postData.data?.type !== "ARTICLE") {
    return { notFound: true };
  }

  return {
    props: {
      session: req?.session?.user || null,
      post: postData.data,
      comments: commentsData.data,
    },
  };
});

export default Home;
