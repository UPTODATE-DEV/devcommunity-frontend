import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import { FILES_BASE_URL } from "config/url";
import { useRouter } from "next/router";

const PostHeader: React.FC<{ data: Post }> = ({ data }) => {
  const { push } = useRouter();
  return (
    <Stack
      sx={{
        width: 1,
        height: 300,
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
      }}
    >
      <Image src={FILES_BASE_URL + data?.article?.image?.url} alt="Post" layout="fill" objectFit="cover" />
      <Stack
        sx={{
          px: 2,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "rgba(0,0,0,0.5)",
          height: 32,
          width: 1,
        }}
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        spacing={2}
      >
        <Typography
          variant="body2"
          color="#d8d8d8"
          onClick={() => push(`/profile/@${data?.author?.email.split("@")[0]}`)}
          sx={{
            "&:hover": {
              color: "primary.main",
            },
            cursor: "pointer",
          }}
        >
          {data?.author?.firstName} {data?.author?.lastName}
        </Typography>
        <Typography variant="body2" color="#d8d8d8">
          {dayjs(data?.createdAt).format("MMM DD, YYYY")}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PostHeader;
