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
import { useRouter } from "next/router";
import React from "react";
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
        {posts?.topArticlesOfTheWeek.map((item, i) => (
          <React.Fragment key={item.id}>
            <ListItemButton alignItems="flex-start" onClick={() => handleViewPost(`/articles/${item.slug}`)}>
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: "primary.main", color: "white" }}
                  alt={`${item.author.firstName} ${item.author.lastName}`}
                  src={`${item.author.profile?.avatar}`}
                >
                  {item.author.firstName.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: 700,
                }}
                secondary={
                  <Stack sx={{ width: 1 }} component="span">
                    <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                      By {`${item.author.firstName} ${item.author.lastName}`}
                    </Typography>
                  </Stack>
                }
              />
            </ListItemButton>
            {i < 2 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
        Top posts of the Week
      </Typography>
      <Divider />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {posts?.topQuestionsOfTheWeek?.map((item, i) => (
          <React.Fragment key={item.id}>
            <ListItemButton alignItems="flex-start" onClick={() => handleViewPost(`/posts/${item.slug}`)}>
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: "primary.main", color: "white" }}
                  alt={`${item.author.firstName} ${item.author.lastName}`}
                  src={`${item.author.profile?.avatar}`}
                >
                  {item.author.firstName.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: 700,
                }}
                secondary={
                  <span>
                    <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                      By {`${item.author.firstName} ${item.author.lastName}`}
                    </Typography>
                    {` — ${item.question?.reactions.filter((el) => el.type === "LIKE").length} likes`}
                  </span>
                }
              />
            </ListItemButton>
            {i < 2 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
};

export default RightSideBar;
