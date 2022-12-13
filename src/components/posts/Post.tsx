import React from "react";
import Stack from "@mui/material/Stack";
import PostHeader from "@/components/posts/PostHeader";
import PostContent from "@/components/posts/PostContent";
import Divider from "@mui/material/Divider";
import dynamic from "next/dynamic";
import hljs from "highlight.js";
import useStore from "@/hooks/useStore";

const PostComment = dynamic(import("@/components/posts/PostComment"), { ssr: false, loading: () => null });
const PostReactions = dynamic(import("@/components/posts/PostReactions"), { ssr: false, loading: () => null });
const PostSuggestions = dynamic(import("@/components/posts/PostSuggestions"), { ssr: false, loading: () => null });

const Post: React.FC<{ data: Post }> = ({ data }) => {
  const { setCurrentPost } = useStore((state) => state);

  React.useEffect(() => {
    setCurrentPost(data);
  }, []);

  React.useEffect(() => {
    document.querySelectorAll("pre").forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  return (
    <Stack spacing={2}>
      <PostHeader data={data} />
      <PostContent data={data} />
      <Divider />
      <PostReactions />
      {/* <Divider /> */}
      <PostSuggestions data={data} />
      <div id="comments"></div>
      <PostComment data={data} />
      <Divider />
    </Stack>
  );
};

export default Post;
