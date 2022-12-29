import Comment from "@/components/comments/CommentCard";
import useStore from "@/hooks/useStore";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";

const CommentsList: React.FC<{ addComment: React.ReactElement }> = ({ addComment }) => {
  const { locale } = useRouter();

  const { comments } = useStore((state) => state);

  return (
    <Stack spacing={2} sx={{ py: 1 }}>
      <Typography variant="h6" color="text.primary">
        {locale === "en" ? "Comments" : "Commentaires"} ({comments.length})
      </Typography>

      {addComment}

      <Paper variant="outlined" sx={{ p: 2 }} component={Stack} spacing={2}>
        {comments?.map((el, i) => (
          <React.Fragment key={el.id}>
            <Comment data={el} />
            {i !== comments.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Paper>
    </Stack>
  );
};

export default CommentsList;
