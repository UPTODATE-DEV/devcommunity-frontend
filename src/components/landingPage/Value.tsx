import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const data = [
  [
    {
      title: "Explorer",
      description:
        "Lisez, apprenez, trouvez des astuces, les meilleures pratiques et acquérez de nouvelles connaissances auprès des développeurs et experts ",
      image: "/images/landingPage/illustration1.png",
    },
    {
      title: "Interagir",
      description:
        "Commentez et réagissez aux posts et articles des autres autant vous aimez leur contenu ou le trouvez inspirant ou utile",
      image: "/images/landingPage/illustration2.png",
    },
    {
      title: "Partager",
      description:
        "Publiez votre propre contenu à travers des posts et des articles selon votre domaine et votre niveau d'expertise pour inspirer les autres",
      image: "/images/landingPage/illustration3.png",
    },
  ],
  [
    {
      title: "Explore",
      description:
        "Learn about the topics of choice and find tips, best practices and pieces of knowledge from fellow developers and experts",
      image: "/images/landingPage/illustration1.png",
    },
    {
      title: "Interact",
      description:
        "Interact with others with comments and reactions on their posts and articles as you like them or find them inspiring or helpful",
      image: "/images/landingPage/illustration2.png",
    },
    {
      title: "Share",
      description:
        "Publish your own content through posts and articles depending on your field and level of expertise to inspire others",
      image: "/images/landingPage/illustration3.png",
    },
  ],
];

const Value = () => {
  const { locale } = useRouter();

  return (
    <Container sx={{ bgcolor: "background.paper" }} id="HowItsWorks">
      <Stack alignItems="center" spacing={{ xs: 2, md: 10 }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ width: { xs: 1, md: 0.7 }, mx: "auto" }}>
          {data[locale === "en" ? 1 : 0].map((el, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Stack sx={{ mx: 1, py: 4 }} justifyContent="center" alignItems="center" spacing={4}>
                <Stack sx={{ width: 90, height: 90, position: "relative" }}>
                  <Image src={el.image} layout="fill" alt="Updev community" objectFit="contain" />
                </Stack>
                <Typography color="text.primary" variant="h6" textAlign="center">
                  {el.title}
                </Typography>
                <Typography color="text.secondary" textAlign="center">
                  {el.description}
                </Typography>
                <Stack sx={{ width: { xs: 1, md: 160 }, height: 4, bgcolor: "divider" }}></Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default Value;
