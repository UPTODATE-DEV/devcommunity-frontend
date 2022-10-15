import PostCard from "@/components/posts/PostCard";
import useStore from "@/hooks/useStore";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import React from "react";

const PostsList = () => {
  const posts = useStore((state) => state.posts);

  return (
    <Stack spacing={5}>
      {posts
        .filter((el) => el.type === "ARTICLE")
        .map((item, i) => (
          <React.Fragment key={item.id}>
            <PostCard data={item} />
            {posts.filter((el) => el.type === "ARTICLE").length !== i && <Divider />}
          </React.Fragment>
        ))}
      {/* <Stack sx={{ display: "flex", width: 1, my: 6 }} alignItems="center">
        <CircularProgress />
      </Stack> */}
    </Stack>
  );
};

export default PostsList;
