import SuggestionViewMore from "@/components/common/SuggestionViewMore";
import useStore from "@/hooks/useStore";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import React from "react";
import QuestionContent from "./QuestionContent";

const Suggestions = dynamic(import("@/components/common/Suggestions"), { ssr: false });
const CommentsList = dynamic(import("@/components/comments/CommentsList"), { ssr: false });
const AddComment = dynamic(import("@/components/comments/AddComment"), { ssr: false, loading: () => null });

const Question: React.FC<{ data: Post; comments: PostComment[] }> = ({ data, comments }) => {
  const { setCurrentPost } = useStore((state) => state);

  React.useEffect(() => {
    setCurrentPost(data);
  }, []);

  return (
    <Stack spacing={2}>
      <QuestionContent data={data} />
      <div id="comments"></div>
      <CommentsList addComment={<AddComment data={data} />} comments={comments} />
      <Suggestions data={data} type="QUESTION" />
      <SuggestionViewMore tags={data?.tags} />
    </Stack>
  );
};

export default Question;
