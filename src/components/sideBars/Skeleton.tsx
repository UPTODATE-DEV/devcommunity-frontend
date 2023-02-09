import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export function LeftBarSkeleton() {
  const SkeletonSection = ({ list }: { list: number[] }) => {
    return (
      <>
        {list.map((width, index) => (
          <Stack key={index} direction="row" alignItems="center" spacing={4} sx={{ width: 1 }}>
            <Skeleton variant="rectangular" width={30} height={30} sx={{ flexShrink: 0, borderRadius: 50 }} />
            <Skeleton variant="rectangular" width={width} height={15} sx={{ borderRadius: 50 }} />
          </Stack>
        ))}
      </>
    );
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, width: 1 }} component={Stack} spacing={4}>
      <SkeletonSection list={[80, 50, 70, 50, 90]} />
      <Divider sx={{ width: 1 }} />
      <SkeletonSection list={[40, 70, 90]} />
    </Paper>
  );
}

export function ListItemsSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Stack key={index} direction="row" alignItems="center" spacing={2} sx={{ p: 2 }}>
          <Skeleton variant="rectangular" width={40} height={40} sx={{ flexShrink: 0, borderRadius: 50 }} />
          <Stack spacing={2} sx={{ width: 1 }}>
            <Skeleton variant="rectangular" width="100%" height={20} sx={{ borderRadius: 50 }} />
            {[...Array(2)].map((_, index) => (
              <Skeleton variant="rectangular" key={index} width="100%" height={10} sx={{ borderRadius: 50 }} />
            ))}
          </Stack>
        </Stack>
      ))}
    </>
  );
}

export function RightBarSkeleton() {
  const SkeletonSection = () => (
    <>
      <Stack sx={{ p: 2 }}>
        <Skeleton variant="rectangular" width={280} height={25} sx={{ borderRadius: 50 }} />
      </Stack>

      <Divider sx={{ width: 1 }} />

      <ListItemsSkeleton />

      <Divider sx={{ width: 1 }} />
    </>
  );

  return (
    <Paper variant="outlined" sx={{ p: 2 }} component={Stack}>
      {[...Array(2)].map((_, index) => (
        <SkeletonSection key={index} />
      ))}
    </Paper>
  );
}
