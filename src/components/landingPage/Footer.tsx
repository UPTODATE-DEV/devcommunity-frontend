import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

const navigations = [
  { name: "Home", path: "/" },
  { name: "Articles", path: "/articles" },
  { name: "Posts", path: "/posts" },
];

const ressources = [
  { name: "Updev", path: "/updev-commnunity" },
  { name: "Updev", path: "/updev-challenge" },
];

const terms = [
  { name: "Terms of Service", path: "/terms" },
  { name: "Privacy policy", path: "/policy" },
];

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "action.hover" }}>
      <Container sx={{ py: 4 }}>
        <Stack spacing={4}>
          <Stack spacing={4} direction={{ xs: "column", md: "row" }} justifyContent="space-between">
            <Stack spacing={2}>
              <Typography variant="h4" textAlign={{ xs: "center", md: "left" }} color="text.primary">
                Ready to get started?
              </Typography>

              <Typography textAlign={{ xs: "center", md: "left" }} color="text.secondary">
                Create your free account now
              </Typography>
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="center" alignItems="center">
              <Button variant="contained" disableElevation={true} color="primary" sx={{ px: 4, py: 1 }}>
                Get started
              </Button>
              <Button sx={{ px: 4, py: 1 }}>Try free</Button>
            </Stack>
          </Stack>
          <Divider />

          <Box>
            <Grid container spacing={{ xs: 2, md: 6 }}>
              <Grid item xs={12} sm={6} lg={4}>
                <Stack spacing={2}>
                  <Stack sx={{ width: 180, height: 90, position: "relative" }}>
                    <Image src="/logo.svg" layout="fill" objectFit="contain" />
                  </Stack>
                  <Typography color="text.secondary">
                    Bulkit is built for developers and designers. It is modular approach lets you create an original
                    landing page for your brand.
                  </Typography>
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
                      <a href={el?.path} target="_blank" rel="noreferrer noopener">
                        <Typography component="a" gutterBottom>
                          {el.name}
                        </Typography>
                      </a>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={2.5}>
                <Stack>
                  <Typography variant="h6" color="text.primary" fontSize={14} component="span" sx={{ py: 2 }}>
                    RESSOURCES
                  </Typography>
                  {ressources.map((el) => (
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
                      <a href={el?.path} target="_blank" rel="noreferrer noopener">
                        <Typography component="a" gutterBottom>
                          {el.name}
                        </Typography>
                      </a>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} lg={2.5}>
                <Stack>
                  <Typography variant="h6" color="text.primary" fontSize={14} component="span" sx={{ py: 2 }}>
                    TERMS
                  </Typography>
                  {terms.map((el) => (
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
                      <a href={el?.path} target="_blank" rel="noreferrer noopener">
                        <Typography component="a" gutterBottom>
                          {el.name}
                        </Typography>
                      </a>
                    </Stack>
                  ))}
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
