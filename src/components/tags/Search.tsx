import React from "react";
import InputBase from "@mui/material/InputBase";
import { getRequest, postRequest } from "@/lib/api";
import useStore from "@/hooks/useStore";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

const Search = () => {
  const [name, setName] = React.useState("");
  const { setTags, setPosts, tagsFilters, setShowTagsFilters } = useStore((state) => state);
  const { locale } = useRouter();

  React.useEffect(() => {
    const getTags = async () => {
      const tags = await getRequest({ endpoint: `/tags?name=${name}` });
      if (!tags.error) {
        setTags(tags.data);
      }
    };

    getTags();
  }, [name]);

  React.useEffect(() => {
    const getPosts = async () => {
      const posts = await postRequest({ endpoint: "/posts/tags", data: tagsFilters.map((el) => el.name) });
      if (!posts.error) {
        setPosts(posts.data);
      }
    };

    getPosts();
  }, [tagsFilters.length]);

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <InputBase
        sx={{ mt: 2, width: 1 }}
        value={name}
        placeholder={locale === "en" ? "Search tags..." : "Rechercher des tags..."}
        onChange={(e) => setName(e.target.value)}
      />
      {!!tagsFilters.length && (
        <Button
          onClick={() => setShowTagsFilters(true)}
          sx={{ px: 2 }}
          size="small"
          variant="contained"
          disableElevation
          startIcon={<FilterListIcon />}
        >
          {locale === "en" ? "Filter" : "Filtrer"}
        </Button>
      )}
    </Stack>
  );
};

export default Search;
