import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
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
import { useRouter } from "next/router";
import { TypographyStylesProvider } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/fr";
import { FILES_BASE_URL } from "config/url";
import useStore from "@/hooks/useStore";
import React from "react";
import { patchRequest, postRequest } from "@/lib/api";
import hljs from "highlight.js";
import { Chip } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import Link from "next/link";
import CommentIcon from "@mui/icons-material/Comment";
import Dialog from "@mui/material/Dialog";
import { CallToActionSkeleton } from "@/components/middle/Skeleton";
import dynamic from "next/dynamic";

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});

const PostCard: React.FC<{ data: Post }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  const { setPosts, posts } = useStore((state) => state);
  const { push } = useRouter();
  const [userReaction, setUserReaction] = React.useState<ArticleReactionType | undefined>();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
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

  const Like = () => (
    <Tooltip title="I LIKE" placement="bottom" arrow>
      <IconButton onClick={() => onReact("LIKE")}>
        <ThumbUpSharpIcon color="info" fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  const Useful = () => (
    <Tooltip title="USEFUL" placement="bottom" arrow>
      <IconButton onClick={() => onReact("USEFUL")}>
        <LightbulbSharpIcon color="warning" fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  const Love = () => (
    <Tooltip title="I LOVE" placement="bottom" arrow>
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
          <IconButton onClick={() => push(`/profile/@${data?.author?.email.split("@")[0]}`)}>
            <Avatar
              sx={{ bgcolor: "primary.main", color: "white" }}
              alt={`${data?.author?.firstName} ${data?.author?.lastName}`}
              src={FILES_BASE_URL + data?.author?.profile?.avatar?.url}
            >
              {data?.author?.firstName.charAt(0)}
            </Avatar>
          </IconButton>
        </Grid>
        <Grid item xs={10} sm={11} md={10} lg={10.8}>
          <Stack direction="row" spacing={1}>
            <Typography
              variant="caption"
              onClick={() => push(`/profile/@${data?.author?.email.split("@")[0]}`)}
              sx={{
                "&:hover": {
                  color: "primary.main",
                },
                cursor: "pointer",
              }}
              color="text.primary"
              gutterBottom
              fontWeight={700}
            >
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
            onClick={handleViewPost}
            sx={{
              "&:hover": {
                color: "primary.main",
              },
              cursor: "pointer",
            }}
          >
            {data?.title}
          </Typography>

          <Typography
            color="text.secondary"
            component="div"
            className="content"
            gutterBottom
            dangerouslySetInnerHTML={{
              __html: `${data?.content.substring(0, 120)}...`,
            }}
          />

          {data?.article.image && (
            <Stack
              sx={{
                width: 1,
                height: { xs: 180, md: 240 },
                position: "relative",
                borderRadius: 2,
                cursor: "pointer",
                overflow: "hidden",
                my: 2,
              }}
              onClick={handleViewPost}
            >
              <Image src={FILES_BASE_URL + data?.article?.image?.url} alt="Post" layout="fill" objectFit="cover" />
            </Stack>
          )}

          <Grid container spacing={1} sx={{ pb: 1 }} direction="row">
            {data?.tags?.map((el) => (
              <Grid item xs="auto" key={el.tag.id}>
                <Chip size="small" icon={<TagIcon fontSize="small" />} sx={{ px: 2 }} clickable label={el.tag.name} />
              </Grid>
            ))}
          </Grid>

          <Stack
            direction="row"
            flexWrap="wrap"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 1 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 52,
                transition: "all 0.5s ease",
              }}
            >
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
              <Tooltip title="See all reactions" placement="bottom" arrow>
                <IconButton>
                  <Typography variant="caption" color="text.primary" fontWeight={700}>
                    {data.article?.reactions?.length}
                  </Typography>
                </IconButton>
              </Tooltip>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Link href={`/articles/${data?.slug}/#comments`} passHref>
                  <IconButton>
                    <CommentIcon fontSize="small" />
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

export default PostCard;
