import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";

const QuestionContent: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" color="text.primary" fontWeight={700} gutterBottom>
        {title}
      </Typography>

      <Typography color="text.secondary" component="div" fontSize={18} gutterBottom sx={{ lineHeight: 1.7 }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </Typography>
    </Stack>
  );
};

export default QuestionContent;
