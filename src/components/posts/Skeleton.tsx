import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import React from "react";
import Divider from "@mui/material/Divider";

export function PostsListSkeleton() {
  return (
    <Stack spacing={2}>
      {[...Array(3)].map((_, i) => (
        <React.Fragment key={i}>
          <Stack direction="row" spacing={2} sx={{ py: 2, px: 1 }} key={i}>
            <Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
            <Stack spacing={2} sx={{ width: 1 }}>
              <Skeleton variant="rectangular" width={120} height={5} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={10} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={10} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: 2 }} />
            </Stack>
          </Stack>
          <Divider />
        </React.Fragment>
      ))}
    </Stack>
  );
}

export function PostsFormSkeleton() {
  return (
    <Stack spacing={2}>
      <Stack spacing={2} sx={{ width: 1 }}>
        <Skeleton variant="rectangular" width="100%" height={160} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={50} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={50} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={130} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={100} height={50} sx={{ borderRadius: 50 }} />
      </Stack>
    </Stack>
  );
}
