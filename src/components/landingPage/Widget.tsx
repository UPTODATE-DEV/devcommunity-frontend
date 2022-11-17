import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const data = [
  {
    title: "Got stacked? Get help",
    description:
      "Leave your questions to the community. There is surely somebody who can help. Answers are sorted by the number of votes they get.",
    image: "/images/landingPage/hero1.png",
  },
  {
    title: "Obtenir de l'aide",
    description:
      "Laissez vos questions à la communauté. Il y a sûrement quelqu'un qui peut aider. Les réponses sont triées en fonction du nombre de votes qu'elles obtiennent.",
    image: "/images/landingPage/hero1.png",
  },
];

const Widget = () => {
  const { locale } = useRouter();
  const { title, description, image } = data[locale === "en" ? 0 : 1];
  return (
    <Container sx={{ py: 4, mt: 8 }} id="HowItsWorks">
      <Grid container justifyContent="center" alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
        <Grid item xs={12} md={6} sx={{ width: 1 }}>
          <Stack sx={{ width: 1, height: 350, position: "relative" }}>
            <Image src={image} layout="fill" objectFit="contain" />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack sx={{ width: { xs: 1, md: 0.7 }, mx: "auto", position: "relative" }}>
            <Typography variant="h4" color="text.primary">
              {title}
            </Typography>
            <Typography color="text.secondary">{description}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Widget;
