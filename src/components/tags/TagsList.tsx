import useStore from "@/hooks/useStore";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
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
        <Paper variant="outlined" sx={{ py: 4, px: 2, minHeight: "80vh" }}>
          <Grid container spacing={1}>
            {tags.map((el, i) => (
              <Grid item xs="auto" key={i} onClick={() => setTagsFilters(el)}>
                <Tag label={el.name} selected={isIncluded(el)} count={el?._count.posts} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default TagsList;
