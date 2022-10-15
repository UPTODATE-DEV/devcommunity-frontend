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
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/fr";
import { FILES_BASE_URL } from "config/url";

const PostCard: React.FC<{ data: Post }> = ({ data }) => {
  const { push } = useRouter();

  const handleViewPost = () => {
    push(`/posts/${data?.slug}`);
  };

  return (
    <Grid container sx={{ cursor: "pointer" }}>
      <Grid item md={1.2}>
        <Avatar alt={`${data?.author?.firstName} ${data?.author?.lastName}`} src={data?.author?.avatar?.url}>
          {data?.author?.firstName.charAt(0)}
        </Avatar>
      </Grid>
      <Grid item md={10.8}>
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
        >
          <ReactMarkdown>{data?.content}</ReactMarkdown>
        </Typography>
        {data?.article.image && (
          <Stack
            sx={{ width: 1, height: 240, position: "relative", borderRadius: 2, overflow: "hidden", my: 2 }}
            onClick={handleViewPost}
          >
            <Image src={FILES_BASE_URL + data?.article?.image?.url} alt="Post" layout="fill" objectFit="cover" />
          </Stack>
        )}
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, px: 1, borderRadius: 52 }}
          >
            <Tooltip title="I like" placement="bottom" arrow>
              <IconButton>
                <ThumbUpSharpIcon color="info" fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="I support" placement="bottom" arrow>
              <IconButton>
                <VolunteerActivismSharpIcon color="secondary" fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="I love" placement="bottom" arrow>
              <IconButton>
                <FavoriteSharpIcon color="error" fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Instructive" placement="bottom" arrow>
              <IconButton>
                <LightbulbSharpIcon color="warning" fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="See all reactions" placement="bottom" arrow>
              <IconButton>
                <Typography variant="caption" color="text.primary" fontWeight={700}>
                  219
                </Typography>
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton>
                <CommentIcon />
              </IconButton>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                17
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 52 }}
            >
              <Tooltip title="Save post" placement="bottom" arrow>
                <IconButton>
                  <BookmarkAddSharpIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PostCard;
