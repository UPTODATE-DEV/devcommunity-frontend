import React from "react";
import InputBase from "@mui/material/InputBase";
import { getRequest } from "@/lib/api";
import useStore from "@/hooks/useStore";

const Search = () => {
  const [name, setName] = React.useState("");
  const setTags = useStore((state) => state.setTags);

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
    <InputBase sx={{ mt: 2 }} value={name} placeholder="Search tags..." onChange={(e) => setName(e.target.value)} />
  );
};

export default Search;
