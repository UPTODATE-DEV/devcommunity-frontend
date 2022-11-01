import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";

const Value = () => {
  return (
    <Container sx={{ bgcolor: "background.paper" }}>
      <Stack alignItems="center" spacing={{ xs: 2, md: 10 }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ width: { xs: 1, md: 0.7 }, mx: "auto" }}>
          {[...Array(3)].map((el, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Stack sx={{ mx: 1, py: 4 }} justifyContent="center" alignItems="center" spacing={4}>
                <Stack sx={{ width: 90, height: 90, position: "relative" }}>
                  <Image src="/megaphone-core.svg" layout="fill" alt="Updev community" objectFit="contain" />
                </Stack>
                <Typography color="text.secondary">Learn how you can</Typography>
                <Stack sx={{ width: { xs: 1, md: 160 }, height: 4, bgcolor: "divider" }}></Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Stack sx={{ width: { xs: 1, md: 0.7 }, height: { xs: 300, md: 600 }, position: "relative" }}>
          <Image src="/app-18.png" layout="fill" objectFit="contain" />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Value;
