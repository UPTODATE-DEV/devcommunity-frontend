import useStore from "@/hooks/useStore";
import { shortenNumber } from "@/lib/shorterNumber";
import TagIcon from "@mui/icons-material/Tag";
import { Stack, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import * as React from "react";
import ResultsTitle from "./ResultsTitle";

const TagsResults = () => {
  const [count, setCount] = React.useState(10);
  const { setTagsFilters, tagsFilters, setShowTagsFilters } = useStore((state) => state);
  const [followedTags, setFollowedTags] = React.useState<Tags[] | []>([]);
  const { push } = useRouter();

  const handleTagClick = async (tag: string) => {
    setTagsFilters({ name: tag, id: "temp", _count: { posts: 0 } });
    setShowTagsFilters(true);
    push("/tags");
  };

  return (
    <Stack sx={{ py: 1 }} spacing={1}>
      <ResultsTitle title="Tags" count={5} />
      {count === 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          No results found
        </Typography>
      )}
      <Grid container spacing={1}>
        {Array.from(new Array(count)).map((el, i) => (
          <Grid item xs="auto" key={el?.tag?.name}>
            <Chip
              size="small"
              onClick={() => handleTagClick(el?.tag?.name)}
              icon={<TagIcon fontSize="small" />}
              // sx={{ px: 2 }}
              label={`${"Web Design"} (${shortenNumber(34)})`}
              // label={`${el?.tag?.name} (${shortenNumber(el?.tag?._count?.posts)})`}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default TagsResults;
