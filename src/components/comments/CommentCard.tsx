import PostContent from "@/components/common/Content";
import PostCardHeader from "@/components/common/PostCardHeader";
import { useGoToUserProfile } from "@/hooks/posts";
import useStore from "@/hooks/useStore";
import { deleteRequest } from "@/lib";
import { getContent, parseDate } from "@/lib/posts";
import { shortenNumber } from "@/lib/shorterNumber";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/system/useTheme";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { toast } from "react-toastify";
import ShowQuestionReactions from "../questions/ShowQuestionReactions";
import CommentReactions from "./CommentReactions";

const CommentCard: React.FC<{ data: PostComment }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  const { currentPost } = useStore((state) => state);
  const { push, locale } = useRouter();
  const [, setUserReaction] = React.useState<QuestionReactionType | undefined>();
  const [openReaction, setOpenReaction] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const postContent = getContent(data?.content, isMobile ? 180 : 220, locale);
  const { comments, setComments } = useStore((state) => state);

  const { author } = data;
  const goToProfile = useGoToUserProfile();

  const handleCloseReaction = () => {
    setOpenReaction(false);
  };

  const handleGoToProfile = useCallback(() => {
    goToProfile(author?.email);
  }, [author?.email]);

  const handleGoToComment = () => {
    push(`/${currentPost?.type !== "ARTICLE" ? "posts" : "articles"}/${currentPost?.slug}/${data.id}`);
  };

  const handleDeleteComment = async (id: string) => {
    const response = await deleteRequest({ endpoint: `/comments/${id}` });
    if (response.error) {
      toast.error(response.error?.message);
    }
    if (response.data) {
      setComments(comments.filter((el) => el.id !== id));
    }
  };

  React.useEffect(() => {
    if (user) {
      const reaction = data?.reactions?.find((reaction) => {
        return reaction?.user?.id === user?.id;
      });
      if (reaction) {
        setUserReaction(reaction.type);
      } else {
        setUserReaction(undefined);
      }
    }
  }, [data?.reactions, user]);

  return (
    <>
      <Dialog
        open={openReaction}
        onClose={handleCloseReaction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ShowQuestionReactions reactions={data?.reactions} />
      </Dialog>
      <Stack sx={{ position: "relative" }}>
        <PostCardHeader
          handleClickGoToProfile={handleGoToProfile}
          date={parseDate({ date: data?.createdAt, type: "relative" })}
          author={author}
        />
        {data.author.id === user?.id && (
          <IconButton sx={{ position: "absolute", top: 0, right: 0 }} onClick={() => handleDeleteComment(data.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
        <Stack sx={{ cursor: "pointer" }} onClick={handleGoToComment}>
          <PostContent content={postContent} />
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
          <CommentReactions comment={data} />
          <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
              <IconButton onClick={handleGoToComment}>
                <ReplyIcon fontSize="small" />
              </IconButton>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                {shortenNumber(data?._count?.childrenComments)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default CommentCard;
