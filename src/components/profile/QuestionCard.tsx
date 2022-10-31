import useStore from "@/hooks/useStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import React from "react";
dayjs.extend(relativeTime);

const QuestionCard: React.FC<{ data: Post; handleDeletePost: (id: string) => void }> = ({ data, handleDeletePost }) => {
  const { push } = useRouter();

  const handleViewQuestion = () => {
    push(`/posts/${data.slug}`);
  };

  return (
    <Grid container sx={{ cursor: "pointer" }}>
      <Grid item xs={2} md={1.2}>
        <Avatar alt={`${data?.author?.firstName} ${data?.author?.lastName}`} src={data?.author?.avatar?.url}>
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
            display: "-webkit-box!important",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipse",
            whiteSpace: "normal",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {data?.title}
        </Typography>
        <Typography
          gutterBottom
          color="text.secondary"
          fontSize={14}
          sx={{
            display: "-webkit-box!important",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipse",
            whiteSpace: "normal",
          }}
          component="div"
          dangerouslySetInnerHTML={{
            __html: data?.content,
          }}
        />

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
      </Grid>
    </Grid>
  );
};

export default QuestionCard;
