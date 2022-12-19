import { useGoToUserProfile } from "@/hooks/posts";
import { getArticleImageUrl, getUserFullName, parseDate } from "@/lib";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useCallback } from "react";
import PostImage from "./PostImage";

const PostHeader: React.FC<{ data: Post }> = ({ data }) => {
  const { author } = data;

  const goToProfile = useGoToUserProfile();

  const handleClick = useCallback(() => {}, []);

  const handleGoToProfile = useCallback(() => {
    goToProfile(author?.email);
  }, [author?.email]);

  return (
    <Paper
      variant="outlined"
      sx={{
        width: 1,
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
      }}
    >
      <PostImage
        height={300}
        handleClick={handleClick}
        title={data?.title}
        articleUrl={getArticleImageUrl(data?.article)}
      />
      <Stack
        sx={{
          px: 2,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "rgba(0,0,0,0.5)",
          height: 32,
          width: 1,
        }}
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        spacing={2}
      >
        <Typography
          variant="body2"
          color="#d8d8d8"
          onClick={handleGoToProfile}
          sx={{
            "&:hover": {
              color: "primary.main",
            },
            cursor: "pointer",
          }}
        >
          {getUserFullName(author)}
        </Typography>
        <Typography variant="body2" color="#d8d8d8">
          {parseDate({ date: data?.publishedOn })}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default PostHeader;
