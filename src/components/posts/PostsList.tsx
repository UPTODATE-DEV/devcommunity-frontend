import { API } from "@/config/url";
import useStore from "@/hooks/useStore";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import axios from "axios";
import dynamic from "next/dynamic";
import qs from "qs";
import React, { useEffect } from "react";
import useSWRInfinite from "swr/infinite";

const PostCard = dynamic(import("@/components/posts/PostCard"), { ssr: false, loading: () => null });
const PostsListSkeleton = dynamic(() => import("@/components/posts/Skeleton").then((mod) => mod.PostsListSkeleton), {
  ssr: false,
});
const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => <PostsListSkeleton />,
});
const ModalCreation = dynamic(import("@/components/common/ModalCreation"), {
  ssr: false,
  loading: () => null,
});

const PostsList = () => {
  const [open, setOpen] = React.useState(false);
  const session = useStore((state) => state.session?.user);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [endOfPage, setEndOfPage] = React.useState(false);
  const [perPage, setPerPage] = React.useState(5);
  const [type, setType] = React.useState<"QUESTION" | "ARTICLE" | undefined>("ARTICLE");

  const params = qs.stringify({
    perPage,
    type,
  });

  const fetcher = async (url: string, params: any): Promise<any> => {
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
    return `/users/${session?.id}/feed?page=${pageIndex + 1}&${params}`;
  };

  const { data, size, setSize, isLoading, error, isValidating } = useSWRInfinite<Post[], any>(getKey, fetcher);

  const handleClose = () => setOpen(false);

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
    <Stack spacing={2} sx={{ pb: 2 }}>
      <ModalCreation open={open} handleClose={handleClose} />
      {size === 0 && <Empty />}
      {isLoading && <PostsListSkeleton />}

      {data?.map((posts, index) => {
        return posts.map((item, i) => (
          <React.Fragment key={item.id}>
            <PostCard data={item} />
          </React.Fragment>
        ));
      })}

      {session && (
        <Fab
          color="primary"
          onClick={() => setOpen(true)}
          aria-label="add"
          sx={{ position: "sticky", bottom: 20, alignSelf: "end" }}
        >
          <AddIcon />
        </Fab>
      )}

      {isValidating && (
        <Stack sx={{ display: "flex", width: 1, my: 6 }} alignItems="center">
          <CircularProgress />
        </Stack>
      )}
    </Stack>
  );
};

export default PostsList;
