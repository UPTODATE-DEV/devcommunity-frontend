import EventIcon from "@mui/icons-material/Event";
import LaunchIcon from "@mui/icons-material/Launch";
import PinDropIcon from "@mui/icons-material/PinDrop";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useGoToUserProfile } from "../../hooks/posts";
import { getUserFullName, getUserProfileImageUrl } from "../../lib/posts";
import UserAvatar from "../common/UserAvatar";

const ListEvents = ({
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

  const handleGoToProfile = useCallback((user: User) => {
    goToProfile(user);
  }, []);

  return (
    <React.Fragment key={item.id}>
      <ListItemButton alignItems="flex-start" onClick={() => handleViewPost(item.slug)}>
        <ListItemAvatar>
          <UserAvatar
            name={getUserFullName(item.author)}
            pictureUrl={getUserProfileImageUrl(item.author)}
            handleClick={() => handleGoToProfile(item.author)}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Stack>
              <Stack sx={{ width: 1 }} direction="row" alignItems="center" spacing={2} justifyContent="center">
                <Typography sx={{ width: 1 }} noWrap component="span">
                  {item.title}
                </Typography>
                <a href={item.event.link} rel="noopener noreferrer" target="_blank">
                  <IconButton>
                    <LaunchIcon fontSize="small" />
                  </IconButton>
                </a>
              </Stack>
            </Stack>
          }
          primaryTypographyProps={{
            variant: "body1",
            lineHeight: 1.5,
            fontSize: "0.9rem",
          }}
          secondary={
            <>
              <Paper
                component={Stack}
                variant="outlined"
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems="center"
                sx={{ p: 1 }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <PinDropIcon color="secondary" fontSize="small" />
                  <Typography variant="caption"> {item?.event?.location} </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EventIcon color="secondary" fontSize="small" />
                  <Typography variant="caption"> {dayjs(item?.event?.date).format("DD MMM YYYY")} </Typography>
                </Stack>
              </Paper>
              <Stack sx={{ width: 1, mt: 1 }} component="span" justifyContent="center">
                <Typography sx={{ display: "inline" }} component="span" variant="caption" color="text.secondary">
                  {locale === "en" ? "By" : "Par"} {`${item.author.firstName} ${item.author.lastName}`}{" "}
                  {item.author?.role === "AUTHOR" && (
                    <VerifiedIcon color="primary" sx={{ fontSize: 11, position: "relative", top: 2 }} />
                  )}
                </Typography>
              </Stack>
            </>
          }
        />
      </ListItemButton>
      {divider && <Divider variant="inset" component="li" />}
    </React.Fragment>
  );
};

export default React.memo(ListEvents);
