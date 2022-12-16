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
import { TopSkeleton } from "./Skeleton";
import dynamic from "next/dynamic";
import Paper from "@mui/material/Paper";

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
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2} sx={{ py: 2 }}>
        <Typography variant="h6">{locale === "en" ? "Top Posts" : "Meilleurs posts"}</Typography>
        <Divider variant="inset" />
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
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Stack>
    </Paper>
  );
};

export default TopPosts;
