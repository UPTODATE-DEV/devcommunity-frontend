import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import CommentIcon from "@mui/icons-material/Comment";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

const PostComment = () => {
  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      <Typography variant="h6" color="text.primary">
        Comments (0)
      </Typography>
      <Grid container>
        <Grid item xs={12} md={1.2}>
          <Stack sx={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", position: "relative" }}>
            <Image src="/avatar.jpg" layout="fill" objectFit="cover" alt="Avatar" />
          </Stack>
        </Grid>
        <Grid item xs={12} md={10.8}>
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
              Live a comment...
            </Typography>
            <IconButton>
              <CommentIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default PostComment;
