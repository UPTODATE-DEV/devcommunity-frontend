import SEO from "@/components/common/SEO";
import Menu from "@/components/menu/Menu";
import Post from "@/components/posts/Post";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import hljs from "highlight.js";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";

const Home: NextPage<{ session: Session; post: Post }> = ({ session, post }) => {
  const setSession = useStore((state) => state.setSession);

  React.useEffect(() => {
    document.querySelectorAll("pre").forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  React.useEffect(() => {
    setSession(session);
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
        <Post data={post} />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req } = context;
  const post = await getRequest({ endpoint: `/posts/${context.params?.slug}` });

  if (post.data?.type !== "ARTICLE") {
    return { notFound: true };
  }

  return {
    props: {
      session: req?.session?.user || null,
      post: post.data,
    },
  };
});

export default Home;
