import CommentCard from "@/components/comments/CommentCard";
import CommentContent from "@/components/comments/CommentContent";
import PostCard from "@/components/posts/PostCard";
import QuestionCard from "@/components/questions/QuestionCard";
import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import React from "react";

const CommentsList = dynamic(import("@/components/comments/CommentsList"), { ssr: false });
const AddComment = dynamic(import("@/components/comments/AddComment"), { ssr: false });

const ParentsComment = ({ comments }: { comments: PostComment[] }) => {
  if (!comments.length) return null;
  return (
    <>
      {comments.map((el, i) => (
        <Stack
          key={el.id}
          id={i === comments.length - 1 ? "target" : `id-${i}`}
          sx={{
            pl: 2.5,
            position: "relative",
            "&:before": {
              position: "absolute",
              top: 38,
              left: 5,
              content: "''",
              width: 13,
              height: i !== comments.length - 1 ? "108%" : 0.89,
              zIndex: 0,
              borderLeft: (theme) => `2px solid ${theme.palette.divider}`,
              borderTop: (theme) => `2px solid ${theme.palette.divider}`,
            },
          }}
        >
          <Paper variant="outlined" sx={{ p: 2 }}>
            <CommentCard data={el} />
          </Paper>
        </Stack>
      ))}
    </>
  );
};

const Comment: React.FC<{ comment: PostComment }> = ({ comment }) => {
  const { currentPost } = useStore((state) => state);
  const [parents, setParents] = React.useState<PostComment[]>([]);

  async function getAllParents() {
    const response = await getRequest({ endpoint: `/comments/${comment.id}/parents` });
    if (response.error) null;
    setParents(response.data);
  }

  React.useEffect(() => {
    getAllParents();
    const el = document.getElementById("target");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [comment.id]);

  return (
    <Stack spacing={2}>
      <Stack
        sx={{
          pl: 2.5,
          position: "relative",
          "&:after": {
            position: "absolute",
            top: 38,
            left: 5,
            content: "''",
            width: 13,
            height: comment.parentComment ? "106%" : 0.92,
            borderTopLeftRadius: 15,
            zIndex: 0,
            borderLeft: (theme) => `2px solid ${theme.palette.divider}`,
            borderTop: (theme) => `2px solid ${theme.palette.divider}`,
          },
        }}
      >
        {currentPost &&
          (currentPost?.type === "ARTICLE" ? <PostCard data={currentPost} /> : <QuestionCard data={currentPost} />)}
      </Stack>
      <ParentsComment comments={parents} />
      <CommentContent data={comment} />
      <CommentsList addComment={<AddComment data={comment} />} />
    </Stack>
  );
};

export default Comment;
