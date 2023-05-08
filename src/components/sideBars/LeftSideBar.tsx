import { useI18n } from "@/hooks/useI18n";
import useStore from "@/hooks/useStore";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Typography, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FcAbout, FcBookmark, FcHome, FcNook, FcPositiveDynamic, FcSettings, FcSms } from "react-icons/fc";

const ImageLogo = ({ size, url, alt }: { size: number; url: string; alt: string }) => (
  <Image src={url} alt={alt} width={size} height={size} />
);

const LeftSideBar = () => {
  const user = useStore((state) => state.session?.user);
  const { route, push, locale } = useRouter();
  const matches = (path: string): boolean => `/${route.split("/")[1]}` === path;
  const [menu, setMenu] = useState<any[]>([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  const switchLanguages = useI18n<"fr" | "en">();

  const toggleLang = () => {
    switchLanguages(locale === "fr" ? "en" : "fr");
  };

  const main = [
    { path: "/", icon: <FcHome fontSize={28} />, label: locale === "fr" ? "Accueil" : "Home" },
    { path: "/articles", icon: <FcNook fontSize={28} />, label: "Articles" },
    { path: "/posts", icon: <FcSms fontSize={28} />, label: "Posts" },
    { path: "/tags", icon: <ImageLogo url="/icons/tags.png" alt="Tag Icon" size={28} />, label: "Tags" },
    { path: "/top-posts", icon: <FcPositiveDynamic fontSize={28} />, label: "Top posts" },
  ];

  const blockchain = [
    {
      path: "/cardano",
      icon: <ImageLogo url="/icons/cardano.png" alt="Cardano Logo" size={28} />,
      label: "Cardano",
    },
    {
      path: "/web3",
      icon: <ImageLogo url="/icons/web3.png" alt="Web3 Logo" size={28} />,
      label: "Web3",
    },
    {
      path: "/blockchain",
      icon: <ImageLogo url="/icons/blockchain.png" alt="Blockchain Logo" size={28} />,
      label: "Blockchain",
    },
  ];

  const params = [
    { path: "/bookmarks", icon: <FcBookmark fontSize={28} />, label: locale === "fr" ? "Favoris" : "Bookmarks" },
    { path: "/profile", icon: <FcSettings fontSize={28} />, label: locale === "en" ? "My account" : "Mon compte" },
  ];

  const others = [
    {
      path: "/home",
      icon: <FcAbout fontSize={28} />,
      label: locale === "fr" ? "A propos" : "About",
    },
  ];

  useEffect(() => {
    const getMenu = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_ADMIN_URL}/home?populate=deep&locale=${locale}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setMenu(res?.data?.data?.footer);
      } catch (e: any) {
        return console.log(e);
      }
    };
    getMenu();
  }, []);

  return (
    <Stack spacing={4} direction="column" sx={{ width: 1 }}>
      <Paper variant="outlined" sx={{ position: "relative", width: 1 }}>
        {isMobile && (
          <List sx={{ width: 1 }}>
            {main.map(({ path, icon, label }) => (
              <ListItemButton
                key={path}
                onClick={() => push(path)}
                sx={{
                  position: "relative",
                  "&:after": {
                    position: "absolute",
                    content: "''",
                    width: 5,
                    height: 1,
                    bottom: 0,
                    left: 0,
                    borderRadius: 9,
                    backgroundColor: matches(path) ? "primary.main" : "transparent",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              >
                <ListItemIcon sx={{ mr: -1, color: matches(path) ? "primary.main" : "text.primary" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    color: matches(path) ? "primary.main" : "text.primary",
                    fontWeight: matches(path) ? 700 : 400,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        )}

        <React.Fragment>
          <Divider />
          <List>
            {blockchain.map(({ path, icon, label }) => (
              <ListItemButton key={path} selected={matches(path)} onClick={() => push(path)}>
                <ListItemIcon sx={{ mr: -1, color: matches(path) ? "primary.main" : "text.primary" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    color: matches(path) ? "primary.main" : "text.primary",
                    fontWeight: matches(path) ? 700 : 400,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </React.Fragment>

        {user && (
          <React.Fragment>
            <Divider />
            <List>
              {params.map(({ path, icon, label }) => (
                <ListItemButton key={path} selected={matches(path)} onClick={() => push(path)}>
                  <ListItemIcon sx={{ mr: -1, color: matches(path) ? "primary.main" : "text.primary" }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      color: matches(path) ? "primary.main" : "text.primary",
                      fontWeight: matches(path) ? 700 : 400,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </React.Fragment>
        )}

        <React.Fragment>
          <Divider />
          <List>
            {others.map(({ path, icon, label }) => (
              <ListItemButton key={path} selected={matches(path)} onClick={() => push(path)}>
                <ListItemIcon sx={{ mr: -1, color: matches(path) ? "primary.main" : "text.primary" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    color: matches(path) ? "primary.main" : "text.primary",
                    fontWeight: matches(path) ? 700 : 400,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </React.Fragment>

        <Button
          sx={{ display: { xs: "block", md: "none" }, position: "absolute", top: 12, right: 8 }}
          variant="outlined"
          onClick={toggleLang}
        >
          {locale === "en" ? "French" : "Anglais"}
        </Button>
      </Paper>

      <Stack spacing={2} sx={{ px: 2 }}>
        {menu?.map((el: any) => (
          <Stack
            direction="row"
            key={el?.path}
            alignItems="center"
            spacing={1}
            sx={{
              color: matches(el?.path) ? "primary.main" : "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            <KeyboardDoubleArrowRightIcon fontSize="small" />
            <Link href={el?.path} passHref>
              <Typography component="a" variant="body2" gutterBottom>
                {el.label}
              </Typography>
            </Link>
          </Stack>
        ))}
      </Stack>
      <Divider />

      <Typography variant="body2" sx={{ color: "text.secondary", pb: 2, px: 2 }}>
        v{"1.0.0"} - First Release
      </Typography>
    </Stack>
  );
};

export default React.memo(LeftSideBar);
