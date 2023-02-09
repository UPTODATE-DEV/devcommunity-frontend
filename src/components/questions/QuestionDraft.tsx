import SuggestionViewMore from "@/components/common/SuggestionViewMore";
import useStore from "@/hooks/useStore";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import React from "react";
import QuestionContent from "./QuestionContent";

const Suggestions = dynamic(import("@/components/common/Suggestions"), { ssr: false });

const QuestionDraft: React.FC<{ data: Post }> = ({ data }) => {
  const { setCurrentPost } = useStore((state) => state);

  React.useEffect(() => {
    setCurrentPost(data);
  }, []);

  return (
    <Stack spacing={2}>
      <QuestionContent data={data} />
      <Suggestions data={data} type="QUESTION" />
      <SuggestionViewMore tags={data?.tags} />
    </Stack>
  );
};

export default QuestionDraft;
