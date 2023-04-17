import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/router";
import BGAnimation from "./BGAnimation";

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
      "Espace d’échange et de connection entre développeurs pour partager et améliorer leurs compétences et connaissances",
    buttons: {
      un: "Commencer",
      deux: "Comment ça marche",
    },
  },
];

const Banner = () => {
  const { locale, push } = useRouter();
  const { title, description, buttons } = data[locale === "en" ? 0 : 1];

  return (
    <Box sx={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <BGAnimation />
      <Container sx={{ py: 10, position: "relative" }}>
        <Stack justifyContent="center" alignItems="center" spacing={4} sx={{ py: 4 }}>
          <Typography
            textAlign="center"
            variant="h2"
            fontWeight={600}
            sx={{ width: { xs: 1, md: 0.6 }, fontSize: { xs: "2.5rem", md: "3.5rem" } }}
            color="text.primary"
          >
            {title}
          </Typography>
          <Typography sx={{ width: { xs: 1, md: 0.8 } }} textAlign="center" color="text.secondary">
            {description}
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Button
              onClick={() => push("/")}
              variant="contained"
              disableElevation={true}
              color="primary"
              sx={{ borderRadius: 50, px: 4, py: 1 }}
            >
              {buttons.un}
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => push("/home/#HowItsWorks")}
              sx={{ borderRadius: 50, px: 4, py: 1 }}
            >
              {buttons.deux}
            </Button>
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
