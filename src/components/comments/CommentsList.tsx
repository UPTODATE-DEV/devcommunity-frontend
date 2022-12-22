import Comment from "@/components/comments/CommentCard";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";
import useStore from "../../hooks/useStore";

const CommentsList: React.FC<{ addComment: React.ReactElement }> = ({ addComment }) => {
  const { locale } = useRouter();

  const { comments } = useStore((state) => state);

  return (
    <Stack spacing={2} sx={{ py: 1 }}>
      <Typography variant="h6" color="text.primary">
        {locale === "en" ? "Comments" : "Commentaires"} ({comments.length})
      </Typography>

      {addComment}

      {comments?.map((el, i) => (
        <React.Fragment key={el.id}>
          <Comment data={el} />
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default CommentsList;
