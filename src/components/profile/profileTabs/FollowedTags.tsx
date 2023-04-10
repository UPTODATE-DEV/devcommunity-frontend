import { getRequest } from "@/lib";
import { shortenNumber } from "@/lib/shorterNumber";
import TagIcon from "@mui/icons-material/Tag";
import TabPanel from "@mui/lab/TabPanel";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import useStore from "../../../hooks/useStore";

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => null,
});

function FollowedTags({ userId }: { userId?: string }) {
  const { push } = useRouter();
  const { setTagsFilters, tagsFilters, setShowTagsFilters } = useStore((state) => state);

  const [followedTags, setFollowedTags] = React.useState<Tags[] | []>([]);

  const handleTagClick = async (tag: string) => {
    setTagsFilters({ name: tag, id: "temp", _count: { posts: 0 } });
    setShowTagsFilters(true);
    push("/tags");
  };

  const fetchData = async () => {
    const followedTags = await getRequest({ endpoint: `/tags/followed/${userId}` });
    setFollowedTags(followedTags.data);
  };

  React.useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <TabPanel sx={{ p: 0 }} value={"tags"}>
      {followedTags.length === 0 ? (
        <Empty />
      ) : (
        <Paper variant="outlined" sx={{ py: 4, px: 2, minHeight: "300px" }}>
          <Grid container spacing={1}>
            {followedTags.map((el, i) => (
              <Grid item xs="auto" key={el?.tag?.name}>
                <Chip
                  size="small"
                  onClick={() => handleTagClick(el?.tag?.name)}
                  icon={<TagIcon fontSize="small" />}
                  sx={{ px: 2 }}
                  label={`${el?.tag?.name} (${shortenNumber(el?.tag?._count?.posts)})`}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </TabPanel>
  );
}

export default FollowedTags;
