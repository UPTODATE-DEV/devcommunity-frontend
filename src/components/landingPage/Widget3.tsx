import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
const data = [
  {
    title: "Connect with people",
    description:
      "Follow and engage discussion with developers, creators and fellow users with shared interests and don’t miss out on their content.",
    image: "/images/landingPage/hero3.png",
  },
  {
    title: "Créer des connections",
    description:
      "Suivez et engagez la discussion avec les développeurs, les créateurs et les autres utilisateurs ayant des intérêts communs et ne ratez pas leur contenu.",
    image: "/images/landingPage/hero3.png",
  },
];

const Widget3 = () => {
  const { locale } = useRouter();
  const { title, description, image } = data[locale === "en" ? 0 : 1];

  return (
    <Container sx={{ py: 4 }}>
      <Grid direction={{ xs: "column-reverse", md: "row" }} container justifyContent="center" alignItems="center">
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

export default Widget3;
