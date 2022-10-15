import React from "react";
import Chip from "@mui/material/Chip";
import TagIcon from "@mui/icons-material/Tag";

const Tag: React.FC<{ label: string }> = ({ label }) => {
  return <Chip icon={<TagIcon />} sx={{ width: 1 }} clickable label={label} />;
};

export default Tag;
