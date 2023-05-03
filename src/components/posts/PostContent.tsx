import Bookmark from "@/components/common/Bookmark";
import PostCardHeader from "@/components/common/PostCardHeader";
import PostTags from "@/components/common/PostTags";
import Share from "@/components/common/Share";
import { useGoToUserProfile } from "@/hooks";
import { parseDate } from "@/lib";
import { alpha } from "@mui/material";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import React, { useCallback } from "react";

const Content = dynamic(import("@/components/common/Content"), { ssr: false });
const PostReaction = dynamic(import("@/components/posts/PostReaction"), { ssr: false });
const SeriesList = dynamic(import("@/components/posts/SeriesList"), { ssr: false });

const PostContent: React.FC<{ data: Post }> = ({ data }) => {
  const { author } = data;
  const goToProfile = useGoToUserProfile();

  const handleGoToProfile = useCallback(() => {
    goToProfile(author);
  }, [author?.username]);

  return (
    <Paper variant="outlined" spacing={2} sx={{ p: 2, position: "relative" }} component={Stack}>
      <Stack
        sx={{
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          px: 2,
          py: 0.5,
          borderRadius: 2,
          width: "fit-content",
          position: "absolute",
          top: 20,
          right: 15,
        }}
      >
        <Typography variant="caption" textAlign="end" color="text.secondary">
          {data?.locale === "EN" ? "English" : "French"}
        </Typography>
      </Stack>
      <PostCardHeader
        handleClickGoToProfile={handleGoToProfile}
        date={parseDate({ date: data?.createdAt, type: "relative" })}
        author={author}
      />
      <Typography variant="h4" color="text.primary" sx={{ mb: "-8px" }} fontWeight={700} gutterBottom>
        {data?.title}
      </Typography>
      {data?.series.length >= 1 && <SeriesList series={data?.series as any} />}
      <Content content={data?.content} fontSize={17} />
      <PostTags tags={data?.tags} />
      {!data?.draft && (
        <>
          <Divider />
          <Stack
            direction="row"
            flexWrap="wrap"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 1 }}
          >
            <PostReaction post={data} />
            <Stack direction="row" spacing={1}>
              <Bookmark post={data} />
              <Share data={data} />
            </Stack>
          </Stack>
        </>
      )}
    </Paper>
  );
};

export default PostContent;
