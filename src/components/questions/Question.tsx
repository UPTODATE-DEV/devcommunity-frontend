import useStore from "@/hooks/useStore";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import hljs from "highlight.js";
import dynamic from "next/dynamic";
import React from "react";
import QuestionContent from "./QuestionContent";

const QuestionSuggestions = dynamic(import("@/components/questions/QuestionSuggestions"), {
  ssr: false,
  loading: () => null,
});
const QuestionComment = dynamic(import("@/components/questions/QuestionComment"), { ssr: false, loading: () => null });
const QuestionReactions = dynamic(import("@/components/questions/QuestionReactions"), {
  ssr: false,
  loading: () => null,
});

const Question: React.FC<{ data: Post }> = ({ data }) => {
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
    <Stack spacing={4}>
      <QuestionContent data={data} />
      <Divider />
      <QuestionReactions />
      <QuestionSuggestions data={data} />
      <div id="comments"></div>
      <QuestionComment data={data} />
      <Divider />
    </Stack>
  );
};

export default Question;
