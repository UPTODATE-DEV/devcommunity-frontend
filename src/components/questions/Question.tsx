import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import QuestionComment from "./QuestionComment";
import QuestionContent from "./QuestionContent";

const Question: React.FC<{ data: Post }> = ({ data }) => {
  return (
    <Stack spacing={4}>
      <QuestionContent title={data?.title} content={data?.content} />
      <Divider />
      <QuestionComment />
      <Divider />
    </Stack>
  );
};

export default Question;
