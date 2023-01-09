import { TopSkeleton } from "@/components/topPosts/Skeleton";
import useSocket from "@/hooks/useSocket";
import useStore from "@/hooks/useStore";
import { getRequest, patchRequest } from "@/lib/api";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/system";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { toast } from "react-toastify";

import { FcCalendar } from "react-icons/fc";
import { useGoToPost, useGoToUserProfile } from "../../hooks/posts";
import { getUserFullName, getUserProfileImageUrl } from "../../lib";
import UserAvatar from "../common/UserAvatar";

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => <TopSkeleton />,
});

const Notifications = () => {
  const notifications = useStore((state) => state.notifications);
  const setNotifications = useStore((state) => state.setNotifications);
  const { setNotificationsCount } = useStore((state) => state);
  const { push, locale } = useRouter();
  const session = useStore((state) => state.session?.user);
  const socket = useSocket();
  const goToProfile = useGoToUserProfile();
  const goToPost = useGoToPost();

  locale === "en" ? dayjs.locale("en") : dayjs.locale("fr");

  const handleReadNotification = useCallback(async (notification: Notification) => {
    const post = notification.post;
    const response = await patchRequest({ endpoint: `/notifications/${notification.id}` });
    if (response.error) {
      toast.error(response.error?.message);
    }
    goToPost(post);
  }, []);

  const handleReadAll = async () => {
    const response = await patchRequest({ endpoint: `/notifications/${session?.id}/all` });
    if (response.error) {
      toast.error(response.error?.message);
    }
    setNotifications(
      notifications.map((el) => ({
        ...el,
        notifications: el.notifications.map((notification) => ({ ...notification, read: true })),
      }))
    );
    setNotificationsCount(0);
  };

  React.useEffect(() => {
    socket.on("notification", () => {
      const getNotifications = async () => {
        const notifications = await getRequest({ endpoint: `/notifications/${session?.id}` });
        if (!notifications.error) {
          setNotifications(notifications.data);
        }
      };

      getNotifications();
    });
  }, []);

  return (
    <>
      <Paper variant="outlined" sx={{ p: 2 }} component={Stack}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="text.primary">
            Notifications
          </Typography>
          <Button onClick={handleReadAll} disableElevation color="primary">
            {locale === "en" ? "Mark all as read" : "Marquez tout comme lu"}
          </Button>
        </Stack>
      </Paper>

      {notifications?.length === 0 && <Empty />}
      {notifications.map((el) => (
        <Stack key={el.date}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FcCalendar />
            <Typography color="secondary.main" variant="caption" fontWeight={700}>
              {dayjs(el.date).format("DD/MM/YYYY")}
            </Typography>
          </Stack>
          <List>
            {el.notifications.map((el, i) => (
              <Paper variant="outlined" key={el.id} sx={{ my: 0.5 }}>
                <ListItemButton
                  onClick={() => handleReadNotification(el)}
                  sx={{
                    borderRadius: 1,
                    m: 0.2,
                    bgcolor: !el.read ? (theme) => alpha(theme.palette.secondary.main, 0.2) : "inherit",
                  }}
                >
                  <ListItemAvatar>
                    <UserAvatar
                      name={getUserFullName(el?.notificationFromUser)}
                      pictureUrl={getUserProfileImageUrl(el?.notificationFromUser)}
                      handleClick={goToProfile}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                          {`${el?.notificationFromUser.firstName} ${el?.notificationFromUser.lastName}`}
                        </Typography>{" "}
                        {el.type === "COMMENT" && (locale === "fr" ? "a commenté votre" : "commented on your")}
                        {el.type === "DISLIKE" && (locale === "fr" ? "a réagi à votre" : "reacted on your")}
                        {el.type === "LIKE" && (locale === "fr" ? "a réagi à votre" : "reacted on your")}
                        {el.type === "LOVE" && (locale === "fr" ? "a réagi à votre" : "reacted on your")}
                        {el.type === "USEFUL" && (locale === "fr" ? "a réagi à votre" : "reacted on your")}{" "}
                        {el.post.type === "ARTICLE" ? "article" : "post"}
                      </React.Fragment>
                    }
                    secondary={el.post.title}
                    primaryTypographyProps={{
                      fontWeight: 700,
                      color: "text.primary",
                    }}
                  />
                </ListItemButton>
              </Paper>
            ))}
          </List>
        </Stack>
      ))}
    </>
  );
};

export default Notifications;
