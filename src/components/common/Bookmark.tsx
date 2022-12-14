import { patchRequest } from "@/lib/api";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

const Bookmark = ({ post, userId }: { post: Post; userId?: string }) => {
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
