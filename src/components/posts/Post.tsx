import React from "react";
import Stack from "@mui/material/Stack";
import PostHeader from "@/components/posts/PostHeader";
import PostContent from "@/components/posts/PostContent";
import PostComment from "./PostComment";
import Divider from "@mui/material/Divider";

const Post: React.FC<{ data: Post }> = ({ data }) => {
  return (
    <Stack spacing={4}>
      <PostHeader data={data} />
      <PostContent title={data?.title} content={data?.content} />
      <Divider />
      <PostComment />
      <Divider />
    </Stack>
  );
};

export default Post;
