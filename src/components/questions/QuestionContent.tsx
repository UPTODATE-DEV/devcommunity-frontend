import { TypographyStylesProvider } from "@mantine/core";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import TagIcon from "@mui/icons-material/Tag";

const QuestionContent: React.FC<{ data: Post }> = ({ data }) => {
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

      <Grid container spacing={1} sx={{ pb: 1 }} direction="row">
        {data?.tags?.map((el) => (
          <Grid item xs="auto" key={el.tag.id}>
            <Chip size="small" icon={<TagIcon fontSize="small" />} sx={{ px: 2 }} label={el.tag.name} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default QuestionContent;
