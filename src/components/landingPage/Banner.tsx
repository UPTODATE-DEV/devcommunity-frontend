import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Banner = () => {
  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      <Container sx={{ py: 10 }}>
        <Stack justifyContent="center" alignItems="center" spacing={3} sx={{ py: 4 }}>
          <Typography textAlign="center" variant="h3" color="text.primary">
            Get Qualified Prospects
          </Typography>
          <Typography textAlign="center" color="text.secondary">
            Learn how you can win all your potential deals.
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Button variant="contained" disableElevation={true} color="primary" sx={{ borderRadius: 50, px: 4, py: 1 }}>
              Get started
            </Button>
            <Button sx={{ borderRadius: 50, px: 4, py: 1 }}>Try free</Button>
          </Stack>
          <Stack
            sx={{
              width: 0.7,
              height: { xs: 400, md: 600 },
              position: "relative",
            }}
          >
            <Image src="/app-18.png" layout="fill" objectFit="contain" />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Banner;
