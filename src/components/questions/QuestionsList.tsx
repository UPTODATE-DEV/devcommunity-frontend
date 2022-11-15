import QuestionCard from "@/components/questions/QuestionCard";
import useStore from "@/hooks/useStore";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { QuestionsListSkeleton } from "./Skeleton";

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => <QuestionsListSkeleton />,
});

const ModalCreation = dynamic(import("@/components/common/ModalCreation"), {
  ssr: false,
  loading: () => null,
});

const QuestionsList = () => {
  const posts = useStore((state) => state.posts).filter((el) => el.type === "QUESTION");
  const [open, setOpen] = React.useState(false);
  const session = useStore((state) => state.session?.user);

  const handleClose = () => setOpen(false);
  return (
    <Stack spacing={5}>
      <ModalCreation open={open} handleClose={handleClose} />
      {posts.length === 0 && <Empty />}

      {posts.map((item, i) => (
        <React.Fragment key={item.id}>
          <QuestionCard data={item} />
          {posts.filter((el) => el.type === "QUESTION").length !== i && <Divider />}
        </React.Fragment>
      ))}

      {session && (
        <Fab
          color="primary"
          onClick={() => setOpen(true)}
          aria-label="add"
          sx={{ position: "sticky", bottom: 20, alignSelf: "end" }}
        >
          <AddIcon />
        </Fab>
      )}

      {/* <Stack sx={{ display: "flex", width: 1, my: 6 }} alignItems="center">
        <CircularProgress />
      </Stack> */}
    </Stack>
  );
};

export default QuestionsList;
