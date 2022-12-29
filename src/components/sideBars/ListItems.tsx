import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useGoToUserProfile } from "../../hooks/posts";
import { getUserFullName, getUserProfileImageUrl } from "../../lib/posts";
import UserAvatar from "../common/UserAvatar";

const ListItems = ({
  item,
  handleViewPost,
  divider,
}: {
  item: Post;
  divider: boolean;
  handleViewPost: (path: string) => void;
}) => {
  const { locale } = useRouter();

  const goToProfile = useGoToUserProfile();

  const handleGoToProfile = useCallback((email: string) => {
    goToProfile(email);
  }, []);

  return (
    <React.Fragment key={item.id}>
      <ListItemButton alignItems="flex-start" onClick={() => handleViewPost(item.slug)}>
        <ListItemAvatar>
          <UserAvatar
            name={getUserFullName(item.author)}
            pictureUrl={getUserProfileImageUrl(item.author)}
            handleClick={() => handleGoToProfile(item.author.email)}
          />
        </ListItemAvatar>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            variant: "body1",
            lineHeight: 1.5,
            fontSize: "0.9rem",
          }}
          secondary={
            <Stack sx={{ width: 1 }} component="span">
              <Typography sx={{ display: "inline" }} component="span" variant="caption" color="text.secondary">
                {locale === "en" ? "By" : "Par"} {`${item.author.firstName} ${item.author.lastName}`}
              </Typography>
            </Stack>
          }
        />
      </ListItemButton>
      {divider && <Divider variant="inset" component="li" />}
    </React.Fragment>
  );
};

export default React.memo(ListItems);
