import PostCard from "@/components/posts/PostCard";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import React from "react";

const PostsList = () => {
  const posts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  return (
    <Stack spacing={5}>
      {posts.map((item) => (
        <React.Fragment key={item.id}>
          <PostCard />
          {posts.length !== item.id && <Divider />}
        </React.Fragment>
      ))}
      <Stack sx={{ display: "flex", width: 1, my: 6 }} alignItems="center">
        <CircularProgress />
      </Stack>
    </Stack>
  );
};

export default PostsList;
