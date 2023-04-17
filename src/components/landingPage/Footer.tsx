import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const data = [
  {
    title: "Ready to join the community?",
    description:
      "If you notice a missing feature, an error, or an idea to add, do not hesitate to improve this community space",
    button: "Contact us",
    about: "Room for developers to connect, learn, share skills and knowledge and grow as a community",
  },
  {
    title: "Prêt à rejoindre la communauté?",
    description:
      "Si vous remarquez une fonctionnalité qui manque, une erreur, ou une idée à ajouter, n'hésitez pas d'améliorer cet espace communautaire.",
    button: "Nous contacter",
    about:
      "Plateforme d’échange et de connection entre développeurs pour partager et améliorer leurs compétences et connaissances et grandir en tant que communauté",
  },
];

const Footer = ({ menu }: { menu: any }) => {
  console.log("🚀 ~ file: Footer.tsx:31 ~ Footer ~ menu:", menu)
  const { locale, route } = useRouter();
  const { title, description, button, about } = data[locale === "en" ? 0 : 1];
  const matches = (path: string): boolean => `/${route.split("/")[1]}` === path;

  const navigations = [
    { name: locale === "en" ? "Home" : "Accueil", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Posts", path: "/posts" },
  ];

  return (
    <Box sx={{ bgcolor: "background.paper", borderTop: (theme) => `2px solid ${theme.palette.action.hover}` }}>
      <Container sx={{ py: 4 }}>
        <Stack spacing={4}>
          <Stack spacing={4} direction={{ xs: "column", md: "row" }} justifyContent="space-between">
            <Stack spacing={2}>
              <Typography variant="h4" textAlign={{ xs: "center", md: "left" }} color="text.primary">
                {title}
              </Typography>

              <Typography textAlign={{ xs: "center", md: "left" }} color="text.secondary">
                {description}
              </Typography>
            </Stack>

            <Stack
              component="a"
              href="https://updev.africa/contact-us"
              target="_blank"
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              flexShrink={0}
              justifyContent="center"
              alignItems="center"
            >
              <Button variant="contained" disableElevation={true} color="primary" sx={{ px: 4, py: 1 }}>
                {button}
              </Button>
            </Stack>
          </Stack>
          <Divider />

          <Box>
            <Grid container spacing={{ xs: 2, md: 6 }}>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack spacing={2}>
                  <Stack sx={{ width: 180, height: 90, position: "relative" }}>
                    <Image src="/logo.png" layout="fill" objectFit="contain" />
                  </Stack>
                  <Typography color="text.secondary">{about}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={2.5}>
                <Stack>
                  <Typography variant="h6" color="text.primary" fontSize={14} component="span" sx={{ py: 2 }}>
                    NAVIGATIONS
                  </Typography>
                  {navigations.map((el) => (
                    <Stack
                      direction="row"
                      key={el?.path}
                      alignItems="center"
                      spacing={1}
                      sx={{
                        color: "text.secondary",
                        "&:hover": { color: "primary.main" },
                        py: 0.5,
                      }}
                    >
                      <Link href={el?.path}>
                        <Typography component="a" gutterBottom>
                          {el.name}
                        </Typography>
                      </Link>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={2.5}>
                <Stack>
                  <Typography variant="h6" color="text.primary" fontSize={14} component="span" sx={{ py: 2 }}>
                    {locale == "fr" ? "RESSOURCES" : "RESOURCES"}
                  </Typography>
                  {menu?.map((el: any) => (
                    <Stack
                      direction="row"
                      key={el?.path}
                      alignItems="center"
                      spacing={1}
                      sx={{
                        color: matches(el?.path) ? "primary.main" : "text.secondary",
                        "&:hover": { color: "primary.main" },
                        py: 0.5,
                      }}
                    >
                      <Link href={el?.path} passHref>
                        <Typography component="a" gutterBottom>
                          {el.label}
                        </Typography>
                      </Link>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={2.5}>
                <Stack>
                  <Typography variant="h6" color="text.primary" fontSize={14} component="span" sx={{ py: 2 }}>
                    CONTACT
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "primary.main" },
                      py: 0.5,
                    }}
                  >
                    <a href="mailto:contact@uptodatedevelopers.com" target="_blank" rel="noreferrer noopener">
                      <Typography component="a" gutterBottom>
                        contact@uptodatedevelopers.com
                      </Typography>
                    </a>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Typography color="text.secondary" variant="caption" component="p" textAlign="center" sx={{ pt: 4 }}>
            &copy; Updev Community {new Date().getFullYear()}. All rights reserved. Designed by{" "}
            <Typography
              color="secondary.main"
              variant="caption"
              component="a"
              href="https://uptodatedevelopers.com"
              target="_blank"
            >
              Uptodate Developers.{" "}
            </Typography>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
