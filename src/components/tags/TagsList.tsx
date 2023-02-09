import useStore from "@/hooks/useStore";
import { getRequest, patchRequest } from "@/lib";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlaylistAddTwoToneIcon from "@mui/icons-material/PlaylistAddTwoTone";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import React from "react";
import useStoreNoPersist from "../../hooks/useStoreNoPersist";
import Empty from "../common/Empty";
import { HomeFeedSkeleton } from "../middle/Skeleton";
import Tag from "./Tag";

const FilterByTagsResult = dynamic(import("./FilterByTagsResult"), {
  ssr: false,
  loading: () => <HomeFeedSkeleton />,
});

const TagsList = ({ userId, tags }: { userId?: string; tags: Tag[] }) => {
  const { setTagsFilters, tagsFilters, showTagsFilters } = useStore((state) => state);
  const isIncluded = (el: Tag) => tagsFilters.some((selected) => selected.id === el.id);
  const [followedTags, setFollowedTags] = React.useState<Tags[] | []>([]);
  const { setOpenLoginModal } = useStoreNoPersist();

  const handleTagClick = async (tag: string) => {
    if (!userId) return setOpenLoginModal(true);
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
    if (userId) getFollowedTags();
  }, [userId]);

  return (
    <>
      {showTagsFilters ? (
        <FilterByTagsResult />
      ) : (
        <Paper variant="outlined" sx={{ py: 4, px: 2, minHeight: "55vh" }}>
          {tags?.length === 0 && <Empty />}
          <Grid container spacing={1}>
            {tags?.map((el, i) => (
              <Grid item xs="auto" key={i}>
                <Stack direction="row" alignItems="center">
                  <div onClick={() => setTagsFilters(el)}>
                    <Tag label={el.name} selected={isIncluded(el)} count={el?._count.posts} />
                  </div>
                  <IconButton size="small" onClick={() => handleTagClick(el.name)}>
                    {followedTags.some((follow) => follow.tag.name === el.name) ? (
                      <CheckCircleIcon fontSize="small" color="success" />
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
