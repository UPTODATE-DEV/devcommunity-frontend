import useStore from "@/hooks/useStore";
import React from "react";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import Divider from "@mui/material/Divider";
import { PostsListSkeleton } from "@/components/posts/Skeleton";
import { QuestionsListSkeleton } from "@/components/questions/Skeleton";
import Typography from "@mui/material/Typography";
import { HomeFeedSkeleton } from "../middle/Skeleton";
import { useRouter } from "next/router";

const BookmarkCard = dynamic(import("@/components/bookmarks/BookmarkCard"), {
  ssr: false,
  loading: () => <PostsListSkeleton />,
});
const QuestionCard = dynamic(import("@/components/questions/QuestionCard"), {
  ssr: false,
  loading: () => <QuestionsListSkeleton />,
});

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => <HomeFeedSkeleton />,
});

const BookmarkFeed = () => {
  const { push, locale } = useRouter();
  const bookmarks = useStore((state) => state.bookmarks);
  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      <Typography variant="h6" color="text.primary">
        {locale === "en" ? "My bookmarks" : "Mes favoris"}
      </Typography>
      <Divider variant="inset" />
      {bookmarks.length === 0 && <Empty />}
      {bookmarks?.map((item, i) => (
        <Stack spacing={5} key={item.id}>
          <BookmarkCard data={item.post} />
          {bookmarks.length !== i && <Divider />}
        </Stack>
      ))}
    </Stack>
  );
};

export default BookmarkFeed;
