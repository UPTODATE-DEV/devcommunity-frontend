import TagIcon from "@mui/icons-material/Tag";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

const PostTags = ({ tags }: { tags?: Tags[] }) => {
  return (
    <>
      <Grid container spacing={1} sx={{ py: 1 }} direction="row">
        {tags?.map((el) => (
          <Grid item xs="auto" key={el.tag.name}>
            <Chip size="small" icon={<TagIcon fontSize="small" />} sx={{ px: 2 }} label={el.tag.name} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PostTags;
