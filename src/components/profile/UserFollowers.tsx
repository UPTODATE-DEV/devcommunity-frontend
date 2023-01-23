import UserAvatar from "@/components/common/UserAvatar";
import { useGoToUserProfile } from "@/hooks";
import { getUserFullName, getUserProfileImageUrl } from "@/lib";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";
import Empty from "../common/Empty";

const UserFollowers = ({
  open,
  handleClose,
  data,
}: {
  open: boolean;
  handleClose: () => void;
  data: { user: User }[];
}) => {
  const goToProfile = useGoToUserProfile();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <DialogContent sx={{ alignItems: "center", textAlign: "center" }}>
        <List sx={{ p: 0, minWidth: { xs: 1, md: 450 } }}>
          {data.length < 1 && <Empty />}
          {data.map((follower, i) => (
            <React.Fragment key={follower.user.email}>
              <ListItemButton>
                <ListItemAvatar>
                  <UserAvatar
                    name={getUserFullName(follower.user)}
                    pictureUrl={getUserProfileImageUrl(follower.user)}
                    handleClick={() => goToProfile(follower.user.email)}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                        {getUserFullName(follower.user)}
                      </Typography>
                    </>
                  }
                  primaryTypographyProps={{
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                />
              </ListItemButton>
              {i !== data.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default UserFollowers;
