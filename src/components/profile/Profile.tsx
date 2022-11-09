import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import useStore from "@/hooks/useStore";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import dynamic from "next/dynamic";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { postLocalRequest, postRequest } from "@/lib/api";
import { googleLogout } from "@react-oauth/google";
import EditIcon from "@mui/icons-material/EditOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import { toast } from "react-toastify";

const ProfileTabs = dynamic(import("@/components/profile/ProfileTabs"), { ssr: false, loading: () => null });
const ProfileEditForm = dynamic(import("@/components/profile/ProfileEditForm"), { ssr: false, loading: () => null });

const Profile = () => {
  const user = useStore((state) => state.session?.user);
  const { reload } = useRouter();
  const [open, setOpen] = React.useState(false);
  const [editProfile, setEditProfile] = React.useState(false);

  const handleEditProfile = () => {
    setEditProfile(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onLogout = async () => {
    googleLogout();
    await postLocalRequest({ endpoint: "/api/logout" });
    reload();
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Avatar
            sx={{ width: 60, height: 60, bgcolor: "primary.main", color: "white" }}
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user?.avatar?.url}
          >
            {user?.firstName[0]}
          </Avatar>
          <Stack>
            <Typography variant="h6" color="text.primary" fontWeight={700}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap sx={{ width: 1 }}>
              {user?.email}
            </Typography>
            <Typography variant="caption" fontSize={10} color="text.secondary">
              Joined Us on {dayjs(user?.createdAt).format("MM/DD/YYYY")}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems="flex-end">
          <Stack direction="row" spacing={2}>
            <IconButton>
              <GitHubIcon />
            </IconButton>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
          </Stack>
          <Stack direction={{ xs: "column-reverse", md: "row" }} spacing={2}>
            <Button size="small" color="error" startIcon={<LogoutIcon />} variant="outlined" onClick={handleClickOpen}>
              Logout
            </Button>
            <Button
              size="small"
              color="primary"
              startIcon={<EditIcon />}
              variant="contained"
              onClick={handleEditProfile}
            >
              Edit my profile
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {editProfile ? <ProfileEditForm /> : <ProfileTabs />}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Logout lorem ipsum"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout? Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
            perspiciatis. Facilis ullam voluptatum omnis maxime.{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ px: 4 }} variant="outlined" disableElevation onClick={onLogout}>
            Agree
          </Button>
          <Button sx={{ px: 4 }} disableElevation variant="contained" onClick={handleClose} autoFocus>
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Profile;
