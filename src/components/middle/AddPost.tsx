import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PostAddIcon from "@mui/icons-material/PostAdd";
import IconButton from "@mui/material/IconButton";

const AddPost = () => {
  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      <Grid container>
        <Grid item xs={12} md={1.2}>
          <Box sx={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", position: "relative" }}>
            <Image src="/avatar.jpg" layout="fill" objectFit="cover" alt="Avatar" />
          </Box>
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
              Click to start writing a post...
            </Typography>
            <IconButton>
              <PostAddIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AddPost;
