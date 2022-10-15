import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import QuestionCard from "@/components/questions/QuestionCard";
import useStore from "@/hooks/useStore";

const QuestionsList = () => {
  const posts = useStore((state) => state.posts);

  return (
    <Stack spacing={5}>
      {posts
        .filter((el) => el.type === "QUESTION")
        .map((item, i) => (
          <React.Fragment key={item.id}>
            <QuestionCard data={item} />
            {posts.filter((el) => el.type === "QUESTION").length !== i && <Divider />}
          </React.Fragment>
        ))}
      {/* <Stack sx={{ display: "flex", width: 1, my: 6 }} alignItems="center">
        <CircularProgress />
      </Stack> */}
    </Stack>
  );
};

export default QuestionsList;
