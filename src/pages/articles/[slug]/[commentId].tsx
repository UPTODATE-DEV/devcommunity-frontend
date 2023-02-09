import SEO from "@/components/common/SEO";
import Menu from "@/components/menu/Menu";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import type { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";

const Comment = dynamic(import("@/components/comments/Comment"), { ssr: false, loading: () => null });

const Home: NextPage<{ session: Session; comment: PostComment; post: Post }> = ({ session, comment, post }) => {
  const setSession = useStore((state) => state.setSession);
  const { setCurrentPost, setComments, setCurrentComment } = useStore((state) => state);

  React.useEffect(() => {
    setCurrentPost(post);
    setSession(session);
    setComments(comment.childrenComments);
    setCurrentComment(comment);

    return () => {
      setCurrentComment(null);
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
        <Comment comment={comment} />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req, params } = context;
  const post = await getRequest({ endpoint: `/posts/${params?.slug}` });
  const comment = await getRequest({ endpoint: `/comments/${params?.commentId}` });

  if (post.data?.type !== "ARTICLE") {
    return { notFound: true };
  }

  if (!comment?.data?.id) {
    return { notFound: true };
  }

  return {
    props: {
      session: req?.session?.user || null,
      comment: comment.data,
      post: post.data,
    },
  };
});

export default Home;
