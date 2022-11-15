import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";

const data = [
  {
    title: "Contribute to developing Updev Community",
    description:
      "Missing a feature on Updev Community? You can help implement and bring it to life by yourself since Updev Community is an open source project.    ",
  },
  {
    title: "Contribuer au développement de la communauté Updev",
    description:
      "Une fonctionnalité manque sur Updev Community? Vous pouvez aider à l'implémenter et la rendre vivante par vous-même puisque Updev Community est un projet open source.",
  },
];

const Contributors = () => {
  const { locale } = useRouter();
  const { title, description } = data[locale === "en" ? 0 : 1];
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ bgcolor: "background.paper", py: 4 }}>
      <Typography gutterBottom sx={{ width: { xs: 1, md: 0.7 } }} color="text.primary" variant="h6" textAlign="center">
        {title}
      </Typography>
      <Typography sx={{ width: { xs: 1, md: 0.6 } }} color="text.secondary" textAlign="center" gutterBottom>
        {description}
      </Typography>
      <Stack justifyContent="center" alignItems="center" direction="row" sx={{ py: 4 }}>
        <a href="https://github.com/luccin243" target="_blank" rel="noreferrer noopener">
          <IconButton>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main", color: "white" }}>L</Avatar>
          </IconButton>
        </a>
      </Stack>
    </Stack>
  );
};

export default Contributors;