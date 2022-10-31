import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import QuestionContent from "./QuestionContent";

const QuestionComment = dynamic(import("@/components/questions/QuestionComment"), { ssr: false, loading: () => null });

const Question: React.FC<{ data: Post }> = ({ data }) => {
  return (
    <Stack spacing={4}>
      <QuestionContent title={data?.title} content={data?.content} />
      <Divider />
      <QuestionComment data={data} />
      <Divider />
    </Stack>
  );
};

export default Question;
