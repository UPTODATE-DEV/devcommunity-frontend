import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";

const PostContent: React.FC<{ data: Post }> = ({ data }) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" color="text.primary" fontWeight={700} gutterBottom>
        {data?.title}
      </Typography>

      <Typography
        color="text.secondary"
        component="div"
        fontSize={16}
        className="content"
        gutterBottom
        sx={{ lineHeight: 1.65 }}
        dangerouslySetInnerHTML={{
          __html: data?.content,
        }}
      />
    </Stack>
  );
};

export default PostContent;
