import useStore from "@/hooks/useStore";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { TopSkeleton } from "./Skeleton";

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => <TopSkeleton />,
});

const TopPosts = () => {
  const topPosts = useStore((state) => state.topPosts);
  const { push, locale } = useRouter();

  const handleViewPost = (post: TopPosts) => {
    push(post.type === "QUESTION" ? `/posts/${post.slug}` : `/articles/${post.slug}`);
  };

  return (
    <Stack spacing={2}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6">{locale === "en" ? "Top Posts" : "Meilleurs posts"}</Typography>
      </Paper>
      <Paper variant="outlined" sx={{ p: 2 }}>
        {topPosts?.length === 0 && <Empty />}
        <List>
          {topPosts?.map((el, i) => (
            <React.Fragment key={i}>
              <ListItemButton
                onClick={() => handleViewPost(el)}
                sx={{
                  position: "relative",
                  "&:after": {
                    position: "absolute",
                    content: "''",
                    width: 15,
                    height: 1,
                    bottom: 0,
                    right: 0,
                    backgroundColor:
                      i === 0
                        ? "rgba(52,152,219,1)"
                        : i === 1
                        ? "rgba(52,152,219,0.5)"
                        : i === 2
                        ? "rgba(52,152,219,0.2)"
                        : "inherit",
                    transition: "all 0.3s ease-in-out",
                  },
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
                  secondaryTypographyProps={{
                    fontWeight: 700,
                  }}
                  secondary={
                    <span>
                      <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                        {locale === "en" ? "By" : "Par"} {`${el.author.firstName} ${el.author.lastName}`}
                      </Typography>
                      {` — ${el?.reactions} reactions`}
                    </span>
                  }
                />
              </ListItemButton>
              {i < topPosts.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Stack>
  );
};

export default TopPosts;
