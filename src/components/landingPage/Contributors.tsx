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
    title: "Contribute to developing Dev Community",
    description:
      "Missing a feature on Dev Community? You can help implement and bring it to life by yourself since Dev Community is an open source project.    ",
  },
  {
    title: "Contribuer au développement de Dev Community",
    description:
      "Vous manquez une fonctionnalité sur Dev Community? Vous pouvez aider à l'implémenter et à l’intégrer par vous-même. Dev Community est un projet open source",
  },
];

const contributors = [
  {
    name: "Uptodate Developers",
    picture: "https://github.com/UPTODATE-DEV.png",
    github: "https://github.com/UPTODATE-DEV",
  },
  {
    name: "Dan Baruka",
    picture: "https://github.com/danbaruka.png",
    github: "https://github.com/danbaruka",
  },
  {
    name: "Josephine Ndeze",
    picture: "https://github.com/ndezejosephine.png",
    github: "https://github.com/ndezejosephine",
  },
  {
    name: "Luccin Masirika",
    picture: "https://github.com/luccinmasirika.png",
    github: "https://github.com/luccinmasirika",
  },
  {
    name: "Jack Mutobu",
    picture: "https://github.com/JackMutobu.png",
    github: "https://github.com/JackMutobu",
  },
  {
    name: "Yannick Senga",
    picture: "https://github.com/yannick243.png",
    github: "https://github.com/yannick243",
  },
  {
    name: "Maurice Bagalwa",
    picture: "https://github.com/MauriceBagalwa.png",
    github: "https://github.com/MauriceBagalwa",
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
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ py: 3 }}>
        {contributors.map((contributor) => (
          <Grid item xs="auto" key={contributor.name}>
            <a
              title={contributor.name}
              key={contributor.github}
              href={contributor.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <IconButton>
                <Avatar
                  sx={{ width: 80, height: 80, bgcolor: "primary.main", color: "white" }}
                  src={contributor.picture}
                >
                  L
                </Avatar>
              </IconButton>
            </a>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Contributors;
