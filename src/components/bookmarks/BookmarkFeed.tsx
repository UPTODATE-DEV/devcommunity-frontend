import { HomeFeedSkeleton } from "@/components/middle/Skeleton";
import { PostsListSkeleton } from "@/components/posts/Skeleton";
import { API } from "@/config/url";
import useStore from "@/hooks/useStore";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import qs from "qs";
import React, { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import useUser from "@/hooks/useUser";

const BookmarkCard = dynamic(import("@/components/bookmarks/BookmarkCard"), {
  ssr: false,
  loading: () => <PostsListSkeleton />,
});

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => <HomeFeedSkeleton />,
});

const BookmarkFeed = () => {
  const [open, setOpen] = React.useState(false);
  const session = useStore((state) => state.session?.user);
  const user = useUser(session?.username);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [endOfPage, setEndOfPage] = React.useState(false);
  const [perPage, setPerPage] = React.useState(10);
  const [type, setType] = React.useState<"QUESTION" | "ARTICLE" | undefined>();

  const params = qs.stringify({
    perPage,
    type,
  });

  const { locale } = useRouter();

  const fetcher = async (url: string): Promise<any> => {
    const { data } = await axios.get(url, {
      baseURL: API,
    });
    return data;
  };

  const getKey = (pageIndex: number, previousPageData: Post[]) => {
    if (previousPageData && !previousPageData.length) {
      setEndOfPage(true);
      return null;
    }
    return `/posts/bookmarks/${user?.id}?page=${pageIndex + 1}&${params}`;
  };

  const { data, size, setSize, isLoading, error, isValidating } = useSWRInfinite<Bookmarks[], any>(getKey, fetcher);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        if (!endOfPage) {
          setCurrentPage(currentPage + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  useEffect(() => {
    setSize(size + 1);
  }, [currentPage]);

  return (
    <>
      <Paper variant="outlined" sx={{ p: 2 }} component={Stack} spacing={2}>
        <Typography variant="h6" color="text.primary">
          {locale === "en" ? "My bookmarks" : "Mes favoris"}
        </Typography>
      </Paper>

      {data?.length === 0 && (
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }} component={Stack} spacing={2}>
          <Empty />
        </Paper>
      )}

      {data?.map((posts) => {
        return posts.map((item) => (
          <React.Fragment key={item.id}>
            <BookmarkCard data={item.post} />
          </React.Fragment>
        ));
      })}

      {isValidating && (
        <Stack sx={{ display: "flex", width: 1, my: 6 }} alignItems="center">
          <CircularProgress />
        </Stack>
      )}
    </>
  );
};

export default BookmarkFeed;
