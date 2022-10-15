import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export function TagsSkeleton() {
  return (
    <Box>
      <Grid container spacing={2}>
        {[...Array(33)].map((el, i) => (
          <Grid item xs={4} key={i}>
            <Skeleton variant="rectangular" sx={{ borderRadius: 50, width: 1 }} height={32} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
