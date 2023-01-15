import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";

const data = [
  {
    title: "Nos partenaires",
    description: "Nous travaillons avec les meilleurs",
  },
  {
    title: "Our partners",
    description: "We work with the best",
  },
];

const partners = [
  [
    {
      title: "Partners 1",
      image: "/images/partners/1.png",
    },
    {
      title: "Partners 2",
      image: "/images/partners/2.png",
    },
    {
      title: "Partners 3",
      image: "/images/partners/3.png",
    },
  ],
  [
    {
      title: "Partenaires 1",
      image: "/images/partners/1.png",
    },
    {
      title: "Partenaires 2",
      image: "/images/partners/2.png",
    },
    {
      title: "Partenaires 3",
      image: "/images/partners/3.png",
    },
  ],
];

const Partners: React.FC = () => {
  const { locale } = useRouter();

  const { title, description } = data[locale === "en" ? 0 : 1];

  return (
    <Container sx={{ position: "relative", py: 6 }}>
      <Stack justifyContent="center" sx={{ width: { xs: 1, md: 0.5 }, mx: "auto" }}>
        <Typography textAlign="center" color="text.primary" fontWeight={700} variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography textAlign="center" color="text.secondary" gutterBottom>
          {description}
        </Typography>
      </Stack>
      <Stack sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {partners[locale === "en" ? 0 : 1].map((el, i) => (
            <Grid key={i} item xs={6} sm={3} md={2}>
              <Stack sx={{ position: "relative", width: 1, height: 100 }}>
                <Image src={el.image} alt={el.title} layout="fill" objectFit="contain" />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default Partners;
