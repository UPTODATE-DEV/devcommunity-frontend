import useStore from "@/hooks/useStore";
import Paper from "@mui/material/Paper";
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
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={4}>
        <QuestionContent data={data} />
        <Divider />
        <QuestionReactions />
        <div id="comments"></div>
        <QuestionComment data={data} />
        <QuestionSuggestions data={data} />
      </Stack>
    </Paper>
  );
};

export default Question;
