import Menu from "@/components/menu/Menu";
import { ProfileSkeleton } from "@/components/profile/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import * as React from "react";

const Profile = dynamic(() => import("@/components/profile/Profile"), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
});

const Home: NextPage<{ session: Session; user: User }> = ({ session, user }) => {
  const setSession = useStore((state) => state.setSession);
  const setPosts = useStore((state) => state.setPosts);

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
        <title>Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <MainContainer>
        <Profile currentUser={user} />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
  const { req, params } = context;

  const email = params?.username?.slice(1, params.username.length);
  const user = await getRequest({ endpoint: `/users/${email}@gmail.com` });

  if (!user.data) {
    return { notFound: true };
  }

  // redirect to home if no session
  if (!req.session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: req?.session?.user || null,
      user: user.data,
    },
  };
});

export default Home;
