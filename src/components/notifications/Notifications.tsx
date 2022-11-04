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
import { patchRequest } from "@/lib/api";
import { toast } from "react-toastify";

const Notifications = () => {
  const notifications = useStore((state) => state.notifications);
  const { push } = useRouter();

  const handleReadNotification = async (notification: Notifications) => {
    const post = notification.post;
    const response = await patchRequest({ endpoint: `/notifications/${notification.id}` });
    if (response.error) {
      toast.error(response.error?.message);
    }
    push(`${post.type === "ARTICLE" ? "/articles" : "/posts"}/${post.slug}`);
  };

  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      <Typography variant="h6" color="text.primary">
        Notifications
      </Typography>
      <Divider variant="inset" />
      <List>
        {notifications.map((el, i) => (
          <React.Fragment key={i}>
            <ListItemButton
              onClick={() => handleReadNotification(el)}
              sx={{
                borderRadius: 1,
                bgcolor: !el.read ? (theme) => alpha(theme.palette.primary.main, 0.3) : "inherit",
                my: 0.2,
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: "primary.main", color: "white" }}
                  src={el?.notificationFromUser?.profile?.avatar?.url}
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
                    {el.type === "COMMENT" && "a commenté votre post"}
                    {el.type === "DISLIKE" && "a réagit votre post"}
                    {el.type === "LIKE" && "a réagit votre post"}
                    {el.type === "LOVE" && "a réagit votre post"}
                    {el.type === "USEFUL" && "a réagit votre post"}
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
  );
};

export default Notifications;
