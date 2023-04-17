import { Typography } from "@mui/material";

const ResultsTitle = ({ title, count }: { title: string; count: number }) => (
  <Typography color="text.primary" sx={{ fontWeight: 500 }}>
    {title}
    <Typography variant="caption" sx={{ color: "text.secondary" }}>
      {" "}
      ({count})
    </Typography>
  </Typography>
);

export default ResultsTitle;
