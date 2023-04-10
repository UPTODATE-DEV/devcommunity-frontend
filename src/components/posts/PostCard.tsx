import Bookmark from "@/components/common/Bookmark";
import Content from "@/components/common/Content";
import PostCardHeader from "@/components/common/PostCardHeader";
import PostTags from "@/components/common/PostTags";
import Share from "@/components/common/Share";
import PostReaction from "@/components/posts/PostReaction";
import { useGoToPost, useGoToUserProfile } from "@/hooks/posts";
import { getArticleImageUrl, getContent, parseDate } from "@/lib/posts";
import { shortenNumber } from "@/lib/shorterNumber";
import CommentIcon from "@mui/icons-material/Comment";
import EyeIcon from "@mui/icons-material/RemoveRedEye";
import { alpha } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import PostImage from "./PostImage";

const PostCard: React.FC<{ data: Post }> = ({ data }) => {
  const { author } = data;
  const goToPost = useGoToPost();
  const theme = useTheme();
  const { locale } = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const postContent = getContent(data?.content, isMobile ? 180 : 220, locale);

  const goToProfile = useGoToUserProfile();
  const handleGoToProfile = useCallback(() => {
    goToProfile(author);
  }, [author?.username]);

  const handleGoToPost = useCallback(() => {
    goToPost(data);
  }, [data]);

  return (
    <Paper variant="outlined" sx={{ p: 2, position: "relative" }}>
      <Stack
        sx={{
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
          px: 2,
          py: 0.5,
          borderRadius: 2,
          width: "fit-content",
          position: "absolute",
          top: 12,
          right: 12,
        }}
      >
        <Typography variant="caption" textAlign="end" color="text.secondary">
          {data?.locale === "EN" ? "English" : "French"}
        </Typography>
      </Stack>
      <Grid container spacing={{ xs: 0, sm: 2, lg: 4 }}>
        <Grid item xs={12} sm={8}>
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
          <Stack sx={{ cursor: "pointer" }} onClick={handleGoToPost}>
            <Content content={postContent} />
          </Stack>
          {isMobile && (
            <PostImage
              handleClick={handleGoToPost}
              title={data?.title}
              articleUrl={getArticleImageUrl(data?.article)}
            />
          )}
          <PostTags tags={data?.tags} />
        </Grid>
        {!isMobile && (
          <Grid item xs={0} sm={4}>
            <Stack justifyContent="center" alignItems="center" sx={{ height: 1 }}>
              <PostImage
                handleClick={handleGoToPost}
                title={data?.title}
                articleUrl={getArticleImageUrl(data?.article)}
              />
            </Stack>
          </Grid>
        )}
      </Grid>
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 1 }}
      >
        <PostReaction post={data} />
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EyeIcon fontSize="small" />
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              {shortenNumber(data?._count?.views || 0)}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center">
            <Link href={`/articles/${data?.slug}/#comments`} passHref>
              <IconButton>
                <CommentIcon fontSize="small" />
              </IconButton>
            </Link>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              {shortenNumber(data?._count?.comments || 0)}
            </Typography>
          </Stack>

          <Bookmark post={data} />
          <Share data={data} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default React.memo(PostCard);
