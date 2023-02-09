import useStore from "@/hooks/useStore";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import { patchRequest } from "@/lib/api";
import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Bookmark = ({ post }: { post: Post }) => {
  const userId = useStore((state) => state.session?.user?.id);
  const [bookmarked, setBookmarked] = useState(false);
  const { setOpenLoginModal } = useStoreNoPersist();
  const { locale } = useRouter();

  const onAddToBookmarks = async () => {
    if (userId) {
      await patchRequest({ endpoint: `/posts/${post.id}/bookmarks/${userId}` });
      setBookmarked((state) => !state);
      return;
    }
    setOpenLoginModal(true);
  };

  useEffect(() => {
    if (userId) {
      const bookmark = post?.bookmarks?.find((bookmark) => {
        return bookmark?.userId === userId;
      });
      bookmark ? setBookmarked(true) : setBookmarked(false);
    }
  }, []);

  return (
    <Tooltip title={locale === "en" ? "Add to bookmarks" : "Ajouter aux favoris"} placement="bottom" arrow>
      <IconButton onClick={onAddToBookmarks}>
        {bookmarked ? (
          <BookmarkRemoveIcon color="secondary" fontSize="small" />
        ) : (
          <BookmarkAddSharpIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Bookmark;
