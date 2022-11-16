import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import useStore from "@/hooks/useStore";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
import ListItemText from "@mui/material/ListItemText";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import { toast } from "react-toastify";
import useUser from "@/hooks/useUser";
import { FILES_BASE_URL } from "config/url";
import Fab from "@mui/material/Fab";
import { ProfileQuestionTabsSkeleton } from "./Skeleton";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";

const ProfileTabs = dynamic(import("@/components/profile/ProfileTabs"), {
  ssr: false,
  loading: () => <ProfileQuestionTabsSkeleton />,
});

const ProfileEditForm = dynamic(import("@/components/profile/ProfileEditForm"), {
  ssr: false,
  loading: () => null,
});

const Profile = ({ currentUser }: { currentUser?: User }) => {
  const session = useStore((state) => state.session?.user);
  const useUserData = useUser(session?.username);
  const user = currentUser || useUserData;
  const { reload } = useRouter();
  const [open, setOpen] = React.useState(false);
  const { editProfile, setEditProfile } = useStoreNoPersist((state) => state);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    setEditProfile(true);
    handleCloseMenu();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  const onLogout = async () => {
    googleLogout();
    await postLocalRequest({ endpoint: "/api/logout" });
    reload();
  };

  React.useEffect(() => {
    return () => setEditProfile(false);
  }, []);

  return (
    <>
      {user?.id && (
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <Avatar
                sx={{ width: 60, height: 60, bgcolor: "primary.main", color: "white" }}
                alt={`${user?.firstName} ${user?.lastName}`}
                src={`${FILES_BASE_URL}${user?.profile?.avatar?.url}`}
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
                <Typography flexWrap="nowrap" variant="caption" color="text.secondary" noWrap sx={{ width: 1 }}>
                  {user?.profile?.job}
                </Typography>
                <Typography variant="caption" fontSize={10} color="text.secondary">
                  Joined Us Since {dayjs(user?.createdAt).format("YYYY")}
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={2} alignItems="flex-end">
              {!currentUser && (
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={openMenu ? "long-menu" : undefined}
                  aria-expanded={openMenu ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleOpenMenu}
                >
                  <MoreVertIcon />
                </IconButton>
              )}

              <Stack direction="row" spacing={{ xs: 1, md: 2 }}>
                {user?.profile?.gitHub && (
                  <a href={user?.profile?.gitHub} target="_blank" rel="noreferrer noopener">
                    <IconButton>
                      <GitHubIcon />
                    </IconButton>
                  </a>
                )}
                {user?.profile?.linkedIn && (
                  <a href={user?.profile?.linkedIn} target="_blank" rel="noreferrer noopener">
                    <IconButton>
                      <LinkedInIcon />
                    </IconButton>
                  </a>
                )}
                {user?.profile?.twitter && (
                  <a href={user?.profile?.twitter} target="_blank" rel="noreferrer noopener">
                    <IconButton>
                      <TwitterIcon />
                    </IconButton>
                  </a>
                )}
              </Stack>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleEditProfile}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClickOpen}>
                  <ListItemIcon>
                    <PowerSettingsNewIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>

          <Typography color="text.secondary">{user?.profile?.bio}</Typography>

          {editProfile ? <ProfileEditForm user={user} /> : <ProfileTabs currentUser={currentUser} />}

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
              <Button sx={{ px: 4 }} color="error" variant="outlined" disableElevation onClick={onLogout}>
                Logout
              </Button>
              <Button sx={{ px: 4 }} disableElevation variant="contained" onClick={handleClose} autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      )}
    </>
  );
};

export default Profile;
