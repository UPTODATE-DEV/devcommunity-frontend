import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib/api";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import React from "react";

const Search = () => {
  const [name, setName] = React.useState("");
  const { setTags, tagsFilters, setShowTagsFilters } = useStore((state) => state);
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
