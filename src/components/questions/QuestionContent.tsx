import Bookmark from "@/components/common/Bookmark";
import PostTags from "@/components/common/PostTags";
import useStore from "@/hooks/useStore";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import React from "react";
import QuestionReactions from "./QuestionReactions";

const Content = dynamic(import("@/components/common/Content"), { ssr: false });
const PostReaction = dynamic(import("@/components/posts/PostReaction"), { ssr: false });

const PostContent: React.FC<{ data: Post }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  return (
    <Paper variant="outlined" spacing={2} sx={{ p: 2 }} component={Stack}>
      <Typography variant="h4" color="text.primary" sx={{ mb: "-8px" }} fontWeight={700} gutterBottom>
        {data?.title}
      </Typography>
      <Content content={data?.content} fontSize={17} />
      <PostTags tags={data?.tags} />
      <Divider />
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 1 }}
      >
        <QuestionReactions post={data} />
        <Bookmark post={data} />
      </Stack>
    </Paper>
  );
};

export default PostContent;
