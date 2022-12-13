import { Stack, Typography } from "@mui/material";
import { getUserFullName, getUserProfileImageUrl } from "../../lib/posts";
import UserAvatar from "../common/UserAvatar";

const PostHeader = ({
  author,
  date = "",
  handleClickGoToProfile,
}: {
  author?: User;
  date?: string;
  handleClickGoToProfile: () => void;
}) => {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <UserAvatar
        name={getUserFullName(author)}
        pictureUrl={getUserProfileImageUrl(author)}
        handleClick={handleClickGoToProfile}
      />
      <Stack>
        <Typography
          variant="body2"
          onClick={handleClickGoToProfile}
          sx={{
            "&:hover": {
              color: "primary.main",
            },
            cursor: "pointer",
          }}
          color="text.primary"
          fontWeight={700}
        >
          {getUserFullName(author)}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ textTransform: "capitalize" }}>
          {date}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PostHeader;
