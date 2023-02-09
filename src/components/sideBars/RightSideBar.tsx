import Empty from "@/components/common/Empty";
import { getRequest } from "@/lib/api";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import qs from "qs";
import React from "react";
import ListItems from "./ListItems";
import { ListItemsSkeleton } from "./Skeleton";

const RightSideBar = () => {
  const { push, locale } = useRouter();
  const [topPosts, setTopPosts] = React.useState<Post[] | null>(null);
  const [topArticles, setTopArticles] = React.useState<Post[] | null>(null);

  const today = new Date();
  const sevenDaysAgoDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const query = (type: "ARTICLE" | "QUESTION") =>
    qs.stringify({ limit: 3, startDate: sevenDaysAgoDate.toISOString(), endDate: today.toISOString(), type });

  const handleView = (path: string, type: "posts" | "articles") => {
    push(`/${type}/${path}`);
  };

  React.useEffect(() => {
    const getPosts = async () => {
      const [postData, articlesData] = await Promise.all([
        getRequest({ endpoint: "/posts/get/top?" + query("QUESTION") }),
        getRequest({ endpoint: "/posts/get/top?" + query("ARTICLE") }),
      ]);

      if (!postData.error) {
        setTopPosts(postData.data);
      }

      if (!articlesData.error) {
        setTopArticles(articlesData.data);
      }
    };

    getPosts();
  }, []);

  return (
    <Stack spacing={2} sx={{ width: 1, pb: 5 }}>
      <Paper variant="outlined" sx={{ position: "relative", width: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
          {locale === "en" ? "Trending articles" : "Articles tendances"}
        </Typography>
        <Divider />
        <List sx={{ width: { xs: "100%" }, bgcolor: "background.paper" }}>
          {!topArticles && <ListItemsSkeleton />}
          {topArticles && topArticles.length === 0 && <Empty />}

          {topArticles &&
            topArticles.map((item, i) => (
              <ListItems
                key={item.id}
                item={item}
                handleViewPost={(path) => handleView(path, "articles")}
                divider={i !== topArticles.length - 1}
              />
            ))}
        </List>
        <Divider />
        <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
          {locale === "en" ? "Trending post" : "Post tendances"}
        </Typography>
        <Divider />
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {!topPosts && <ListItemsSkeleton />}
          {topPosts && topPosts.length === 0 && <Empty />}
          {topPosts &&
            topPosts.map((item, i) => (
              <ListItems
                key={item.id}
                item={item}
                handleViewPost={(path) => handleView(path, "posts")}
                divider={i !== topPosts.length - 1}
              />
            ))}
        </List>
      </Paper>
    </Stack>
  );
};

export default React.memo(RightSideBar);
