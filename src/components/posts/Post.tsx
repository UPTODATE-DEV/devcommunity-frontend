import React from "react";
import Stack from "@mui/material/Stack";
import PostHeader from "@/components/posts/PostHeader";
import PostContent from "@/components/posts/PostContent";
import Divider from "@mui/material/Divider";
import dynamic from "next/dynamic";

const PostComment = dynamic(import("@/components/posts/PostComment"), { ssr: false, loading: () => null });

const Post: React.FC<{ data: Post }> = ({ data }) => {
  return (
    <Stack spacing={4}>
      <PostHeader data={data} />
      <PostContent title={data?.title} content={data?.content} />
      <Divider />
      <PostComment data={data} />
      <Divider />
    </Stack>
  );
};

export default Post;
