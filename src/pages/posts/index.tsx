import Menu from "@/components/menu/Menu";
import { CallToActionSkeleton } from "@/components/middle/Skeleton";
import { QuestionsListSkeleton } from "@/components/questions/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { withSessionSsr } from "@/lib/withSession";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import PostAddIcon from "@mui/icons-material/PostAdd";

const AddPost = dynamic(import("@/components/common/AddPost"), { ssr: false, loading: () => null });

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});
const QuestionsList = dynamic(import("@/components/questions/QuestionsList"), {
  ssr: false,
  loading: () => <QuestionsListSkeleton />,
});

const Home: NextPage<{ session: Session; locale: string }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const { push, locale } = useRouter();

  const handleGoToAddPage = () => {
    push("/posts/add");
  };

  React.useEffect(() => {
    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>Posts | Updev community</title>
      </Head>

      <Menu />
      <MainContainer>
        {session?.user ? (
          <AddPost
            label={
              locale === "en"
                ? "Share your questions, quick tips and ideas here"
                : "Partagez vos questions, astuces et idées ici"
            }
            handleClick={handleGoToAddPage}
            icon={<PostAddIcon />}
          />
        ) : (
          <CallToAction />
        )}
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
