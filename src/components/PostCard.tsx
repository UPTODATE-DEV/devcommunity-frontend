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
            <IconButton>
              <ThumbUpSharpIcon color="info" fontSize="small" />
            </IconButton>
            <IconButton>
              <VolunteerActivismSharpIcon color="secondary" fontSize="small" />
            </IconButton>
            <IconButton>
              <FavoriteSharpIcon color="error" fontSize="small" />
            </IconButton>
            <IconButton>
              <LightbulbSharpIcon color="warning" fontSize="small" />
            </IconButton>
            <IconButton>
              <Typography variant="caption" color="text.primary" fontWeight={700}>
                219
              </Typography>
            </IconButton>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 52 }}
          >
            <IconButton>
              <BookmarkAddSharpIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PostCard;
