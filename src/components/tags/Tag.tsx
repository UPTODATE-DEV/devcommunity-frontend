import React from "react";
import Chip from "@mui/material/Chip";
import TagIcon from "@mui/icons-material/Tag";
import useStore from "@/hooks/useStore";

const Tag: React.FC<{ label: string; selected: boolean }> = ({ label, selected = false }) => {
  return (
    <Chip
      size="small"
      icon={<TagIcon fontSize="small" />}
      color={selected ? "primary" : "default"}
      clickable
      label={label}
    />
  );
};

export default Tag;
