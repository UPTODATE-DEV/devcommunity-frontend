import useStore from "@/hooks/useStore";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";
import { HomeFeedSkeleton } from "../middle/Skeleton";
import Tag from "./Tag";

const HomeFeed = dynamic(import("@/components/middle/HomeFeed"), {
  ssr: false,
  loading: () => <HomeFeedSkeleton />,
});

const TagsList = () => {
  const { setTagsFilters, tagsFilters, tags, showTagsFilters } = useStore((state) => state);
  const isIncluded = (el: Tag) => tagsFilters.some((selected) => selected.id === el.id);

  return (
    <>
      {showTagsFilters ? (
        <HomeFeed />
      ) : (
        <Box sx={{ pb: 4 }}>
          <Grid container spacing={1}>
            {tags.map((el, i) => (
              <Grid item xs="auto" key={i} onClick={() => setTagsFilters(el)}>
                <Tag label={el.name} selected={isIncluded(el)} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default TagsList;
