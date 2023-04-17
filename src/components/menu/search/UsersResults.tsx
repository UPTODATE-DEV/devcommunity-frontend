import { Avatar, Stack, Typography } from "@mui/material";
import * as React from "react";
import ResultsTitle from "./ResultsTitle";

const UsersResults = () => {
  const [count, setCount] = React.useState(3);
  return (
    <Stack sx={{ py: 1 }} spacing={1}>
      <ResultsTitle title="Users" count={5} />
      {count === 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          No results found
        </Typography>
      )}
      {Array.from(new Array(count)).map((_, i) => (
        <Stack direction="row" spacing={1} key={i} sx={{ cursor: "pointer" }}>
          <Avatar alt="User 1" src="/default.png" />
          <Stack>
            <Typography sx={{ color: "text.primary" }}>Luccin Masirika</Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              luccinmasirika@gmail.com
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default UsersResults;
