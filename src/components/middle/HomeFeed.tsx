import useStore from "@/hooks/useStore";
import React from "react";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import Divider from "@mui/material/Divider";
import { PostsListSkeleton } from "@/components/posts/Skeleton";
import { QuestionsListSkeleton } from "@/components/questions/Skeleton";

const PostCard = dynamic(import("@/components/posts/PostCard"), { ssr: false, loading: () => <PostsListSkeleton /> });
const QuestionCard = dynamic(import("@/components/questions/QuestionCard"), {
  ssr: false,
  loading: () => <QuestionsListSkeleton />,
});

const HomeFeed = () => {
  const posts = useStore((state) => state.posts);
  return (
    <Stack spacing={5}>
      {posts.map((item, i) => (
        <React.Fragment key={item.id}>
          {item.type === "ARTICLE" ? <PostCard data={item} /> : <QuestionCard data={item} />}
          {posts.length !== i && <Divider />}
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default HomeFeed;
