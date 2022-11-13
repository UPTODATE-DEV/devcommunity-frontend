import RichTextEditor from "@/components/common/RichTextEditor";
import { CallToActionSkeleton } from "@/components/middle/Skeleton";
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

const CallToAction = dynamic(import("@/components/middle/CallToAction"), {
  ssr: false,
  loading: () => <CallToActionSkeleton />,
});

const QuestionComment: React.FC<{ data: Post }> = ({ data }) => {
  const sessionUser = useStore((state) => state.session?.user);
  const user = useUser(sessionUser?.email);
  const [showCommentForm, setShowCommentForm] = React.useState(false);
  const [comments, setComments] = React.useState<PostComment[] | []>([]);
  const [comment, setComment] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { push } = useRouter();

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

  const modules = React.useMemo(
    () => ({
      clipboard: {
        allowed: {
          tags: ["a", "b", "strong", "code", "blockquote", "u", "s", "i", "p", "br", "ul", "ol", "li", "span"],
          attributes: ["href", "rel", "target", "class"],
        },
        keepSelection: true,
        substituteBlockElements: true,
        magicPasteLinks: true,
      },
    }),
    []
  );

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
      setComments((state) => [...state, response.data]);
      handleCleanComment();
    }
  };

  React.useEffect(() => {
    document.querySelectorAll("pre, code").forEach((el: any) => {
      hljs.highlightElement(el);
    });
  }, [comments.length]);

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
          Comments ({comments.length})
        </Typography>
        {comments?.map((el) => (
          <React.Fragment key={el.id}>
            <Stack direction="row" spacing={2}>
              <IconButton onClick={() => push(`/profile/@${el?.author?.email.split("@")[0]}`)}>
                <Avatar
                  sx={{ bgcolor: "primary.main", color: "white" }}
                  alt={`${el?.author?.firstName} ${el?.author?.lastName}`}
                  src={FILES_BASE_URL + el?.author?.profile?.avatar?.url}
                >
                  {el?.author?.firstName.charAt(0)}
                </Avatar>
              </IconButton>
              <Stack sx={{ position: "relative", width: 1 }}>
                <Typography
                  onClick={() => push(`/profile/@${el?.author?.email.split("@")[0]}`)}
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                    cursor: "pointer",
                  }}
                  color="text.primary"
                  fontWeight={700}
                >
                  {el?.author?.firstName} {el?.author?.lastName}
                </Typography>
                {el.author.id === user?.id && (
                  <IconButton
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    onClick={() => handleDeleteComment(el.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
                <Typography
                  variant="body1"
                  color="text.secondary"
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: el.content,
                  }}
                />
              </Stack>
            </Stack>
            <Divider />
          </React.Fragment>
        ))}
        {showCommentForm ? (
          <>
            <RichTextEditor
              value={comment}
              controls={[
                ["bold", "italic", "underline", "link", "codeBlock"],
                ["unorderedList", "orderedList", "sup", "sub"],
              ]}
              // modules={modules}
              onChange={(value) => setComment(value)}
              stickyOffset={70}
              id="rte"
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" sx={{ px: 2 }} disableElevation onClick={() => setShowCommentForm(false)}>
                Cancel
              </Button>
              <Button variant="contained" sx={{ px: 2 }} disableElevation onClick={onSubmit}>
                Comment
              </Button>
            </Stack>
          </>
        ) : (
          <Grid container sx={{ py: 2 }}>
            <Grid item xs={12} md={1.2}>
              <Avatar
                sx={{ bgcolor: "primary.main", color: "white" }}
                alt={`${user?.firstName} ${user?.lastName}`}
                src={FILES_BASE_URL + user?.profile?.avatar?.url}
              >
                {user?.firstName.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={10.8}>
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
                  Live a comment...
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

export default QuestionComment;
