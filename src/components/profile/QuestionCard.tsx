import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import hljs from "highlight.js";
import { useRouter } from "next/router";
import React from "react";
dayjs.extend(relativeTime);

const QuestionCard: React.FC<{ data: Post; handleDeletePost: (id: string) => void }> = ({ data, handleDeletePost }) => {
  const { push, asPath } = useRouter();
  const email = asPath.split("/profile/")[1];

  const handleViewQuestion = () => {
    push(`/posts/${data.slug}`);
  };

  React.useEffect(() => {
    document.querySelectorAll("pre").forEach((el) => {
      hljs.highlightElement(el);
    });
  }, []);

  return (
    <Grid container sx={{ cursor: "pointer" }}>
      <Grid item xs={2} md={1.2}>
        <Avatar
          sx={{ bgcolor: "primary.main", color: "white" }}
          alt={`${data?.author?.firstName} ${data?.author?.lastName}`}
          src={process.env.NEXT_PUBLIC_FILES_BASE_URL + data?.author?.profile?.avatar?.url}
        >
          {data?.author?.firstName.charAt(0)}
        </Avatar>
      </Grid>
      <Grid item xs={10} md={10.8}>
        <Stack direction="row" spacing={1}>
          <Typography variant="caption" color="text.primary" gutterBottom fontWeight={700}>
            {data?.author?.firstName} {data?.author?.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary" gutterBottom fontWeight={700}>
            -
          </Typography>
          <Typography variant="caption" gutterBottom color="text.secondary">
            {dayjs(data?.publishedOn).fromNow()}
          </Typography>
        </Stack>
        <Typography
          gutterBottom
          fontWeight={700}
          color="text.primary"
          onClick={handleViewQuestion}
          sx={{
            "&:hover": {
              color: "primary.main",
            },
            cursor: "pointer",
          }}
        >
          {data?.title.substring(0, 120)}
        </Typography>
        <Typography
          color="text.secondary"
          component="div"
          className="content"
          gutterBottom
          dangerouslySetInnerHTML={{
            __html: `${data?.content.substring(0, 120)}...`,
          }}
        />

        {!email && (
          <Stack
            direction="row"
            flexWrap="wrap"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 1 }}
          >
            <Button
              size="small"
              variant="outlined"
              color="error"
              sx={{ px: 2 }}
              onClick={() => handleDeletePost(data?.id)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default QuestionCard;
