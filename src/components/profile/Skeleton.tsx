import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export function QuestionsListSkeleton() {
  return (
    <Stack spacing={2}>
      {[...Array(3)].map((_, i) => (
        <Paper variant="outlined" sx={{ p: 2 }} key={i}>
          <Stack direction="row" spacing={2} sx={{ py: 2, px: 1 }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
            <Stack spacing={2} sx={{ width: 1 }}>
              <Skeleton variant="rectangular" width={120} height={5} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={10} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={10} sx={{ borderRadius: 2 }} />
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}

export function TabsSkeleton() {
  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction="row" sx={{ width: 1 }}>
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
      </Stack>
    </Stack>
  );
}

export function ProfileSkeleton() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rectangular" width="100%" height={150} sx={{ borderRadius: 1 }} />
      <ProfileQuestionTabsSkeleton />
    </Stack>
  );
}

export function ProfileQuestionTabsSkeleton() {
  return (
    <Stack spacing={2}>
      <TabsSkeleton />
      <QuestionsListSkeleton />
    </Stack>
  );
}
