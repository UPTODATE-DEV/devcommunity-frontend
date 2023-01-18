import Stack from "@mui/material/Stack";
import Image from "next/image";

const PostImage = ({
  articleUrl = "",
  title = "",
  handleClick,
}: {
  articleUrl?: string;
  title?: string;
  handleClick: () => void;
  height?: number;
}) => {
  return (
    <Stack
      sx={{
        width: 1,
        paddingTop: "56.25%",
        position: "relative",
        borderRadius: 1,
        cursor: "pointer",
        overflow: "hidden",
        bgcolor: "action.hover",
      }}
      onClick={handleClick}
    >
      {articleUrl && <Image src={articleUrl} alt={`${title} | Updev Community`} layout="fill" objectFit="cover" />}
    </Stack>
  );
};

export default PostImage;
