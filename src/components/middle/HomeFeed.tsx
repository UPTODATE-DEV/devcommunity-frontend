import { PostsListSkeleton } from "@/components/posts/Skeleton";
import { QuestionsListSkeleton } from "@/components/questions/Skeleton";
import useStore from "@/hooks/useStore";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import React from "react";
import { HomeFeedSkeleton } from "./Skeleton";

const ModalCreation = dynamic(import("@/components/common/ModalCreation"), {
  ssr: false,
  loading: () => <PostsListSkeleton />,
});
const PostCard = dynamic(import("@/components/posts/PostCard"), { ssr: false, loading: () => <PostsListSkeleton /> });
const QuestionCard = dynamic(import("@/components/questions/QuestionCard"), {
  ssr: false,
  loading: () => <QuestionsListSkeleton />,
});

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => <HomeFeedSkeleton />,
});

const HomeFeed = () => {
  const posts = useStore((state) => state.posts);
  const [open, setOpen] = React.useState(false);
  const session = useStore((state) => state.session?.user);

  const handleClose = () => setOpen(false);

  return (
    <Stack spacing={5} sx={{ py: 2, position: "relative", minHeight: "70vh" }}>
      {posts.length === 0 && <Empty />}
      <ModalCreation open={open} handleClose={handleClose} />

      {posts?.map((item, i) => (
        <React.Fragment key={item.id}>
          {item.type === "ARTICLE" ? <PostCard data={item} /> : <QuestionCard data={item} />}
          {posts.length !== i && <Divider />}
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
    </Stack>
  );
};

export default HomeFeed;
