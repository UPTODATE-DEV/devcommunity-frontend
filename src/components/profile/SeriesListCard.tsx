import PostContent from "@/components/common/Content";
import { useGoToPost } from "@/hooks/posts";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const SeriesListCard: React.FC<{
  data: Post;
}> = ({ data }) => {
  const { asPath, locale } = useRouter();
  const theme = useTheme();
  const goToPost = useGoToPost();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleGoToPost = useCallback(() => {
    goToPost(data);
  }, [data]);

  return (
    <Paper
      variant="outlined"
      onClick={handleGoToPost}
      sx={{
        px: 2,
        py: 1.5,
        position: "relative",
        cursor: "pointer",
        "&:hover": {
          borderColor: "primary.main",
          "&::after": {
            borderColor: "primary.main",
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 4,
          left: -4,
          width: 1,
          height: 1,
          borderRadius: 1,
          borderLeft: "2px solid",
          borderBottom: "2px solid",
          borderColor: "divider",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 7,
          left: -7,
          width: 1,
          height: 1,
          borderRadius: 1,
          borderLeft: "2px solid",
          borderBottom: "2px solid",
          borderColor: "divider",
        },
      }}
    >
      <Typography fontWeight={700} variant="h6" color="text.primary">
        {data?.title}
      </Typography>
      <Stack sx={{ cursor: "pointer" }} onClick={() => {}}>
        <PostContent content={`${data?.content.substring(0, 130)}...`} />
      </Stack>
    </Paper>
  );
};

export default SeriesListCard;
