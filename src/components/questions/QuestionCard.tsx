import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LightbulbSharpIcon from "@mui/icons-material/LightbulbSharp";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import VolunteerActivismSharpIcon from "@mui/icons-material/VolunteerActivismSharp";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import CommentIcon from "@mui/icons-material/Comment";
import { useRouter } from "next/router";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/fr";
import { FILES_BASE_URL } from "config/url";
import { patchRequest } from "@/lib/api";
import React from "react";
import useStore from "@/hooks/useStore";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

const QuestionCard: React.FC<{ data: Post }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  const { push } = useRouter();
  const { setPosts, posts } = useStore((state) => state);
  const [userReaction, setUserReaction] = React.useState<QuestionReactionType | undefined>();

  const handleViewQuestion = () => {
    push(`/posts/${data.slug}`);
  };

  const onReact = async (type: QuestionReactionType) => {
    const post = await patchRequest({ endpoint: `/posts/${data?.id}/reactions/${type}/${user?.id}/question` });
    // update posts
    const updatedPosts = posts.map((el) => {
      if (el.id === post.data?.id) {
        return post.data;
      }
      return el;
    });

    setPosts(updatedPosts as Post[]);
  };

  // on add to bookmarks
  const onAddToBookmarks = async () => {
    const post = await patchRequest({ endpoint: `/posts/${data?.id}/bookmarks/${user?.id}` });
    // update posts
    const updatedPosts = posts.map((el) => {
      if (el.id === post.data?.id) {
        return post.data;
      }
      return el;
    });

    setPosts(updatedPosts as Post[]);
  };

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
  }, [data?.article?.reactions, user]);

  return (
    <Grid container sx={{ cursor: "pointer" }}>
      <Grid item xs={2} md={1.2}>
        <Avatar alt={`${data?.author?.firstName} ${data?.author?.lastName}`} src={data?.author?.avatar?.url}>
          {data?.author?.firstName.charAt(0)}
        </Avatar>
      </Grid>
      <Grid item xs={10} md={10.8}>
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
            display: "-webkit-box!important",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipse",
            whiteSpace: "normal",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {data?.title}
        </Typography>
        <Typography
          gutterBottom
          color="text.secondary"
          fontSize={14}
          sx={{
            display: "-webkit-box!important",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipse",
            whiteSpace: "normal",
          }}
          component="div"
          dangerouslySetInnerHTML={{
            __html: data?.content,
          }}
        />

        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
          <Stack direction="row" spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, px: 1, borderRadius: 52 }}
            >
              <Tooltip title="I like" placement="bottom" arrow>
                <IconButton onClick={() => onReact("LIKE")}>
                  <ThumbUpSharpIcon color="info" fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="See all reactions" placement="bottom" arrow>
                <IconButton>
                  <Typography variant="caption" color="text.primary" fontWeight={700}>
                    {data?.question?.reactions?.filter((el) => el.type === "LIKE").length}
                  </Typography>
                </IconButton>
              </Tooltip>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, px: 1, borderRadius: 52 }}
            >
              <Tooltip title="I like" placement="bottom" arrow>
                <IconButton onClick={() => onReact("DISLIKE")}>
                  <ThumbDownOffAltIcon color="error" fontSize="small" />
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
              <IconButton>
                <QuestionAnswerIcon />
              </IconButton>
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
                  {data?.bookmarks?.find((el) => el.user !== user?.id) ? (
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
  );
};

export default QuestionCard;
