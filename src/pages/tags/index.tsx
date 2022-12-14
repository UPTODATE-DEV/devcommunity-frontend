import Menu from "@/components/menu/Menu";
import { CallToActionSkeleton, HomeFeedSkeleton } from "@/components/middle/Skeleton";
import { TagsSkeleton } from "@/components/tags/Skeleton";
import useStore from "@/hooks/useStore";
import MainContainer from "@/layouts/MainContainer";
import { getRequest } from "@/lib/api";
import { withSessionSsr } from "@/lib/withSession";
import { Paper, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const Tags = dynamic(import("@/components/tags/TagsList"), { ssr: false, loading: () => <TagsSkeleton /> });
const Filters = dynamic(import("@/components/tags/Filters"), { ssr: false, loading: () => null });
const Search = dynamic(import("@/components/tags/Search"), { ssr: false, loading: () => null });
const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});

const Home: NextPage<{ session: Session }> = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const setTags = useStore((state) => state.setTags);
  const { showTagsFilters } = useStore((state) => state);

  React.useEffect(() => {
    const getTags = async () => {
      const tags = await getRequest({ endpoint: "/tags" });
      if (!tags.error) {
        setTags(tags.data);
      }
    };

    getTags();

    setSession(session);
  }, []);

  return (
    <>
      <Head>
        <title>Tags | Updev community</title>
        <meta name="description" content="Updev community" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />
      <MainContainer>
        {!session?.user && <CallToAction />}
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={2}>
            {showTagsFilters ? <Filters /> : <Search />}
            <Divider />
            <Tags />
          </Stack>
        </Paper>
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
