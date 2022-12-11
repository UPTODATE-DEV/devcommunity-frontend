import { Stack, Typography } from "@mui/material";

const PostHeader = ({
  name = "",
  title = "",
  date = "",
  handleClickGoToPost,
  handleClickGoToProfile,
}: {
  name?: string;
  title?: string;
  date?: string;
  handleClickGoToProfile: () => void;
  handleClickGoToPost: () => void;
}) => {
  return (
    <Stack spacing={1} sx={{ mt: 1 }}>
      <Stack direction="row" spacing={1}>
        <Typography
          variant="caption"
          onClick={handleClickGoToProfile}
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
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary" gutterBottom fontWeight={700}>
          -
        </Typography>
        <Typography variant="caption" gutterBottom color="text.secondary">
          {date}
        </Typography>
      </Stack>
      <Typography
        gutterBottom
        fontWeight={700}
        color="text.primary"
        onClick={handleClickGoToPost}
        sx={{
          "&:hover": {
            color: "primary.main",
          },
          cursor: "pointer",
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default PostHeader;
