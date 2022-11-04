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
      <Grid container spacing={1}>
        {tags.map((el, i) => (
          <Grid item xs="auto" key={i}>
            <Tag label={el.name} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TagsList;
