import useStore from "@/hooks/useStore";
import useUser from "@/hooks/useUser";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FILES_BASE_URL } from "config/url";
import { useRouter } from "next/router";
import React from "react";

const AddPost: React.FC = () => {
  const session = useStore((state) => state.session?.user);
  const user = useUser(session?.username);
  const { push } = useRouter();
  const handleGoToAddPage = () => {
    push("/articles/add");
  };

  return (
    <Stack
      onClick={handleGoToAddPage}
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ py: 2 }}
    >
      <Avatar
        sx={{ bgcolor: "primary.main", color: "white" }}
        alt={`${user?.firstName} ${user?.lastName}`}
        src={`${FILES_BASE_URL}${user?.profile?.avatar?.url}`}
      >
        {user?.firstName?.charAt(0)}
      </Avatar>
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
          Click to start writing an article...
        </Typography>
        <IconButton>
          <PostAddIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default AddPost;
