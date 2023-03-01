import UserAvatar from "@/components/common/UserAvatar";
import { useGoToUserProfile } from "@/hooks/posts";
import useStore from "@/hooks/useStore";
import useUser from "@/hooks/useUser";
import { getUserFullName, getUserProfileImageUrl } from "@/lib";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useCallback } from "react";

interface Props {
  label: string;
  handleClick: () => void;
  icon: React.ReactElement;
}

const AddPost: React.FC<Props> = ({ label, icon, handleClick }) => {
  const session = useStore((state) => state.session?.user);
  const user = useUser(session?.id);

  const goToProfile = useGoToUserProfile();

  const handleGoToProfile = useCallback(() => {
    goToProfile(user);
  }, [user?.username]);

  return (
    <Paper
      onClick={handleClick}
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      variant="outlined"
      sx={{
        p: 2,
        position: "sticky",
        top: 90,
        zIndex: 999,
        "&:before": {
          width: "102%",
          height: 20,
          bgcolor: "background.default",
          content: "''",
          position: "absolute",
          top: "-21px",
        },
      }}
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
        <IconButton>{icon}</IconButton>
      </Stack>
    </Paper>
  );
};

export default AddPost;
