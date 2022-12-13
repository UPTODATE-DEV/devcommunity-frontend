import React from "react";
import Chip from "@mui/material/Chip";
import TagIcon from "@mui/icons-material/Tag";
import useStore from "@/hooks/useStore";

const Tag: React.FC<{ label: string; selected: boolean; count: number }> = ({ label, count, selected = false }) => {
  return (
    <Chip
      size="small"
      icon={<TagIcon fontSize="small" />}
      color={selected ? "primary" : "default"}
      clickable
      label={`${label} (${count})`}
    />
  );
};

export default Tag;
