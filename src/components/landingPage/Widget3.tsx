import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Widget3 = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Stack sx={{ width: 1, height: 350, position: "relative" }}>
            <Image src="/widget-22-blue.png" layout="fill" objectFit="contain" />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack sx={{ width: 0.7, mx: "auto", position: "relative" }}>
            <Typography variant="h4" color="text.primary">
              Track Your Tasks
            </Typography>
            <Typography color="text.secondary">
              Lorem ipsum dolor sit amet, clita laoreet ne cum. His cu harum inermis iudicabit. Ex vidit fierent
              hendrerit eum, sed stet periculis ut. Vis in probo decore labitur.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Widget3;
