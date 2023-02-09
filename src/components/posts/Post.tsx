import SuggestionViewMore from "@/components/common/SuggestionViewMore";
import PostContent from "@/components/posts/PostContent";
import PostHeader from "@/components/posts/PostHeader";
import useStore from "@/hooks/useStore";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import React from "react";

const CommentsList = dynamic(import("@/components/comments/CommentsList"), { ssr: false });
const Suggestions = dynamic(import("@/components/common/Suggestions"), { ssr: false });
const AddComment = dynamic(import("@/components/comments/AddComment"), { ssr: false });

const Post: React.FC<{ data: Post; comments: PostComment[] }> = ({ data, comments }) => {
  const { setCurrentPost } = useStore((state) => state);

  React.useEffect(() => {
    setCurrentPost(data);
  }, []);

  return (
    <Stack spacing={2}>
      <PostHeader data={data} />
      <PostContent data={data} />
      <div id="comments"></div>
      <CommentsList addComment={<AddComment data={data} />} />
      <Suggestions data={data} type="ARTICLE" />
      <SuggestionViewMore tags={data?.tags} />
    </Stack>
  );
};

export default Post;
