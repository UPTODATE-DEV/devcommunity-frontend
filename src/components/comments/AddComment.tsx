import AddPost from "@/components/common/AddPost";
import RichTextEditor from "@/components/common/RichTextEditor";
import useSocket from "@/hooks/useSocket";
import useStore from "@/hooks/useStore";
import useUser from "@/hooks/useUser";
import { postRequest } from "@/lib/api";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { toast } from "react-toastify";

const AddComment: React.FC<{ data: Post | PostComment }> = ({ data }) => {
  const session = useStore((state) => state.session?.user);
  const user = useUser(session?.username);
  const { currentComment, currentPost, comments, setComments } = useStore((state) => state);
  const [showCommentForm, setShowCommentForm] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { push, locale, pathname } = useRouter();
  const socket = useSocket();

  const handleCleanComment = () => {
    setComment("");
    setShowCommentForm(false);
  };

  const handleShowComment = useCallback(() => {
    if (session?.id) {
      setShowCommentForm(true);
    } else {
      setOpen(true);
    }
  }, []);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const response = await postRequest({
      endpoint: "/comments",
      data: {
        content: comment,
        author: user?.id,
        post: currentPost?.id,
        parentComment: currentComment?.id,
        depth: currentComment?.depth !== undefined ? +currentComment?.depth + 1 : 0,
      },
    });
    if (response.error) {
      toast.error(response.error?.message);
    }
    if (response.data) {
      socket.emit("notification", {
        notificationFromUser: user,
        id: Date.now().toString(),
        post: data,
        type: "COMMENT",
      });
      setComments([response.data, ...comments]);
      handleCleanComment();
    }
  };

  if (!showCommentForm) {
    return (
      <AddPost
        label={locale === "en" ? "Leave a comment" : "Laisser un commentaire"}
        handleClick={handleShowComment}
        icon={<InsertCommentIcon />}
      />
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        position: "sticky",
        top: 75,
        zIndex: 999,
      }}
      component={Stack}
      spacing={2}
    >
      <RichTextEditor
        value={comment}
        controls={[
          ["h2", "h3", "bold", "italic", "underline", "link", "codeBlock"],
          ["unorderedList", "orderedList", "sup", "sub", "code"],
        ]}
        onChange={(value) => setComment(value)}
        stickyOffset={70}
        id="rte"
      />
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" sx={{ px: 2 }} disableElevation onClick={() => setShowCommentForm(false)}>
          {locale === "en" ? "Cancel" : "Annuler"}
        </Button>
        <Button variant="contained" sx={{ px: 2 }} disableElevation onClick={onSubmit}>
          {locale === "en" ? "Comment" : "Commenter"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default AddComment;
