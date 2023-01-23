import { FILES_BASE_URL } from "@/config/url";
import useStore from "@/hooks/useStore";
import useStoreNoPersist from "@/hooks/useStoreNoPersist";
import useUser from "@/hooks/useUser";
import { getUserFullName } from "@/lib";
import { getRequest, patchRequest, postLocalRequest } from "@/lib/api";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import EditIcon from "@mui/icons-material/EditOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import TwitterIcon from "@mui/icons-material/Twitter";
import VerifiedIcon from "@mui/icons-material/Verified";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { googleLogout } from "@react-oauth/google";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { ProfileQuestionTabsSkeleton } from "./Skeleton";
import UserFollowers from "./UserFollowers";

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
  const setSession = useStore((state) => state.setSession);
  const useUserData = useUser(session?.username);
  const [followings, setFollowings] = React.useState<{ user: User }[]>([]);
  const [followers, setFollowers] = React.useState<{ user: User }[]>([]);
  const user = currentUser || useUserData;
  const { reload, locale } = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { editProfile, setEditProfile } = useStoreNoPersist((state) => state);
  const [status, setStatus] = React.useState<"PENDING" | "ACCEPTED" | "REJECTED" | "idle">("idle");
  const [openRequestModal, setOpenRequestModal] = React.useState(false);
  const [openRequestApprovedModal, setOpenRequestApprovedModal] = React.useState(false);
  const [follow, setFollow] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [viewFollowingsFollowersDialog, setViewFollowingsFollowersDialog] = React.useState(false);
  const [viewType, setViewType] = React.useState<"followers" | "followings">("followers");

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseRequestApprovedModal = () => {
    setOpenRequestApprovedModal(false);
    handleCloseMenu();
  };

  const handleCloseRequestModal = () => {
    setOpenRequestModal(false);
    handleCloseMenu();
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

  const handleViewFollowingsFollowersDialog = (type: "followers" | "followings") => {
    setViewType(type);
    setViewFollowingsFollowersDialog(true);
  };

  const handleViewFollowingsFollowersDialogClose = () => {
    setViewFollowingsFollowersDialog(false);
  };

  const onLogout = async () => {
    googleLogout();
    await postLocalRequest({ endpoint: "/api/logout" });
    handleClose();
    reload();
  };

  const handleRequestCreator = async () => {
    const days = dayjs(new Date()).diff(user?.createdAt, "days");

    if (user && user?.posts?.length >= 10 && days >= 14) {
      const response = await patchRequest({ endpoint: `/users/${session?.id}/request-author` });
      if (response.data) {
        setStatus((state) => (state === "PENDING" ? "idle" : "PENDING"));
      }
      setOpenRequestApprovedModal(true);
      handleCloseMenu();
      return;
    }
    setOpenRequestModal(true);
  };

  const handleToggleFollow = async () => {
    if (currentUser !== undefined) {
      setLoading(true);
      const response = await patchRequest({ endpoint: `/users/${session?.id}/follow/${currentUser?.id}` });
      if (response.data) {
        setFollow((state) => !state);
      }
      setLoading(false);
    }
  };

  async function getFollowings() {
    const response = await getRequest({ endpoint: `/users/${user?.id}/followings` });
    if (response.data) {
      return response.data;
    }
  }

  async function getFollowers() {
    const response = await getRequest({ endpoint: `/users/${user?.id}/followers` });
    if (response.data) {
      return response.data;
    }
  }

  React.useEffect(() => {
    async function getFollowingsAndFollowers() {
      const [followings, followers] = await Promise.all([getFollowings(), getFollowers()]);
      setFollowings(followings);
      setFollowers(followers);
      setFollow(followers?.some((follower: any) => follower?.userId === session?.id));
    }

    if (useUserData) {
      setStatus(useUserData?.authorRequest[0]?.status);
      getFollowingsAndFollowers();
      setLoading(false);
    }
  }, [useUserData]);

  return (
    <>
      <UserFollowers
        open={viewFollowingsFollowersDialog}
        handleClose={handleViewFollowingsFollowersDialogClose}
        data={viewType === "followers" ? followers : followings}
      />
      {user?.id && (
        <>
          <Paper variant="outlined" component={Stack} spacing={2} sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ position: "relative" }}>
              <Stack direction="row" spacing={1} justifyContent="center">
                {user?.firstName && user?.lastName && (
                  <Stack>
                    {user?.profile?.avatar ? (
                      <Avatar
                        sx={{
                          width: { xs: 40, md: 60 },
                          height: { xs: 40, md: 60 },
                          bgcolor: "primary.main",
                          color: "white",
                        }}
                        alt={`${user?.firstName} ${user?.lastName}`}
                        src={`${FILES_BASE_URL}${user?.profile?.avatar?.url}`}
                      >
                        {`${user?.firstName[0]} ${user?.lastName[0]}`}
                      </Avatar>
                    ) : (
                      <Avatar
                        sx={{
                          width: { xs: 40, md: 60 },
                          height: { xs: 40, md: 60 },
                          bgcolor: "primary.main",
                          color: "white",
                          fontSize: 16,
                          fontWeight: 700,
                        }}
                        alt={`${user?.firstName} ${user?.lastName}`}
                      >
                        {`${user?.firstName[0]} ${user?.lastName[0]}`}
                      </Avatar>
                    )}
                  </Stack>
                )}
                <Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      variant="h6"
                      sx={{ fontSize: { xs: 14, md: 16 } }}
                      color="text.primary"
                      fontWeight={700}
                    >
                      {getUserFullName(user)}
                    </Typography>
                    {user?.role === "AUTHOR" && <VerifiedIcon color="primary" />}
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {user?.email}
                  </Typography>
                  <Typography flexWrap="nowrap" variant="caption" color="text.secondary" noWrap sx={{ width: 1 }}>
                    {user?.profile?.job}
                  </Typography>
                  <Typography variant="caption" fontSize={10} color="text.secondary">
                    {locale === "en" ? "Member Since" : "Membre depuis"} {dayjs(user?.createdAt).format("YYYY")}
                  </Typography>
                </Stack>
              </Stack>

              <Stack spacing={2} alignItems="flex-end" flexShrink={1} sx={{ position: "absolute", right: 1, top: 0 }}>
                <Stack direction="row" spacing={1}>
                  {currentUser !== undefined && user?.role === "AUTHOR" && user?.id !== session?.id && (
                    <Button
                      disableElevation
                      sx={{ borderRadius: 50, px: 2, fontSize: { xs: 8, md: 12 } }}
                      onClick={handleToggleFollow}
                      disabled={loading}
                      size="small"
                      endIcon={follow ? <CheckCircleIcon /> : <AddIcon />}
                      variant={follow ? "contained" : "outlined"}
                    >
                      {loading
                        ? locale === "fr"
                          ? "Chargement..."
                          : "Loading..."
                        : follow
                        ? locale === "en"
                          ? "Following"
                          : "Abonné"
                        : locale === "en"
                        ? "Follow"
                        : "Suivre"}
                    </Button>
                  )}

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
                </Stack>

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
                  <MenuItem onClick={handleEditProfile} key="edit">
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{locale === "en" ? "Edit Profile" : "Modifier le profil"}</ListItemText>
                  </MenuItem>

                  {currentUser === undefined && user?.role !== "AUTHOR" && status !== "PENDING" && (
                    <MenuItem onClick={handleRequestCreator} key="request">
                      <ListItemIcon>
                        <VerifiedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>{locale === "fr" ? "Devenir créateur" : "Become a creator"}</ListItemText>
                    </MenuItem>
                  )}

                  <MenuItem onClick={handleClickOpen} key="logout">
                    <ListItemIcon>
                      <PowerSettingsNewIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{locale === "en" ? "Log out" : "Déconnexion"}</ListItemText>
                  </MenuItem>
                </Menu>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Stack
                direction="row"
                sx={{ cursor: "pointer" }}
                spacing={1}
                alignItems="center"
                onClick={() => handleViewFollowingsFollowersDialog("followings")}
              >
                <Typography color="text.primary">{followings?.length || 0}</Typography>

                <Typography color="text.secondary">{locale === "fr" ? "Abonnements" : "Followings"}</Typography>
              </Stack>

              {user?.role === "AUTHOR" && (
                <Stack
                  direction="row"
                  sx={{ cursor: "pointer" }}
                  spacing={1}
                  alignItems="center"
                  onClick={() => handleViewFollowingsFollowersDialog("followers")}
                >
                  <Typography color="text.primary">{followers?.length || 0}</Typography>
                  <Typography color="text.secondary">{locale === "fr" ? "Abonnés" : "Followers"}</Typography>
                </Stack>
              )}
            </Stack>

            <Typography color="text.secondary">{user?.profile?.bio}</Typography>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {locale === "en" ? "Confirm Logout" : "Confirmer la déconnexion"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {locale === "en" ? "Are you sure you want to log out?" : "Êtes-vous sûr de vouloir vous déconnecter?"}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button sx={{ px: 4 }} color="error" variant="outlined" disableElevation onClick={onLogout}>
                  {locale === "en" ? "Log out" : "Déconnexion"}
                </Button>
                <Button sx={{ px: 4 }} disableElevation variant="contained" onClick={handleClose} autoFocus>
                  {locale === "en" ? "Cancel" : "Annuler"}
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openRequestModal}
              onClose={handleCloseRequestModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {locale === "en"
                  ? "Your account is not yet eligible to become a creator"
                  : "Votre compte n'est pas encore éligible à devenir créateur"}
              </DialogTitle>
              <DialogContent sx={{ alignItems: "center", textAlign: "center" }}>
                <DialogContentText sx={{ fontWeight: 700 }} id="alert-dialog-description">
                  {locale === "en" ? "To be eligible" : "Pour être éligible"}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  {locale === "en"
                    ? "You must have joined Updev Community for at least 14 days"
                    : "Vous devez avoir rejoint Updev Community au moins depuis 14 jours"}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  {locale === "en"
                    ? "You must have published at least 10 articles or posts"
                    : "Vous devez avoir publié au moins 10 articles ou posts"}
                </DialogContentText>
              </DialogContent>
            </Dialog>

            <Dialog
              open={openRequestApprovedModal}
              onClose={handleCloseRequestApprovedModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent sx={{ alignItems: "center", textAlign: "center" }}>
                <CheckCircleTwoToneIcon color="success" fontSize="large" sx={{ mb: 2, fontSize: { xs: 34, md: 56 } }} />
                <DialogContentText id="alert-dialog-description">
                  {locale === "en"
                    ? "Your request to become a creator has been sent successfully. We reserve the right to verify the authenticity of your account and to assess the relevance of your content. You will be notified if your account is validated or not as a creator."
                    : "Votre requête à devenir créateur a été envoyée avec succès. Nous nous réservons de vérifier l'authenticité de votre compte et d'évaluer la pertinence de votre contenu. Vous serez notifié en cas de validation ou non de votre compte en tant que créateur"}
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </Paper>
          {editProfile ? <ProfileEditForm user={user} /> : <ProfileTabs currentUser={currentUser} />}
        </>
      )}
    </>
  );
};

export default Profile;
