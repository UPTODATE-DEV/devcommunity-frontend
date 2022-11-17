import { TypographyStylesProvider } from "@mantine/core";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

const QuestionContent: React.FC<{ data: Post }> = ({ data }) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" color="text.primary" fontWeight={700} gutterBottom>
        {data?.title}
      </Typography>
      <TypographyStylesProvider>
        <Typography
          color="text.secondary"
          component="div"
          fontSize={17}
          className="content"
          gutterBottom
          sx={{ lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{
            __html: data?.content,
          }}
        />
      </TypographyStylesProvider>
    </Stack>
  );
};

export default QuestionContent;
