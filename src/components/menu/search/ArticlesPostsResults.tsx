import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import ResultsTitle from "./ResultsTitle";

const ArticlesPostsResults = () => {
  const [count, setCount] = React.useState(0);
  return (
    <Stack sx={{ py: 1 }} spacing={1}>
      <ResultsTitle title="Articles" count={5} />
      {count === 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          No results found
        </Typography>
      )}
      {Array.from(new Array(count)).map((_, i) => (
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              cursor: "pointer",
            },
          }}
        >
          <Link href="#">Synergistically generate e-business services without business technologies.</Link>
        </Typography>
      ))}
    </Stack>
  );
};

export default ArticlesPostsResults;
