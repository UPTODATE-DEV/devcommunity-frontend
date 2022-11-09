import React from "react";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/CancelRounded";
import TagIcon from "@mui/icons-material/Tag";
import FilterIcon from "@mui/icons-material/Filter1Sharp";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import useStore from "@/hooks/useStore";
import Grid from "@mui/material/Grid";

const Filters = () => {
  const { setShowTagsFilters, tagsFilters, clearTagsFilters } = useStore((state) => state);

  return (
    <Stack spacing={2} justifyContent="flex-end">
      <Button
        onClick={() => {
          clearTagsFilters();
          setShowTagsFilters(false);
        }}
        sx={{ px: 2 }}
        size="small"
        variant="contained"
        disableElevation
        startIcon={<CancelIcon />}
      >
        Clear Filters
      </Button>
      <Grid container spacing={1}>
        {tagsFilters.map((tag, i) => (
          <Grid item xs="auto" key={tag.id}>
            <Chip icon={<TagIcon fontSize="small" />} size="small" color="secondary" label={tag.name} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Filters;
