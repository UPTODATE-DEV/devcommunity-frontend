import Bookmark from "@/components/common/Bookmark";
import PostContent from "@/components/common/PostContent";
import PostReaction from "@/components/common/PostReaction";
import Share from "@/components/common/Share";
import { CallToActionSkeleton } from "@/components/middle/Skeleton";
import { useGoToPost, useGoToUserProfile } from "@/hooks/posts";
import useSocket from "@/hooks/useSocket";
import useStore from "@/hooks/useStore";
import { getArticleImageUrl, getContent, parseDate } from "@/lib/posts";
import CommentIcon from "@mui/icons-material/Comment";
import { Paper, useMediaQuery, useTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import hljs from "highlight.js";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import PostCardHeader from "../common/PostCardHeader";
import PostTags from "../common/PostTags";
import PostImage from "./PostImage";
dayjs.extend(relativeTime);

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});

const PostCard: React.FC<{ data: Post }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  const { locale } = useRouter();
  const [openLogin, setOpenLogin] = React.useState(false);

  locale === "en" ? dayjs.locale("en") : dayjs.locale("fr");

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  React.useEffect(() => {
    document.querySelectorAll("pre").forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  const { author } = data;
  const goToProfile = useGoToUserProfile();
  const goToPost = useGoToPost();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const postContent = getContent(data?.content, isMobile ? 180 : 220);

  const handleGoToProfile = useCallback(() => {
    goToProfile(author?.email);
  }, [author?.email]);

  const handleGoToPost = useCallback(() => {
    goToPost(data?.slug);
  }, [data?.slug]);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Dialog
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CallToAction />
      </Dialog>
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
          <PostContent content={postContent} />
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
        <PostReaction post={data} userId={user?.id} />
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center">
            <Link href={`/articles/${data?.slug}/#comments`} passHref>
              <IconButton>
                <CommentIcon fontSize="small" />
              </IconButton>
            </Link>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              {data?.comments?.length || 0}
            </Typography>
          </Stack>

          <Bookmark post={data} userId={user?.id} />
          <Share data={data} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default React.memo(PostCard);
