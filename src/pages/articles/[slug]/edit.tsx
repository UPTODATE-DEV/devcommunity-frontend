import SEO from "@/components/common/SEO";
import Menu from "@/components/menu/Menu";
import Post from "@/components/posts/Post";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { PostsFormSkeleton } from "@/components/posts/Skeleton";
import dynamic from "next/dynamic";

const AddPostForm = dynamic(() => import("@/components/posts/AddPostForm"), {
  ssr: false,
  loading: () => <PostsFormSkeleton />,
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
        <AddPostForm data={post} />
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
