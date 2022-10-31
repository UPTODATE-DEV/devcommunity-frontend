import React from "react";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TagIcon from "@mui/icons-material/Tag";
import Tag from "./Tag";
import useStore from "@/hooks/useStore";

const TagsList = () => {
  const tags = useStore((state) => state.tags);

  return (
    <Box sx={{ pb: 4 }}>
      <Grid container spacing={2}>
        {tags.map((el, i) => (
          <Grid item xs={6} sm={3} md={4} key={i}>
            <Tag label={el.name} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TagsList;
