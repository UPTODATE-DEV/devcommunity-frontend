import useStore from "@/hooks/useStore";
import CloseIcon from "@mui/icons-material/CancelOutlined";
import TagIcon from "@mui/icons-material/Tag";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

const Filters = () => {
  const { setShowTagsFilters, tagsFilters, clearTagsFilters } = useStore((state) => state);
  const { locale } = useRouter();

  return (
    <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
      <Grid container spacing={1}>
        {tagsFilters.map((tag, i) => (
          <Grid item xs="auto" key={tag.id}>
            <Chip icon={<TagIcon fontSize="small" />} size="small" color="primary" label={tag.name} />
          </Grid>
        ))}
        <Grid item xs="auto">
          <Chip
            onClick={() => {
              clearTagsFilters();
              setShowTagsFilters(false);
            }}
            icon={<CloseIcon />}
            sx={{ px: 2, borderRadius: 50 }}
            size="small"
            color="error"
            label={locale === "en" ? "Close" : "Fermer"}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Filters;
