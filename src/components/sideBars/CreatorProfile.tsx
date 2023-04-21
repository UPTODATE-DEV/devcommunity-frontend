import { FILES_BASE_URL } from "@/config/url";
import { getRequest, getUserFullName, patchRequest } from "@/lib";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import useStore from "../../hooks/useStore";

const CreatorProfile = () => {
  const { query, locale } = useRouter();
  const session = useStore((state) => state.session?.user);
  const [follow, setFollow] = React.useState(false);
  const [followings, setFollowings] = React.useState<{ user: User }[]>([]);
  const [followers, setFollowers] = React.useState<{ user: User }[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [followed, setFollowed] = React.useState(false);

  const handleToggleFollow = async () => {
    if (user && user.id) {
      setLoading(true);
      const response = await patchRequest({ endpoint: `/users/${session?.id}/follow/${user.id}` });
      if (response.data) {
        setFollow((state) => !state);
      }
      setLoading(false);
    }
  };

  async function getFollowings() {
    if (user && user.id) {
      const response = await getRequest({ endpoint: `/users/${user.id}/followings` });
      if (response.data) {
        return response.data;
      }
    }
  }

  async function getFollowers() {
    if (user && user.id) {
      const response = await getRequest({ endpoint: `/users/${user.id}/followers` });
      if (response.data) {
        return response.data;
      }
    }
  }

  async function getArticles() {
    const response = await getRequest({ endpoint: `/posts/${query?.slug}` });
    return response.data;
  }

  React.useEffect(() => {
    async function getFollowingsAndFollowers() {
      const [followings, followers, article] = await Promise.all([getFollowings(), getFollowers(), getArticles()]);
      setFollowings(followings);
      setFollowers(followers);
      setFollow(followers?.some((follower: any) => follower?.userId === session?.id));
      setUser(article?.author);
    }

    getFollowingsAndFollowers();
  }, [user?.id]);

  if (!user || user.role !== "AUTHOR") {
    return null;
  }

  return (
    <Paper variant="outlined" component={Stack} spacing={2} sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ position: "relative" }}>
        <Stack direction="row" spacing={1} justifyContent="center">
          {user?.firstName && user?.lastName && (
            <Stack>
              {user?.profile?.avatar ? (
                <Stack
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    width: { xs: 40, md: 60 },
                    height: { xs: 40, md: 60 },
                    position: "relative",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    alt={`${user?.firstName} ${user?.lastName}`}
                    src={`${FILES_BASE_URL}${user?.profile?.avatar?.url}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </Stack>
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
              <Typography variant="h6" sx={{ fontSize: { xs: 14, md: 16 } }} color="text.primary" fontWeight={700}>
                {getUserFullName(user)}
              </Typography>
              {user?.role === "AUTHOR" && <VerifiedIcon color="primary" />}
            </Stack>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Stack
                direction="row"
                sx={{ cursor: "pointer" }}
                spacing={1}
                alignItems="center"
                //   onClick={() => handleViewFollowingsFollowersDialog("followings")}
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
                  // onClick={() => handleViewFollowingsFollowersDialog("followers")}
                >
                  <Typography color="text.primary">{followers?.length || 0}</Typography>
                  <Typography color="text.secondary">{locale === "fr" ? "Abonnés" : "Followers"}</Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        {session?.id && user?.id && user?.id !== session?.id && (
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
      </Stack>
    </Paper>
  );
};

export default CreatorProfile;
