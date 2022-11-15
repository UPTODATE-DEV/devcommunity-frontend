import React from "react";
import EmptyIcon from "@/assets/empty.svg";
import { alpha, Stack, Typography } from "@mui/material";
import Image from "next/image";

const Empty = () => {
  return (
    <Stack
      sx={{ width: 1, height: 1, minHeight: 400, position: "relative" }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        sx={{
          width: 150,
          height: 150,
          borderRadius: 100,
          mx: "auto",
          mb: 2,
          p: 3,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
        }}
      >
        <Image alt="Empty icon" src={EmptyIcon} width={100} objectFit="contain" />
      </Stack>
      <Typography variant="h6" color="text.secondary" textAlign="center">
        No data found
      </Typography>
    </Stack>
  );
};

export default Empty;
