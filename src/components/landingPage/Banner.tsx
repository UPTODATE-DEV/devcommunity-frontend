import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const data = [
  {
    title: "Where developers grow together",
    description: "Creating room for developers and technologists to learn, share and upgrade skills and knowledge",
    buttons: {
      un: "Get started",
      deux: "How it works",
    },
  },
  {
    title: "Grandir ensemble en tant que développeurs",
    description:
      "Créer un espace permettant aux développeurs d'apprendre, de partager et d'améliorer leurs compétences et leurs connaissances",
    buttons: {
      un: "Commencer",
      deux: "Comment ça marche",
    },
  },
];

const Banner = () => {
  const { locale } = useRouter();
  const { title, description, buttons } = data[locale === "en" ? 0 : 1];

  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      <Container sx={{ py: 10 }}>
        <Stack justifyContent="center" alignItems="center" spacing={4} sx={{ py: 4 }}>
          <Typography
            textAlign="center"
            variant="h2"
            fontWeight={600}
            sx={{ width: { xs: 1, md: 0.6 }, typography: { fontSize: { xs: "1.5rem", md: "3.5rem" } } }}
            color="text.primary"
          >
            {title}
          </Typography>
          <Typography sx={{ width: { xs: 1, md: 0.8 } }} textAlign="center" color="text.secondary">
            {description}
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Button variant="contained" disableElevation={true} color="primary" sx={{ borderRadius: 50, px: 4, py: 1 }}>
              {buttons.un}
            </Button>
            <Button sx={{ borderRadius: 50, px: 4, py: 1 }}>{buttons.deux}</Button>
          </Stack>
          <Stack
            sx={{
              width: { xs: 1, md: 0.9 },
              height: { xs: 230, md: 600 },
              position: "relative",
            }}
          >
            <Image src="/images/og-image.jpg" layout="fill" objectFit="contain" />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Banner;
