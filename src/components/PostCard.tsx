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

const PostCard = () => {
  return (
    <Grid container sx={{ cursor: "pointer" }}>
      <Grid item md={1.2}>
        <Avatar alt="Luccin Masirika" src="/avatar.jpg" />
      </Grid>
      <Grid item md={10.8}>
        <Stack direction="row" spacing={1}>
          <Typography variant="caption" color="text.primary" gutterBottom fontWeight={700}>
            Luccin Masirika
          </Typography>
          <Typography variant="caption" color="text.secondary" gutterBottom fontWeight={700}>
            -
          </Typography>
          <Typography variant="caption" gutterBottom color="text.secondary">
            4 days ago
          </Typography>
        </Stack>
        <Typography
          gutterBottom
          fontWeight={700}
          color="text.primary"
          sx={{
            display: "-webkit-box!important",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipse",
            whiteSpace: "normal",
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, laboriosam.
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ipsam omnis corrupti sapiente necessitatibus
          nostrum quod cumque earum totam obcaecati impedit tempora assumenda sint id repellendus, non cum dolorum enim!
        </Typography>
        <Stack sx={{ width: 1, height: 240, position: "relative", borderRadius: 2, overflow: "hidden", my: 2 }}>
          <Image src="/post.jpg" alt="Post" layout="fill" objectFit="cover" />
        </Stack>
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
          <Stack
            direction="row"
            alignItems="center"
            sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 52 }}
          >
            <Tooltip title="Add to my bookmarks" placement="bottom" arrow>
              <IconButton>
                <BookmarkAddSharpIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PostCard;
