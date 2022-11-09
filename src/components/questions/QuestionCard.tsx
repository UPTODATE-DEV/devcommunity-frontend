import useStore from "@/hooks/useStore";
import { patchRequest } from "@/lib/api";
import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import hljs from "highlight.js";
import { useRouter } from "next/router";
import React from "react";
import { TypographyStylesProvider } from "@mantine/core";
import Link from "next/link";
import { Chip } from "@mui/material";
dayjs.extend(relativeTime);
import TagIcon from "@mui/icons-material/Tag";
import dynamic from "next/dynamic";
import Dialog from "@mui/material/Dialog";

import { CallToActionSkeleton } from "@/components/middle/Skeleton";
const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});

const QuestionCard: React.FC<{ data: Post }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  const { push } = useRouter();
  const { setPosts, posts } = useStore((state) => state);
  const [userReaction, setUserReaction] = React.useState<QuestionReactionType | undefined>();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewQuestion = () => {
    push(`/posts/${data.slug}`);
  };

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

      return setPosts(updatedPosts as Post[]);
    }
    setOpen(true);
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
    setOpen(true);
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
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CallToAction />
      </Dialog>
      <Grid container>
        <Grid item xs={2} sm={1} md={2} lg={1.2}>
          <Avatar
            sx={{ bgcolor: "primary.main", color: "white" }}
            alt={`${data?.author?.firstName} ${data?.author?.lastName}`}
            src={data?.author?.avatar?.url}
          >
            {data?.author?.firstName.charAt(0)}
          </Avatar>
        </Grid>
        <Grid item xs={10} sm={11} md={10} lg={10.8}>
          <Stack direction="row" spacing={1}>
            <Typography variant="caption" color="text.primary" gutterBottom fontWeight={700}>
              {data?.author?.firstName} {data?.author?.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary" gutterBottom fontWeight={700}>
              -
            </Typography>
            <Typography variant="caption" gutterBottom color="text.secondary">
              {dayjs(data?.publishedOn).fromNow()}
            </Typography>
          </Stack>
          <Typography
            gutterBottom
            fontWeight={700}
            color="text.primary"
            onClick={handleViewQuestion}
            sx={{
              "&:hover": {
                color: "primary.main",
              },
              cursor: "pointer",
            }}
          >
            {data?.title}
          </Typography>

          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: `${data?.content.substring(0, 120)}...` }} />
          </TypographyStylesProvider>

          <Grid container spacing={1} sx={{ pb: 1 }} direction="row">
            {data?.tags?.map((el) => (
              <Grid item xs="auto" key={el.tag.id}>
                <Chip size="small" icon={<TagIcon fontSize="small" />} clickable label={el.tag.name} />
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
            <Stack direction="row" spacing={2}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, px: 1, borderRadius: 52 }}
              >
                <Tooltip title="I like" placement="bottom" arrow>
                  <IconButton onClick={() => onReact("LIKE")}>
                    <ThumbUpSharpIcon color={userReaction === "LIKE" ? "info" : "inherit"} fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="See all reactions" placement="bottom" arrow>
                  <IconButton>
                    <Typography variant="caption" color="text.primary" fontWeight={700}>
                      {data?.question?.reactions?.filter((el) => el.type === "LIKE").length}
                    </Typography>
                  </IconButton>
                </Tooltip>

                <Tooltip title="I like" placement="bottom" arrow>
                  <IconButton onClick={() => onReact("DISLIKE")}>
                    <ThumbDownOffAltIcon color={userReaction === "DISLIKE" ? "error" : "inherit"} fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="See all reactions" placement="bottom" arrow>
                  <IconButton>
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

              <Stack
                direction="row"
                alignItems="center"
                sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 52 }}
              >
                <Tooltip title="Save post" placement="bottom" arrow>
                  <IconButton onClick={onAddToBookmarks}>
                    {data?.bookmarks?.find((el) => el.userId === user?.id) ? (
                      <BookmarkRemoveIcon color="secondary" fontSize="small" />
                    ) : (
                      <BookmarkAddSharpIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default QuestionCard;
