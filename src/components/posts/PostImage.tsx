import { Stack } from "@mui/material";
import Image from "next/image";

const PostImage = ({
  articleUrl = "",
  title = "",
  handleClick,
}: {
  articleUrl?: string;
  title?: string;
  handleClick: () => void;
}) => {
  return (
    <Stack
      sx={{
        width: 1,
        height: 240,
        position: "relative",
        borderRadius: 2,
        cursor: "pointer",
        overflow: "hidden",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        my: 2,
        bgcolor: "action.hover",
      }}
      onClick={handleClick}
    >
      {articleUrl && <Image src={articleUrl} alt={`${title} | Updev Community`} layout="fill" objectFit="cover" />}
    </Stack>
  );
};

export default PostImage;
