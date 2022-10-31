import useStore from "@/hooks/useStore";
import { patchRequest } from "@/lib/api";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import Avatar from "@mui/material/Avatar";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import React from "react";
dayjs.extend(relativeTime);

const BookmarkCard: React.FC<{ data: Post }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  const { setBookmarks, bookmarks } = useStore((state) => state);
  const { push } = useRouter();

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

  return (
    <Grid container>
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
          onClick={handleViewPost}
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
            cursor: "pointer",
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
            WebkitLineClamp: 2,
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
        <Stack
          direction="row"
          flexWrap="wrap"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 1 }}
        >
          <Fab variant="extended" size="small" color="primary" sx={{ px: 2 }} onClick={onRemoveFromBookmarks}>
            <BookmarkRemoveIcon sx={{ mr: 1 }} />
            Remove
          </Fab>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default BookmarkCard;
