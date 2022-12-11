import { Chip, Grid } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";

const PostTags = ({ tags }: { tags?: Tags[] }) => {
  return (
    <Grid container spacing={1} sx={{ pb: 1 }} direction="row">
      {tags?.map((el) => (
        <Grid item xs="auto" key={el.tag.id}>
          <Chip size="small" icon={<TagIcon fontSize="small" />} sx={{ px: 2 }} label={el.tag.name} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostTags;
