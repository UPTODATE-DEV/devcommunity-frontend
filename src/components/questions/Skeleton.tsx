import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import React from "react";

export function QuestionsListSkeleton() {
  return (
    <Stack spacing={2}>
      {[...Array(3)].map((_, i) => (
        <React.Fragment key={i}>
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
        </React.Fragment>
      ))}
    </Stack>
  );
}
