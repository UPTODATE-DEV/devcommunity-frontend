import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export function IconsSkeletons() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Skeleton sx={{ display: { xs: "none", md: "flex" } }} variant="circular" width={35} height={35} />
      <Skeleton sx={{ display: { xs: "none", md: "flex" } }} variant="circular" width={35} height={35} />
      <Skeleton variant="circular" width={35} height={35} />
    </Stack>
  );
}

export function ProfileSkeleton() {
  return <Skeleton variant="rectangular" width={160} height={40} sx={{ borderRadius: 50 }} />;
}

export function LogoSkeleton() {
  return (
    <Stack sx={{ display: { xs: "none", md: "flex" } }} direction="row" alignItems="center">
      <Skeleton variant="circular" width={50} height={50} />
      <Skeleton variant="rectangular" width={60} height={30} />
    </Stack>
  );
}
