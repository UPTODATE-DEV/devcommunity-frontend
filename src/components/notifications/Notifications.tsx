import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import useStore from "@/hooks/useStore";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import { alpha } from "@mui/material";
import { getRequest, patchRequest } from "@/lib/api";
import { toast } from "react-toastify";
import { FILES_BASE_URL } from "config/url";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { TopSkeleton } from "@/components/topPosts/Skeleton";
import useSocket from "@/hooks/useSocket";

const Empty = dynamic(import("@/components/common/Empty"), {
  ssr: false,
  loading: () => <TopSkeleton />,
});

const Notifications = () => {
  const notifications = useStore((state) => state.notifications);
  const setNotifications = useStore((state) => state.setNotifications);
  const { push, locale } = useRouter();
  const session = useStore((state) => state.session?.user);
  const socket = useSocket();

  locale === "en" ? dayjs.locale("en") : dayjs.locale("fr");

  const handleReadNotification = async (notification: Notification) => {
    const post = notification.post;
    const response = await patchRequest({ endpoint: `/notifications/${notification.id}` });
    if (response.error) {
      toast.error(response.error?.message);
    }
    push(`${post.type === "ARTICLE" ? "/articles" : "/posts"}/${post.slug}`);
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
    <Stack spacing={2} sx={{ py: 2 }}>
      <Typography variant="h6" color="text.primary">
        Notifications
      </Typography>
      <Divider variant="inset" />
      {notifications?.length === 0 && <Empty />}
      {notifications.map((el) => (
        <Stack key={el.date}>
          <Typography color="text.secondary">{dayjs(el.date).format("DD/MM/YYYY")}</Typography>
          <List>
            {el.notifications.map((el, i) => (
              <React.Fragment key={el.id}>
                <ListItemButton
                  onClick={() => handleReadNotification(el)}
                  sx={{
                    borderRadius: 1,
                    my: 0.2,
                    bgcolor: !el.read ? (theme) => alpha(theme.palette.primary.main, 0.3) : "inherit",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", color: "white" }}
                      src={FILES_BASE_URL + el?.notificationFromUser?.profile?.avatar?.url}
                      alt={`${el?.notificationFromUser.firstName} ${el?.notificationFromUser.lastName}`}
                    >
                      {el.notificationFromUser.firstName.charAt(0)}
                    </Avatar>
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
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Stack>
      ))}
    </Stack>
  );
};

export default Notifications;
