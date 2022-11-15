import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib/api";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FILES_BASE_URL } from "config/url";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => null,
});

const ListItems = dynamic(import("@/components/sideBars/ListItems"), {
  ssr: false,
  loading: () => null,
});

const RightSideBar = () => {
  const { push } = useRouter();

  const handleViewPost = (path: string) => {
    push(path);
  };

  const setTopPosts = useStore((state) => state.setTopPostsOfTheWeek);
  const posts = useStore((state) => state.topPostsOfTheWeek);

  React.useEffect(() => {
    const getPosts = async () => {
      const posts = await getRequest({ endpoint: "/posts/top/posts-week" });
      if (!posts.error) {
        setTopPosts(posts.data);
      }
    };

    getPosts();
  }, []);

  return (
    <Stack>
      <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
        Top articles of the Week
      </Typography>
      <Divider />
      <List sx={{ width: { xs: "100%", md: 350 }, bgcolor: "background.paper" }}>
        {posts?.topArticlesOfTheWeek?.length === 0 && <Empty />}
        {posts?.topArticlesOfTheWeek.map((item, i) => (
          <ListItems key={item.id} item={item} handleViewPost={handleViewPost} i={i} />
        ))}
      </List>
      <Divider />
      <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
        Top posts of the Week
      </Typography>
      <Divider />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {posts?.topQuestionsOfTheWeek?.length === 0 && <Empty />}
        {posts?.topQuestionsOfTheWeek.map((item, i) => (
          <ListItems key={item.id} item={item} handleViewPost={handleViewPost} i={i} />
        ))}
      </List>
    </Stack>
  );
};

export default RightSideBar;
