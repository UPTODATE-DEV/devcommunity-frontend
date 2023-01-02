import { Disapprove, Endorse } from "@/components/common/Reactions";
import ShowReactions from "@/components/questions/ShowQuestionReactions";
import useSocket from "@/hooks/useSocket";
import useStore from "@/hooks/useStore";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import { patchRequest } from "@/lib/api";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";
import { shortenNumber } from "@/lib/shorterNumber";

const CommentReactions = ({ comment }: { comment: PostComment }) => {
  const [openReaction, setOpenReaction] = React.useState(false);
  const userId = useStore((state) => state.session?.user?.id);
  const { setOpenLoginModal } = useStoreNoPersist();
  const [userReaction, setUserReaction] = React.useState<QuestionReactionType | undefined>();
  const { locale } = useRouter();
  const socket = useSocket();

  const handleCloseReaction = () => {
    setOpenReaction(false);
  };

  const onReact = async (type: QuestionReactionType) => {
    if (userId) {
      setUserReaction((state) => (state === type ? undefined : type));
      await patchRequest({ endpoint: `/comments/${comment?.id}/reactions/${type}/${userId}` });
      socket.emit("notification", { notificationFromUser: userId, id: Date.now().toString(), comment, type });
      return;
    }
    setOpenLoginModal(true);
  };

  React.useEffect(() => {
    if (userId) {
      const reaction = comment?.reactions?.find((reaction) => {
        return reaction?.user?.id === userId;
      });
      if (reaction) {
        setUserReaction(reaction.type);
      } else {
        setUserReaction(undefined);
      }
    }
  }, [comment, userId]);

  const SeeAllReaction = ({ type }: { type: QuestionReactionType }) => (
    <Tooltip title={locale === "en" ? "See all reactions" : "Voir toutes les réactions"} placement="bottom" arrow>
      <IconButton onClick={() => setOpenReaction(true)}>
        <Typography variant="caption" color="text.primary" fontWeight={700}>
          {shortenNumber(comment?.reactions?.filter((el) => el.type === type).length || 0)}
        </Typography>
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      <Dialog
        open={openReaction}
        maxWidth="md"
        onClose={handleCloseReaction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ShowReactions reactions={comment?.reactions} />
      </Dialog>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center">
            <Endorse handleClick={onReact} liked={userReaction === "LIKE"} />
            <SeeAllReaction type="LIKE" />
          </Stack>

          <Stack direction="row" alignItems="center">
            <Disapprove handleClick={onReact} disliked={userReaction === "DISLIKE"} />
            <SeeAllReaction type="DISLIKE" />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default CommentReactions;
