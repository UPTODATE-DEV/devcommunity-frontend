import PostContent from "@/components/common/Content";
import PostCardHeader from "@/components/common/PostCardHeader";
import PostTags from "@/components/common/PostTags";
import { useGoToPost, useGoToUserProfile } from "@/hooks/posts";
import { getContent, parseDate } from "@/lib/posts";
import { shortenNumber } from "@/lib/shorterNumber";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import Bookmark from "../common/Bookmark";
import Share from "../common/Share";
import QuestionReactions from "./QuestionReactions";

const SurveyContent = dynamic(import("@/components/questions/SurveyContent"), { ssr: false });

const QuestionCard: React.FC<{ data: Post }> = ({ data }) => {
  const theme = useTheme();
  const { author } = data;
  const cardRef = React.useRef<HTMLDivElement>(null);
  const { locale } = useRouter();
  const goToProfile = useGoToUserProfile();
  const goToPost = useGoToPost();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const postContent = getContent(data?.content, isMobile ? 180 : 220, locale);

  const handleGoToProfile = useCallback(() => {
    goToProfile(author);
  }, [author?.username]);

  const handleGoToPost = useCallback(() => {
    goToPost(data);
  }, [data]);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <PostCardHeader
        handleClickGoToProfile={handleGoToProfile}
        date={parseDate({ date: data?.publishedOn, type: "relative" })}
        author={author}
      />
      <Typography
        fontWeight={700}
        color="text.primary"
        variant="h6"
        onClick={handleGoToPost}
        sx={{
          "&:hover": {
            color: "primary.main",
          },
          cursor: "pointer",
          mb: "-8px",
          mt: 1,
        }}
      >
        {data?.title}
      </Typography>
      <Stack sx={{ cursor: "pointer" }} onClick={handleGoToPost}>
        <PostContent content={postContent} />
      </Stack>
      {data?.survey?.length > 0 && <SurveyContent survey={data?.survey[0]} />}
      <PostTags tags={data?.tags} />
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 1 }}
      >
        <QuestionReactions post={data} />
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center">
            <Link href={`/posts/${data?.slug}/#comments`} passHref>
              <IconButton>
                <CommentIcon fontSize="small" />
              </IconButton>
            </Link>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              {shortenNumber(data?._count?.comments || 0)}
            </Typography>
          </Stack>

          <Bookmark post={data} />
          <Share data={data} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default QuestionCard;
