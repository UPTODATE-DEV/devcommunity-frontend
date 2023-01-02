import { Like, Love, Useful } from "@/components/common/Reactions";
import ShowReactions from "@/components/posts/ShowPostReactions";
import useSocket from "@/hooks/useSocket";
import useStore from "@/hooks/useStore";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import { patchRequest } from "@/lib/api";
import { shortenNumber } from "@/lib/shorterNumber";
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
  const [reactions, setReactions] = React.useState<ArticleReaction[]>([]);

  const handleCloseReaction = () => {
    setOpenReaction(false);
  };

  const onReact = async (type: ArticleReactionType) => {
    if (userId && user) {
      setUserReaction((state) => (state ? undefined : type));
      setReactions((state) => {
        const reaction = state?.find((reaction) => reaction?.user?.id === userId);
        if (reaction) {
          return state?.filter((reaction) => reaction?.user?.id !== userId);
        }
        return [...reactions, { type, user, id: "temp", article: "" }];
      });

      await patchRequest({ endpoint: `/posts/${post?.id}/reactions/${type}/${userId}/article` });
      socket.emit("notification", { notificationFromUser: userId, id: Date.now().toString(), post, type });
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
    if (userId) {
      const reaction = post?.article?.reactions?.find((reaction) => {
        return reaction?.user?.id === userId;
      });
      if (reaction) {
        setUserReaction(reaction.type);
      }
    }
  }, [userId]);

  useEffect(() => {
    setReactions(post.article?.reactions);
  }, [post]);

  return (
    <>
      <Dialog
        open={openReaction}
        maxWidth="md"
        onClose={handleCloseReaction}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ShowReactions reactions={post?.article?.reactions} />
      </Dialog>
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
    </>
  );
};

export default PostReaction;
