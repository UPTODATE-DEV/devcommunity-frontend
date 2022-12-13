import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib/api";
import { Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
  const { push, locale } = useRouter();

  const handleView = (path: string, type: "posts" | "articles") => {
    push(`/${type}/${path}`);
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
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ position: "relative", width: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
          {locale === "en" ? "Top articles of the Week" : "Meilleurs articles de la semaine"}
        </Typography>
        <Divider />
        <List sx={{ width: { xs: "100%" }, bgcolor: "background.paper" }}>
          {posts?.topArticlesOfTheWeek?.length === 0 && <Empty />}
          {posts?.topArticlesOfTheWeek.map((item, i) => (
            <ListItems
              key={item.id}
              item={item}
              handleViewPost={(path) => handleView(path, "articles")}
              divider={i !== posts?.topArticlesOfTheWeek.length - 1}
            />
          ))}
        </List>
        <Divider />
        <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
          {locale === "en" ? "Top Posts of the Week" : "Meilleurs posts de la semaine"}
        </Typography>
        <Divider />
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {posts?.topQuestionsOfTheWeek?.length === 0 && <Empty />}
          {posts?.topQuestionsOfTheWeek.map((item, i) => (
            <ListItems
              key={item.id}
              item={item}
              handleViewPost={(path) => handleView(path, "posts")}
              divider={i !== posts?.topQuestionsOfTheWeek.length - 1}
            />
          ))}
        </List>
      </Paper>
    </Stack>
  );
};

export default React.memo(RightSideBar);
