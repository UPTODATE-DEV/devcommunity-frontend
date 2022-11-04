import React from "react";
import Chip from "@mui/material/Chip";
import TagIcon from "@mui/icons-material/Tag";

const Tag: React.FC<{ label: string }> = ({ label }) => {
  return <Chip size="small" icon={<TagIcon fontSize="small" />} sx={{ px: 2 }} clickable label={label} />;
};

export default Tag;
