import UserAvatar from "@/components/common/UserAvatar";
import { useGoToUserProfile } from "@/hooks/posts";
import useStore from "@/hooks/useStore";
import useUser from "@/hooks/useUser";
import { getUserFullName, getUserProfileImageUrl } from "@/lib";
import PostAddIcon from "@mui/icons-material/PostAdd";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useCallback } from "react";

interface Props {
  label: string;
  handleClick: () => void;
}

const AddPost: React.FC<Props> = ({ label, handleClick }) => {
  const session = useStore((state) => state.session?.user);
  const user = useUser(session?.username);

  const goToProfile = useGoToUserProfile();

  const handleGoToProfile = useCallback(() => {
    goToProfile(user?.email);
  }, [user?.email]);

  return (
    <Paper
      onClick={handleClick}
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      variant="outlined"
      sx={{ p: 2, position: "sticky", top: 70, zIndex: 999 }}
      component={Stack}
    >
      <UserAvatar
        name={getUserFullName(user)}
        pictureUrl={getUserProfileImageUrl(user)}
        handleClick={handleGoToProfile}
      />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{
          borderRadius: 10,
          bgcolor: "action.hover",
          width: 1,
          height: 40,
          px: 2,
          cursor: "pointer",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <IconButton>
          <PostAddIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default AddPost;
