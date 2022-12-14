import useStore from "@/hooks/useStore";
import { patchRequest } from "@/lib/api";
import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import TagIcon from "@mui/icons-material/Tag";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import { Box, Chip, Paper, useMediaQuery, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import hljs from "highlight.js";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
dayjs.extend(relativeTime);
import Share from "@/components/common/Share";
import PostContent from "@/components/common/PostContent";
import PostTags from "@/components/common/PostTags";
import PostCardHeader from "@/components/common/PostCardHeader";
import { CallToActionSkeleton } from "@/components/middle/Skeleton";
import { FILES_BASE_URL } from "config/url";
import ShowQuestionReactions from "../questions/ShowQuestionReactions";
import useSocket from "@/hooks/useSocket";
import { getContent, parseDate } from "@/lib/posts";
import { useGoToPost, useGoToUserProfile } from "../../hooks/posts";
const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});

const Comment: React.FC<{ data: Post }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  const { push, locale } = useRouter();
  const { setPosts, posts } = useStore((state) => state);
  const [userReaction, setUserReaction] = React.useState<QuestionReactionType | undefined>();
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openReaction, setOpenReaction] = React.useState(false);
  const socket = useSocket();
  const theme = useTheme();
  const { author } = data;
  const goToProfile = useGoToUserProfile();
  const goToPost = useGoToPost();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  locale === "fr" ? dayjs.locale("fr") : dayjs.locale("en");

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleCloseReaction = () => {
    setOpenReaction(false);
  };

  const handleViewQuestion = () => {
    push(`/posts/${data.slug}`);
  };

  const handleGoToProfile = useCallback(() => {
    goToProfile(author?.email);
  }, [author?.email]);

  const handleGoToPost = useCallback(() => {
    goToPost(data?.slug);
  }, [data?.slug]);

  const onReact = async (type: QuestionReactionType) => {
    if (user?.id) {
      const post = await patchRequest({ endpoint: `/posts/${data?.id}/reactions/${type}/${user?.id}/question` });
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

  React.useEffect(() => {
    document.querySelectorAll("pre").forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  React.useEffect(() => {
    if (user) {
      const reaction = data?.question?.reactions?.find((reaction) => {
        return reaction?.user?.id === user?.id;
      });
      if (reaction) {
        setUserReaction(reaction.type);
      } else {
        setUserReaction(undefined);
      }
    }
  }, [data?.question?.reactions, user]);

  return (
    <>
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
        <ShowQuestionReactions reactions={data?.question?.reactions} />
      </Dialog>
      <PostCardHeader
        handleClickGoToProfile={handleGoToProfile}
        date={parseDate({ date: data?.publishedOn, type: "relative" })}
        author={author}
      />
      <PostContent content={data?.content} />
      <PostTags tags={data?.tags} />
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center">
            <Tooltip title={locale === "en" ? "Endorse" : "Approuver"} placement="bottom" arrow>
              <IconButton onClick={() => onReact("LIKE")}>
                <ThumbUpSharpIcon color={userReaction === "LIKE" ? "info" : "inherit"} fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={locale === "en" ? "See all reactions" : "Voir toutes les réactions"}
              placement="bottom"
              arrow
            >
              <IconButton onClick={() => setOpenReaction(true)}>
                <Typography variant="caption" color="text.primary" fontWeight={700}>
                  {data?.question?.reactions?.filter((el) => el.type === "LIKE").length}
                </Typography>
              </IconButton>
            </Tooltip>

            <Tooltip title={locale === "en" ? "Disapprove" : "Désapprouver"} placement="bottom" arrow>
              <IconButton onClick={() => onReact("DISLIKE")}>
                <ThumbDownOffAltIcon color={userReaction === "DISLIKE" ? "error" : "inherit"} fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={locale === "en" ? "See all reactions" : "Voir toutes les réactions"}
              placement="bottom"
              arrow
            >
              <IconButton onClick={() => setOpenReaction(true)}>
                <Typography variant="caption" color="text.primary" fontWeight={700}>
                  {data?.question?.reactions?.filter((el) => el.type === "DISLIKE").length}
                </Typography>
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Link href={`/posts/${data?.slug}/#comments`} passHref>
              <IconButton>
                <QuestionAnswerIcon fontSize="small" />
              </IconButton>
            </Link>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              {data?.comments?.length || 0}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Comment;
