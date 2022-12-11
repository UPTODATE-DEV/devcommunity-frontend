import ShareIcon from "@mui/icons-material/ShareOutlined";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { NEXT_PUBLIC_URL } from "../../config/url";

const Share = ({ data }: { data: Post | null }) => {
  const { locale } = useRouter();

  const onShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: data?.title,
          url: `${NEXT_PUBLIC_URL}/${data?.type === "ARTICLE" ? "articles" : "posts"}/${data?.slug}`,
        })
        .catch((e) => toast.error("Error when trying to share"));
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 52 }}
    >
      <Tooltip title={locale === "en" ? "Share" : "Partager"} placement="bottom" arrow>
        <IconButton onClick={onShare}>
          <ShareIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default Share;
