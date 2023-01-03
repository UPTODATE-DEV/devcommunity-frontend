import Bookmark from "@/components/common/Bookmark";
import PostCardHeader from "@/components/common/PostCardHeader";
import PostTags from "@/components/common/PostTags";
import Share from "@/components/common/Share";
import { useGoToUserProfile } from "@/hooks";
import useStore from "@/hooks/useStore";
import { parseDate } from "@/lib";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import React, { useCallback } from "react";
import QuestionReactions from "./QuestionReactions";

const Content = dynamic(import("@/components/common/Content"), { ssr: false });

const PostContent: React.FC<{ data: Post }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);

  const { author } = data;
  const goToProfile = useGoToUserProfile();

  const handleGoToProfile = useCallback(() => {
    goToProfile(author?.email);
  }, [author?.email]);

  return (
    <Paper variant="outlined" spacing={2} sx={{ p: 2 }} component={Stack}>
      <PostCardHeader
        handleClickGoToProfile={handleGoToProfile}
        date={parseDate({ date: data?.createdAt, type: "relative" })}
        author={author}
      />
      <Typography variant="h4" color="text.primary" sx={{ mb: "-8px" }} fontWeight={700} gutterBottom>
        {data?.title}
      </Typography>
      <Content content={data?.content} fontSize={17} />
      <PostTags tags={data?.tags} />
      {!data?.draft && (
        <>
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
            <Stack direction="row" spacing={1}>
              <Bookmark post={data} />
              <Share data={data} />
            </Stack>
          </Stack>
        </>
      )}
    </Paper>
  );
};

export default PostContent;
