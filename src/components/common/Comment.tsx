import PostContent from "@/components/common/Content";
import PostCardHeader from "@/components/common/PostCardHeader";
import useSocket from "@/hooks/useSocket";
import useStore from "@/hooks/useStore";
import { patchRequest } from "@/lib/api";
import { parseDate } from "@/lib/posts";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useGoToUserProfile } from "../../hooks/posts";
import useStoreNoPersist from "../../hooks/useStoreNoPersist";
import ShowQuestionReactions from "../questions/ShowQuestionReactions";

const Comment: React.FC<{ data: PostComment }> = ({ data }) => {
  const user = useStore((state) => state.session?.user);
  const { push, locale } = useRouter();
  const { setOpenLoginModal } = useStoreNoPersist();
  const [userReaction, setUserReaction] = React.useState<QuestionReactionType | undefined>();
  const [openReaction, setOpenReaction] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [unLikes, setUnLikes] = React.useState(0);

  const socket = useSocket();
  const { author } = data;
  const goToProfile = useGoToUserProfile();

  const handleCloseReaction = () => {
    setOpenReaction(false);
  };

  const handleGoToProfile = useCallback(() => {
    goToProfile(author?.email);
  }, [author?.email]);

  const onReact = async (type: QuestionReactionType) => {
    if (user) {
      if (type === "DISLIKE") {
        if (userReaction === "DISLIKE") {
          setUserReaction(undefined);
          setUnLikes((state) => state - 1);
        } else if (userReaction === "LIKE") {
          setUserReaction("DISLIKE");
          setUnLikes((state) => state + 1);
          setLikes((state) => state - 1);
        } else {
          setUserReaction("DISLIKE");
          setUnLikes((state) => state + 1);
        }
      } else {
        if (userReaction === "LIKE") {
          setUserReaction(undefined);
          setLikes((state) => state - 1);
        } else if (userReaction === "DISLIKE") {
          setUserReaction("LIKE");
          setLikes((state) => state + 1);
          setUnLikes((state) => state - 1);
        } else {
          setUserReaction("LIKE");
          setLikes((state) => state + 1);
        }
      }

      await patchRequest({ endpoint: `/comments/${data?.id}/reactions/${type}/${user?.id}` });
      // socket.emit("notification", { notificationFromUser: user, id: Date.now().toString(), post, type });
      return;
    }
    setOpenLoginModal(true);
  };

  React.useEffect(() => {
    setLikes(data?.reactions?.filter((el) => el.type === "LIKE").length);
    setUnLikes(data?.reactions?.filter((el) => el.type === "DISLIKE").length);

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
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Dialog
        open={openReaction}
        onClose={handleCloseReaction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ShowQuestionReactions reactions={data?.reactions} />
      </Dialog>
      <PostCardHeader
        handleClickGoToProfile={handleGoToProfile}
        date={parseDate({ date: data?.createdAt, type: "relative" })}
        author={author}
      />
      <PostContent content={data?.content} />
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center">
            <Tooltip title={locale === "en" ? "Endorse" : "Approuver"} placement="bottom" arrow>
              <IconButton onClick={() => onReact("LIKE")}>
                <ThumbUpSharpIcon color={userReaction === "LIKE" ? "info" : "inherit"} fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={locale === "en" ? "See all reactions" : "Voir toutes les réactions"}
              placement="bottom"
              arrow
            >
              <IconButton onClick={() => setOpenReaction(true)}>
                <Typography variant="caption" color="text.primary" fontWeight={700}>
                  {likes}
                </Typography>
              </IconButton>
            </Tooltip>

            <Tooltip title={locale === "en" ? "Disapprove" : "Désapprouver"} placement="bottom" arrow>
              <IconButton onClick={() => onReact("DISLIKE")}>
                <ThumbDownOffAltIcon color={userReaction === "DISLIKE" ? "error" : "inherit"} fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={locale === "en" ? "See all reactions" : "Voir toutes les réactions"}
              placement="bottom"
              arrow
            >
              <IconButton onClick={() => setOpenReaction(true)}>
                <Typography variant="caption" color="text.primary" fontWeight={700}>
                  {unLikes}
                </Typography>
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Link href={`/#comments`} passHref>
              <IconButton>
                <QuestionAnswerIcon fontSize="small" />
              </IconButton>
            </Link>
            <Typography variant="caption" color="text.secondary" fontWeight={700}>
              {data?.childrenComments?.length || 0}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Comment;
