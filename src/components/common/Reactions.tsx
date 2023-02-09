import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LightbulbSharpIcon from "@mui/icons-material/LightbulbSharp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "dayjs/locale/fr";
import { useRouter } from "next/router";
import { useCallback } from "react";

export const Like = ({
  liked = false,
  handleClick,
}: {
  liked?: boolean;
  handleClick: (type: ArticleReactionType) => void;
}) => {
  const { locale } = useRouter();
  const onLike = useCallback(() => {
    handleClick("LIKE");
  }, []);

  return (
    <Tooltip title={locale === "en" ? "I Like" : "Aimer"} placement="bottom" arrow>
      <IconButton onClick={onLike}>
        <ThumbUpSharpIcon color={liked ? "info" : "inherit"} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export const Endorse = ({
  liked = false,
  handleClick,
}: {
  liked?: boolean;
  handleClick: (type: QuestionReactionType) => void;
}) => {
  const { locale } = useRouter();
  const onLike = useCallback(() => {
    handleClick("LIKE");
  }, []);

  return (
    <Tooltip title={locale === "en" ? "Endorse" : "Approuver"} placement="bottom" arrow>
      <IconButton onClick={onLike}>
        <ThumbUpSharpIcon color={liked ? "info" : "inherit"} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export const Disapprove = ({
  disliked = false,
  handleClick,
}: {
  disliked?: boolean;
  handleClick: (type: QuestionReactionType) => void;
}) => {
  const { locale } = useRouter();
  const onDislike = useCallback(() => {
    handleClick("DISLIKE");
  }, []);

  return (
    <Tooltip title={locale === "en" ? "Disapprove" : "Désapprouver"} placement="bottom" arrow>
      <IconButton onClick={onDislike}>
        <ThumbDownOffAltIcon color={disliked ? "error" : "inherit"} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export const Useful = ({ handleClick }: { handleClick: (type: ArticleReactionType) => void }) => {
  const { locale } = useRouter();
  const onLike = useCallback(() => {
    handleClick("USEFUL");
  }, []);

  return (
    <Tooltip title={locale === "en" ? "Insightful" : "Intéressant"} placement="bottom" arrow>
      <IconButton onClick={onLike}>
        <LightbulbSharpIcon color="warning" fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export const Love = ({ handleClick }: { handleClick: (type: ArticleReactionType) => void }) => {
  const { locale } = useRouter();
  const onLike = useCallback(() => {
    handleClick("LOVE");
  }, []);

  return (
    <Tooltip title={locale === "en" ? "Love" : "Adorer"} placement="bottom" arrow>
      <IconButton onClick={onLike}>
        <FavoriteSharpIcon color="error" fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
