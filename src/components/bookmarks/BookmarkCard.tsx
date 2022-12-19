import PostContent from "@/components/common/Content";
import PostCardHeader from "@/components/common/PostCardHeader";
import PostTags from "@/components/common/PostTags";
import { useGoToPost, useGoToUserProfile } from "@/hooks/posts";
import useStore from "@/hooks/useStore";
import { patchRequest } from "@/lib/api";
import { getContent, parseDate } from "@/lib/posts";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
dayjs.extend(relativeTime);

const BookmarkCard: React.FC<{ data: Post }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  const { setBookmarks, bookmarks } = useStore((state) => state);
  const { push, locale } = useRouter();
  const theme = useTheme();
  const author = data?.author;
  const goToProfile = useGoToUserProfile();
  const goToPost = useGoToPost();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const postContent = getContent(data?.content, isMobile ? 180 : 220);

  const handleViewPost = () => {
    push(`${data?.type === "ARTICLE" ? "/articles" : "/posts"}/${data?.slug}`);
  };

  // on remove from bookmarks
  const onRemoveFromBookmarks = async () => {
    const post = await patchRequest({ endpoint: `/posts/${data?.id}/bookmarks/${user?.id}` });
    // update posts
    const updatedPosts = bookmarks.filter((el) => el.post.id !== post.data?.id);

    setBookmarks(updatedPosts as Bookmarks[]);
  };

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

      <Stack>
        <Stack
          direction="row"
          flexWrap="wrap"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 1 }}
        >
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            sx={{ px: 2 }}
            onClick={onRemoveFromBookmarks}
            startIcon={<BookmarkRemoveIcon />}
          >
            {locale === "en" ? "Remove" : "Retirer"}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default BookmarkCard;
