import { PostsListSkeleton } from "@/components/posts/Skeleton";
import useStore from "@/hooks/useStore";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { HomeFeedSkeleton } from "../middle/Skeleton";

const BookmarkCard = dynamic(import("@/components/bookmarks/BookmarkCard"), {
  ssr: false,
  loading: () => <PostsListSkeleton />,
});

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => <HomeFeedSkeleton />,
});

const BookmarkFeed = () => {
  const { locale } = useRouter();
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
