import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PostAddIcon from "@mui/icons-material/PostAdd";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import useStore from "@/hooks/useStore";

const AddQuestion: React.FC = () => {
  const user = useStore((state) => state.session?.user);
  const { push } = useRouter();
  const handleGoToAddPage = () => {
    push("/posts/add");
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
        src={user?.avatar?.url}
      >
        {user?.firstName.charAt(0)}
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
          Click to start asking a post...
        </Typography>
        <IconButton>
          <PostAddIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default AddQuestion;
