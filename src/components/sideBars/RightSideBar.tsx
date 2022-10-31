import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib/api";

const RightSideBar = () => {
  const { push } = useRouter();

  const handleViewPost = (path: string) => {
    push(path);
  };

  const setTopPosts = useStore((state) => state.setTopPosts);
  const posts = useStore((state) => state.topPosts);

  React.useEffect(() => {
    const getPosts = async () => {
      const posts = await getRequest({ endpoint: "/posts/top/posts" });
      if (!posts.error) {
        setTopPosts(posts.data);
      }
    };

    getPosts();
  }, []);

  return (
    <Stack>
      <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
        Top posts of the Week
      </Typography>
      <Divider />
      <List sx={{ width: { xs: "100%", md: 350 }, bgcolor: "background.paper" }}>
        {posts?.topArticlesOfTheWeek.map((item, i) => (
          <React.Fragment key={item.id}>
            <ListItemButton alignItems="flex-start" onClick={() => handleViewPost(`/articles/${item.slug}`)}>
              <ListItemAvatar>
                <Avatar alt={`${item.author.firstName} ${item.author.lastName}`} src={`${item.author.profile?.avatar}`}>
                  {item.author.firstName.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${item.title.substring(0, 58)}  ${item.title.length > 58 ? "..." : ""}`}
                primaryTypographyProps={{
                  fontWeight: 700,
                }}
                secondary={
                  <Stack sx={{ width: 1 }}>
                    <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                      By {`${item.author.firstName} ${item.author.lastName}`}
                    </Typography>
                    <Typography
                      gutterBottom
                      color="text.secondary"
                      fontSize={14}
                      sx={{
                        display: "-webkit-box!important",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipse",
                        whiteSpace: "normal",
                      }}
                      component="div"
                      dangerouslySetInnerHTML={{
                        __html: item.content,
                      }}
                    />
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
        Top questions of the Week
      </Typography>
      <Divider />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {posts?.topQuestionsOfTheWeek?.map((item, i) => (
          <React.Fragment key={item.id}>
            <ListItemButton alignItems="flex-start" onClick={() => handleViewPost(`/posts/${item.slug}`)}>
              <ListItemAvatar>
                <Avatar alt={`${item.author.firstName} ${item.author.lastName}`} src={`${item.author.profile?.avatar}`}>
                  {item.author.firstName.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: 700,
                }}
                secondary={
                  <React.Fragment>
                    <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                      By {`${item.author.firstName} ${item.author.lastName}`}
                    </Typography>
                    {` — ${item.question?.reactions.filter((el) => el.type === "LIKE").length} likes`}
                  </React.Fragment>
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
