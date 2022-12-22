import PostCardHeader from "@/components/common/PostCardHeader";
import { useGoToUserProfile } from "@/hooks";
import useStore from "@/hooks/useStore";
import { parseDate } from "@/lib";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import React, { useCallback } from "react";

const Content = dynamic(import("@/components/common/Content"), { ssr: false });
const CommentReactions = dynamic(import("@/components/comments/CommentReactions"), { ssr: false });

const CommentContent: React.FC<{ data: PostComment }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  const [openReaction, setOpenReaction] = React.useState(false);

  const { author } = data;
  const goToProfile = useGoToUserProfile();

  const handleCloseReaction = () => {
    setOpenReaction(false);
  };

  const handleGoToProfile = useCallback(() => {
    goToProfile(author?.email);
  }, [author?.email]);

  return (
    <Paper variant="outlined" spacing={2} sx={{ p: 2 }} component={Stack} id="content">
      <PostCardHeader
        handleClickGoToProfile={handleGoToProfile}
        date={parseDate({ date: data?.createdAt, type: "relative" })}
        author={author}
      />
      <Content content={data?.content} fontSize={17} />
      <Divider />
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 1 }}
      >
        <CommentReactions comment={data} />
      </Stack>
    </Paper>
  );
};

export default CommentContent;
