import RichTextEditor from "@/components/common/RichTextEditor";
import { CallToActionSkeleton } from "@/components/middle/Skeleton";
import useSocket from "@/hooks/useSocket";
import useStore from "@/hooks/useStore";
import useUser from "@/hooks/useUser";
import { deleteRequest, getRequest, postRequest } from "@/lib/api";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Button, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FILES_BASE_URL } from "config/url";
import hljs from "highlight.js";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import Comment from "@/components/common/Comment";

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});

const PostComment: React.FC<{ data: Post }> = ({ data }) => {
  const session = useStore((state) => state.session?.user);
  const user = useUser(session?.username);
  const [showCommentForm, setShowCommentForm] = React.useState(false);
  const [comments, setComments] = React.useState<PostComment[] | []>([]);
  const [comment, setComment] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { push, locale } = useRouter();
  const socket = useSocket();

  const handleClose = () => {
    setOpen(false);
  };

  const handleCleanComment = () => {
    setComment("");
    setShowCommentForm(false);
  };

  const handleShowComment = () => {
    if (user?.id) {
      setShowCommentForm(true);
    } else {
      setOpen(true);
    }
  };

  const handleDeleteComment = async (id: string) => {
    const response = await deleteRequest({ endpoint: `/comments/${id}` });
    if (response.error) {
      toast.error(response.error?.message);
    }
    if (response.data) {
      setComments((state) => state.filter((el) => el.id !== id));
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const response = await postRequest({
      endpoint: "/comments",
      data: { content: comment, author: user?.id, post: data.id },
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
      setComments((state) => [...state, response.data]);
      handleCleanComment();
    }
  };

  React.useEffect(() => {
    async function getComment() {
      const res = await getRequest({ endpoint: `/comments/${data.id}/post-comments` });
      if (res.error) {
        console.log(res.error);
      }
      setComments(res.data);
    }
    getComment();
  }, []);

  React.useEffect(() => {
    document.querySelectorAll("pre, code").forEach((el: any) => {
      hljs.highlightElement(el);
    });
  }, [comments.length]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <CallToAction />
      </Dialog>
      <Stack spacing={2} sx={{ py: 1 }}>
        <Typography variant="h6" color="text.primary">
          {locale === "en" ? "Comments" : "Commentaires"} ({comments.length})
        </Typography>
        {comments?.map((el) => (
          <React.Fragment key={el.id}>
            <Comment data={el as unknown as Post} />
            <Divider />
          </React.Fragment>
        ))}
        {showCommentForm ? (
          <>
            <RichTextEditor
              value={comment}
              controls={[
                ["bold", "italic", "underline", "link", "codeBlock"],
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
          </>
        ) : (
          <Grid container sx={{ py: 2 }} justifyContent="center" alignItems="center">
            <Grid item xs={2} sm={1} md={2} lg={1.2}>
              <Avatar
                sx={{ bgcolor: "primary.main", color: "white" }}
                alt={`${user?.firstName} ${user?.lastName}`}
                src={FILES_BASE_URL + user?.profile?.avatar?.url}
              >
                {user?.firstName?.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs={10} sm={11} md={10} lg={10.8}>
              <Stack
                alignItems="center"
                direction="row"
                onClick={handleShowComment}
                justifyContent="space-between"
                sx={{
                  borderRadius: 10,
                  bgcolor: "action.hover",
                  width: 1,
                  height: 40,
                  px: 2,
                  cursor: "pointer",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {locale === "en" ? "Leave a comment" : "Laisser un commentaire"}
                </Typography>
                <IconButton>
                  <CommentIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Stack>
    </>
  );
};

export default PostComment;
