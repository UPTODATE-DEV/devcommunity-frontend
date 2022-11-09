import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Contributors = () => {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ bgcolor: "background.paper", py: 4 }}>
      <Typography color="text.primary" variant="h6" textAlign="center">
        Learn how you can
      </Typography>
      <Typography color="text.secondary" textAlign="center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptatum dolorum blanditiis maiores?
      </Typography>
      <Stack justifyContent="center" alignItems="center" direction="row" sx={{ py: 2 }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main", color: "white" }}>L</Avatar>
      </Stack>
    </Stack>
  );
};

export default Contributors;
