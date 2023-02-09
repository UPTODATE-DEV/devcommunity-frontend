import TagIcon from "@mui/icons-material/Tag";
import Chip from "@mui/material/Chip";
import React from "react";

import { shortenNumber } from "@/lib/shorterNumber";

const Tag: React.FC<{ label: string; selected: boolean; count: number }> = ({ label, count=0, selected = false }) => {
  return (
    <Chip
      size="small"
      icon={<TagIcon fontSize="small" />}
      color={selected ? "primary" : "default"}
      clickable
      label={`${label} (${shortenNumber(count)})`}
    />
  );
};

export default Tag;
