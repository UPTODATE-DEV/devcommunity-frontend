import { getArticleImageUrl } from "@/lib";
import Paper from "@mui/material/Paper";
import React, { useCallback } from "react";
import PostImage from "./PostImage";

const PostHeader: React.FC<{ data: Post }> = ({ data }) => {
  const handleClick = useCallback(() => {}, []);

  return (
    <Paper
      variant="outlined"
      sx={{
        width: 1,
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
      }}
    >
      <PostImage
        height={300}
        handleClick={handleClick}
        title={data?.title}
        articleUrl={getArticleImageUrl(data?.article)}
      />
    </Paper>
  );
};

export default PostHeader;
