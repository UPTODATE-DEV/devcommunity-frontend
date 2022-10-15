import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import React from "react";
import Divider from "@mui/material/Divider";

export function CallToActionSkeleton() {
  return (
    <Stack spacing={4} sx={{ bgcolor: "action.hover", p: 4, borderRadius: 2 }}>
      <Stack spacing={2}>
        <Skeleton variant="rectangular" width="100%" height={20} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={20} sx={{ borderRadius: 2 }} />
      </Stack>
      <Stack spacing={2}>
        <Skeleton variant="rectangular" width="100%" height={10} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={10} sx={{ borderRadius: 2 }} />
      </Stack>
      <Skeleton variant="rectangular" width={140} height={40} sx={{ borderRadius: 50 }} />
    </Stack>
  );
}

export function HomeFeedSkeleton() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
        <Stack spacing={2} sx={{ width: 1 }}>
          <Skeleton variant="rectangular" width={120} height={5} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={20} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={10} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={10} sx={{ borderRadius: 2 }} />
        </Stack>
      </Stack>
      <Divider />
      {[...Array(2)].map((_, i) => (
        <React.Fragment key={i}>
          <Stack direction="row" spacing={2} sx={{ p: 2 }} key={i}>
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
