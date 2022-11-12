import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import useStore from "@/hooks/useStore";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

const TopPosts = () => {
  const topPosts = useStore((state) => state.topPosts);
  const { push } = useRouter();

  const handleViewPost = (post: TopPosts) => {
    push(post.type === "QUESTION" ? `/posts/${post.slug}` : `/articles/${post.slug}`);
  };

  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      <Typography variant="h6">Top Posts</Typography>
      <Divider variant="inset" />
      <List>
        {topPosts?.map((el, i) => (
          <React.Fragment key={i}>
            <ListItemButton
              onClick={() => handleViewPost(el)}
              sx={{
                bgcolor:
                  i === 0
                    ? "rgba(0,0,200,0.3)"
                    : i === 1
                    ? "rgba(0,0,200,0.2)"
                    : i === 2
                    ? "rgba(0,0,200,0.1)"
                    : "inherit",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: "primary.main", color: "white" }}
                  src={process.env.NEXT_PUBLIC_FILES_BASE_URL + el?.author?.profile?.avatar?.url}
                  alt={`${el.author.firstName} ${el.author.lastName}`}
                >
                  {el.author.firstName.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={el.title}
                primaryTypographyProps={{
                  fontWeight: 700,
                }}
                secondary={
                  <span>
                    <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                      By {`${el.author.firstName} ${el.author.lastName}`}
                    </Typography>
                    {` — ${el?.reactions} reactions`}
                  </span>
                }
              />
            </ListItemButton>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
};

export default TopPosts;
