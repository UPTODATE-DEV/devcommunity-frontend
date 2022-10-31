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

const Notifications = () => {
  const topUsers = useStore((state) => state.topUsers);

  return (
    <Stack spacing={2} sx={{ py: 2 }}>
      <List>
        {topUsers.map((el, i) => (
          <React.Fragment key={i}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar src={el?.avatar} alt={`${el.firstName} ${el.lastName}`}>
                  {el.firstName.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                      {`${el.firstName} ${el.lastName}`}
                    </Typography>{" "}
                    a réagit à votre post
                  </React.Fragment>
                }
                secondary="Holisticly reintermediate fully tested niche markets through robust innovation"
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
