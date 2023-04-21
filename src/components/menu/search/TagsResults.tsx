import useStore from "@/hooks/useStore";
import { shortenNumber } from "@/lib/shorterNumber";
import TagIcon from "@mui/icons-material/Tag";
import { Stack, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import * as React from "react";
import useStoreNoPersist from "../../../hooks/useStoreNoPersist";
import { getRequest } from "../../../lib";
import ResultsTitle from "./ResultsTitle";

const TagsResults = ({ query }: { query: string }) => {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const { setLoading } = useStoreNoPersist((state) => state);
  const { setTagsFilters, setShowTagsFilters } = useStore((state) => state);
  const { push } = useRouter();

  const count = tags.length;

  React.useEffect(() => {
    const getTags = async () => {
      setLoading(true);
      const tags = await getRequest({ endpoint: `/tags?name=${query}` });
      if (!tags.error) {
        setTags(tags.data);
        setLoading(false);
      }
      setLoading(false);
    };

    if (query) {
      getTags();
    }
  }, [query]);

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
        {tags.map((el, i) => (
          <Grid item xs="auto" key={el?.name}>
            <Chip
              size="small"
              onClick={() => handleTagClick(el?.name)}
              icon={<TagIcon fontSize="small" />}
              label={`${el?.name} (${shortenNumber(el?._count?.posts)})`}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default TagsResults;
