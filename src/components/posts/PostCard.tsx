import { CallToActionSkeleton } from "@/components/middle/Skeleton";
import useStore from "@/hooks/useStore";
import { patchRequest } from "@/lib/api";
import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LightbulbSharpIcon from "@mui/icons-material/LightbulbSharp";
import TagIcon from "@mui/icons-material/Tag";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { FILES_BASE_URL } from "config/url";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import hljs from "highlight.js";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import ShowPostReactions from "./ShowPostReactions";
import Share from "@/components/common/Share";
import useSocket from "@/hooks/useSocket";
import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import PostContent from "@/components/common/PostContent";
import PostTags from "./PostTags";
import PostCardHeader from "./PostCardHeader";
import PostImage from "./PostImage";
import UserAvatar from "@/components/common/UserAvatar";
import { getArticleImageUrl, getContent, getUserFullName, getUserProfileImageUrl, parseDate } from "@/lib/posts";
import { useGoToPost, useGoToUserProfile } from "@/hooks/posts";
dayjs.extend(relativeTime);

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});

const PostCard: React.FC<{ data: Post }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  const { setPosts, posts } = useStore((state) => state);
  const { push, locale } = useRouter();
  const [userReaction, setUserReaction] = React.useState<ArticleReactionType | undefined>();
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openReaction, setOpenReaction] = React.useState(false);
  const socket = useSocket();

  locale === "en" ? dayjs.locale("en") : dayjs.locale("fr");

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleCloseReaction = () => {
    setOpenReaction(false);
  };

  const handleViewPost = () => {
    push(`/articles/${data?.slug}`);
  };

  const onReact = async (type: string) => {
    if (user?.id) {
      const post = await patchRequest({ endpoint: `/posts/${data?.id}/reactions/${type}/${user?.id}/article` });
      // update posts
      const updatedPosts = posts.map((el) => {
        if (el.id === post.data?.id) {
          return post.data;
        }
        return el;
      });

      socket.emit("notification", { notificationFromUser: user, id: Date.now().toString(), post: post.data, type });

      return setPosts(updatedPosts as Post[]);
    }
    setOpenLogin(true);
  };

  // on add to bookmarks
  const onAddToBookmarks = async () => {
    if (user?.id) {
      const post = await patchRequest({ endpoint: `/posts/${data?.id}/bookmarks/${user?.id}` });
      // update posts
      const updatedPosts = posts.map((el) => {
        if (el.id === post.data?.id) {
          return post.data;
        }
        return el;
      });

      return setPosts(updatedPosts as Post[]);
    }
    setOpenLogin(true);
  };

  const Like = () => (
    <Tooltip title={locale === "en" ? "Like" : "Aimer"} placement="bottom" arrow>
      <IconButton onClick={() => onReact("LIKE")}>
        <ThumbUpSharpIcon color="info" fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  const Useful = () => (
    <Tooltip title={locale === "en" ? "Insightful" : "Intéressant"} placement="bottom" arrow>
      <IconButton onClick={() => onReact("USEFUL")}>
        <LightbulbSharpIcon color="warning" fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  const Love = () => (
    <Tooltip title={locale === "en" ? "Love" : "Adorer"} placement="bottom" arrow>
      <IconButton onClick={() => onReact("LOVE")}>
        <FavoriteSharpIcon color="error" fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  React.useEffect(() => {
    document.querySelectorAll("pre").forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  React.useEffect(() => {
    if (user) {
      const reaction = data?.article?.reactions?.find((reaction) => {
        return reaction?.user?.id === user?.id;
      });
      if (reaction) {
        setUserReaction(reaction.type);
      } else {
        setUserReaction(undefined);
      }
    }
  }, [data?.article?.reactions, user]);

  const { author } = data;
  const goToProfile = useGoToUserProfile();
  const goToPost = useGoToPost();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const postContent = getContent(data?.content, isMobile ? 180 : 240);

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

      <Dialog
        open={openReaction}
        onClose={handleCloseReaction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ShowPostReactions reactions={data?.article?.reactions} />
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
        <Stack direction="row" alignItems="center">
          {!userReaction ? (
            <>
              <Like />
              <Love />
              <Useful />
            </>
          ) : (
            <>
              {userReaction === "LIKE" && <Like />}
              {userReaction === "LOVE" && <Love />}
              {userReaction === "USEFUL" && <Useful />}
            </>
          )}

          <Tooltip title={locale === "en" ? "See all reactions" : "Voir toutes les réactions"} placement="bottom" arrow>
            <IconButton onClick={() => setOpenReaction(true)}>
              <Typography variant="caption" color="text.primary" fontWeight={700}>
                {data.article?.reactions?.length}
              </Typography>
            </IconButton>
          </Tooltip>
        </Stack>
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

          <Tooltip title={locale === "en" ? "Add to bookmarks" : "Ajouter aux favoris"} placement="bottom" arrow>
            <IconButton onClick={onAddToBookmarks}>
              {data?.bookmarks?.find((el) => el.userId === user?.id) ? (
                <BookmarkRemoveIcon color="secondary" fontSize="small" />
              ) : (
                <BookmarkAddSharpIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <Share data={data} />
        </Stack>
      </Stack>
    </Paper>
  );
};

const PostActions = () => {};

export default React.memo(PostCard);
