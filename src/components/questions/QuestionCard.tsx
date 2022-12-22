import PostContent from "@/components/common/Content";
import PostCardHeader from "@/components/common/PostCardHeader";
import PostTags from "@/components/common/PostTags";
import { useGoToPost, useGoToUserProfile } from "@/hooks/posts";
import { getContent, parseDate } from "@/lib/posts";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";
import Link from "next/link";
import React, { useCallback } from "react";
import Bookmark from "../common/Bookmark";
import Share from "../common/Share";
import QuestionReactions from "./QuestionReactions";

const QuestionCard: React.FC<{ data: Post }> = ({ data }) => {
  const theme = useTheme();
  const { author } = data;
  const goToProfile = useGoToUserProfile();
  const goToPost = useGoToPost();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const postContent = getContent(data?.content, isMobile ? 180 : 220);

  const handleGoToProfile = useCallback(() => {
    goToProfile(author?.email);
  }, [author?.email]);

  const handleGoToPost = useCallback(() => {
    goToPost(data);
  }, [data]);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <PostCardHeader
        handleClickGoToProfile={handleGoToProfile}
        date={parseDate({ date: data?.publishedOn, type: "relative" })}
        author={author}
      />
      <Typography
        fontWeight={700}
        color="text.primary"
        variant="h6"
        onClick={handleGoToPost}
        sx={{
          "&:hover": {
            color: "primary.main",
          },
          cursor: "pointer",
          mb: "-8px",
          mt: 1,
        }}
      >
        {data?.title}
      </Typography>
      <PostContent content={postContent} />
      <PostTags tags={data?.tags} />
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 1 }}
      >
        <QuestionReactions post={data} />
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center">
            <Link href={`/articles/${data?.slug}/#comments`} passHref>
              <IconButton>
                <CommentIcon fontSize="small" />
              </IconButton>
            </Link>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              {data?._count?.comments}
            </Typography>
          </Stack>

          <Bookmark post={data} />
          <Share data={data} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default QuestionCard;
