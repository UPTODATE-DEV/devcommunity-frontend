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

const ProfileTabs = dynamic(import("@/components/profile/ProfileTabs"), { ssr: false, loading: () => null });

const Profile = () => {
  const user = useStore((state) => state.session?.user);
  const { push } = useRouter();

  const handleGoProfile = () => {
    push("/profile");
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <Avatar sx={{ width: 60, height: 60 }} alt={`${user?.firstName} ${user?.lastName}`} src="/avatar.avif">
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
        <Stack>
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
      </Stack>
      <ProfileTabs />
    </Stack>
  );
};

export default Profile;
