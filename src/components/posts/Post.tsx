import SuggestionViewMore from "@/components/common/SuggestionViewMore";
import PostContent from "@/components/posts/PostContent";
import PostHeader from "@/components/posts/PostHeader";
import useStore from "@/hooks/useStore";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import React from "react";

const AddComment = dynamic(import("@/components/common/AddComment"), { ssr: false });
const Suggestions = dynamic(import("@/components/common/Suggestions"), { ssr: false });

const Post: React.FC<{ data: Post }> = ({ data }) => {
  const { setCurrentPost } = useStore((state) => state);

  React.useEffect(() => {
    setCurrentPost(data);
  }, []);

  return (
    <Stack spacing={2}>
      <PostHeader data={data} />
      <PostContent data={data} />
      <div id="comments"></div>
      <AddComment data={data} />
      <Suggestions data={data} type="ARTICLE" />
      <SuggestionViewMore tags={data?.tags} />
    </Stack>
  );
};

export default Post;
