import { Like, Love, Useful } from "@/components/common/Reactions";
import ShowReactions from "@/components/posts/ShowPostReactions";
import useSocket from "@/hooks/useSocket";
import useStore from "@/hooks/useStore";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import { getRequest, patchRequest } from "@/lib/api";
import { shortenNumber } from "@/lib/shorterNumber";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PostReaction = ({ post }: { post: Post }) => {
  const [openReaction, setOpenReaction] = React.useState(false);
  const userId = useStore((state) => state.session?.user?.id);
  const user = useStore((state) => state.session?.user);
  const { setOpenLoginModal } = useStoreNoPersist();
  const [userReaction, setUserReaction] = React.useState<ArticleReactionType | undefined>();
  const socket = useSocket();
  const { locale } = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [reactions, setReactions] = React.useState<ArticleReaction[]>([]);

  const handleCloseReaction = () => {
    setOpenReaction(false);
  };

  const onReact = async (type: ArticleReactionType) => {
    if (userId && user) {
      setLoading(true);
      const response = await patchRequest({ endpoint: `/posts/${post?.id}/reactions/${type}/${userId}/article` });
      if (response?.data) {
        socket.emit("notification", { notificationFromUser: userId, id: Date.now().toString(), post, type });
        setReactions(response.data?.article?.reactions);
        setUserReaction((state) => (state === type ? undefined : type));
        setLoading(false);
      }
      return;
    }
    setOpenLoginModal(true);
  };

  const reaction = () => {
    switch (userReaction) {
      case "LIKE":
        return <Like liked handleClick={onReact} />;
      case "LOVE":
        return <Love handleClick={onReact} />;
      case "USEFUL":
        return <Useful handleClick={onReact} />;

      default:
        return (
          <>
            <Like handleClick={onReact} />
            <Love handleClick={onReact} />
            <Useful handleClick={onReact} />
          </>
        );
    }
  };

  useEffect(() => {
    async function getReactions() {
      const response = await getRequest({ endpoint: `/posts/${post?.id}/reactions/posts` });
      if (response?.data) {
        setReactions(response.data?.reactions);
        const reaction = response.data?.reactions?.find((reaction: QuestionsReaction) => {
          return reaction?.user?.id === userId;
        });
        if (reaction) {
          setUserReaction(reaction.type);
        } else {
          setUserReaction(undefined);
        }
      }
    }

    getReactions().then(() => setLoading(false));
  }, []);

  return (
    <>
      <Dialog
        open={openReaction}
        maxWidth="md"
        onClose={handleCloseReaction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ShowReactions reactions={reactions} />
      </Dialog>
      {loading ? (
        <CircularProgress size={16} />
      ) : (
        <Stack direction="row" alignItems="center">
          {reaction()}
          <Tooltip title={locale === "en" ? "See all reactions" : "Voir toutes les réactions"} placement="bottom" arrow>
            <IconButton onClick={() => setOpenReaction(true)}>
              <Typography variant="caption" color="text.primary" fontWeight={700}>
                {shortenNumber(reactions?.length || 0)}
              </Typography>
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </>
  );
};

export default PostReaction;
