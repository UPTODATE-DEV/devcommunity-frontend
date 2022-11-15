import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const data = [
  {
    title: "Customize your feed",
    description:
      "Follow content and topics of choice by using tags as all posts and articles are assigned to one or more hashtags",
    image: "/images/landingPage/hero2.png",
  },
  {
    title: "Personnalisez votre flux",
    description:
      "Suivez le contenu et les sujets de votre choix en utilisant des tags. Tous les posts et articles sont assignés à un ou plusieurs hashtags",
    image: "/images/landingPage/hero2.png",
  },
];

const Widget2 = () => {
  const { locale } = useRouter();
  const { title, description, image } = data[locale === "en" ? 0 : 1];

  return (
    <Container sx={{ py: 4 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Stack sx={{ width: { xs: 1, md: 0.7 }, mx: "auto", position: "relative" }}>
            <Typography variant="h4" color="text.primary">
              {title}
            </Typography>
            <Typography color="text.secondary">{description}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack sx={{ width: 1, height: 350, position: "relative" }}>
            <Image src={image} layout="fill" objectFit="contain" />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Widget2;
