import useStore from "@/hooks/useStore";
import { getRequest, patchRequest } from "@/lib";
import PlaylistAddCheckTwoToneIcon from "@mui/icons-material/PlaylistAddCheckTwoTone";
import PlaylistAddTwoToneIcon from "@mui/icons-material/PlaylistAddTwoTone";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import React from "react";
import { HomeFeedSkeleton } from "../middle/Skeleton";
import Tag from "./Tag";

const FilterByTagsResult = dynamic(import("./FilterByTagsResult"), {
  ssr: false,
  loading: () => <HomeFeedSkeleton />,
});

const TagsList = () => {
  const userId = useStore((state) => state.session?.user?.id);
  const { setTagsFilters, tagsFilters, tags, showTagsFilters } = useStore((state) => state);
  const isIncluded = (el: Tag) => tagsFilters.some((selected) => selected.id === el.id);
  const [followedTags, setFollowedTags] = React.useState<Tags[] | []>([]);

  const handleTagClick = async (tag: string) => {
    await patchRequest({ endpoint: `/tags/follow/${tag}/${userId}` });
    if (followedTags.some((el) => el.tag.name === tag)) {
      setFollowedTags(followedTags.filter((el) => el.tag.name !== tag));
    } else {
      setFollowedTags((prev) => [...prev, { tag: { name: tag, id: "temp", _count: { posts: 0 } } }]);
    }
  };

  React.useEffect(() => {
    const getFollowedTags = async () => {
      const responses = await getRequest({ endpoint: `/tags/followed/${userId}` });
      setFollowedTags(responses.data);
    };
    getFollowedTags();
  }, []);

  return (
    <>
      {showTagsFilters ? (
        <FilterByTagsResult />
      ) : (
        <Paper variant="outlined" sx={{ py: 4, px: 2, minHeight: "80vh" }}>
          <Grid container spacing={1}>
            {tags.map((el, i) => (
              <Grid item xs="auto" key={i}>
                <Stack direction="row" alignItems="center">
                  <div onClick={() => setTagsFilters(el)}>
                    <Tag label={el.name} selected={isIncluded(el)} count={el?._count.posts} />
                  </div>
                  <IconButton size="small" onClick={() => handleTagClick(el.name)}>
                    {followedTags.some((follow) => follow.tag.name === el.name) ? (
                      <PlaylistAddCheckTwoToneIcon fontSize="small" color="success" />
                    ) : (
                      <PlaylistAddTwoToneIcon fontSize="small" />
                    )}
                  </IconButton>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default TagsList;
