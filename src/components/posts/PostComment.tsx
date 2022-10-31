import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import CommentIcon from "@mui/icons-material/Comment";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { Avatar, Button, Divider } from "@mui/material";
import { RichTextEditor, Editor } from "@mantine/rte";
import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/api";
import { toast } from "react-toastify";
import useStore from "@/hooks/useStore";
import DeleteIcon from "@mui/icons-material/Delete";

const initialValue = "<p>Type your <b>comment</b> here</p>";

const PostComment: React.FC<{ data: Post }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  const [showCommentForm, setShowCommentForm] = React.useState(false);
  const [comments, setComments] = React.useState<PostComment[] | []>([]);
  const [comment, setComment] = React.useState(initialValue);

  const handleCleanComment = () => {
    setComment(initialValue);
    setShowCommentForm(false);
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

  return (
    <Stack spacing={2} sx={{ py: 1 }}>
      <Typography variant="h6" color="text.primary">
        Comments ({comments.length})
      </Typography>
      {comments?.map((el) => (
        <React.Fragment key={el.id}>
          <Stack direction="row" spacing={2}>
            <Avatar alt={`${el?.author?.firstName} ${el?.author?.lastName}`} src={el?.author?.avatar?.url}>
              {el?.author?.firstName.charAt(0)}
            </Avatar>
            <Stack sx={{ position: "relative", width: 1 }}>
              <Typography color="text.primary" fontWeight={700}>
                {el?.author?.firstName} {el?.author?.lastName}
              </Typography>
              {el.author.id === user?.id && (
                <IconButton sx={{ position: "absolute", top: 0, right: 0 }} onClick={() => handleDeleteComment(el.id)}>
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
      {user &&
        (showCommentForm ? (
          <>
            <RichTextEditor
              value={comment}
              controls={[
                ["bold", "italic", "underline", "link", "code"],
                ["unorderedList", "orderedList", "sup", "sub"],
              ]}
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
              <Avatar alt={`${user?.firstName} ${user?.lastName}`} src={user?.avatar?.url}>
                {user?.firstName.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={10.8}>
              <Stack
                alignItems="center"
                direction="row"
                onClick={() => setShowCommentForm(true)}
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
        ))}
    </Stack>
  );
};

export default PostComment;
