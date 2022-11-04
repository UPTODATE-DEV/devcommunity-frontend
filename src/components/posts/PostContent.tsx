import useStore from "@/hooks/useStore";
import { patchRequest } from "@/lib/api";
import { TypographyStylesProvider } from "@mantine/core";
import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LightbulbSharpIcon from "@mui/icons-material/LightbulbSharp";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
dayjs.extend(relativeTime);

const PostContent: React.FC<{ data: Post }> = ({ data }) => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" color="text.primary" fontWeight={700} gutterBottom>
        {data?.title}
      </Typography>

      <TypographyStylesProvider>
        <Typography
          color="text.secondary"
          component="div"
          fontSize={17}
          className="content"
          gutterBottom
          sx={{ lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{
            __html: data?.content,
          }}
        />
      </TypographyStylesProvider>
    </Stack>
  );
};

export default PostContent;
