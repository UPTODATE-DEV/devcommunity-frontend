import { useI18n } from "@/hooks/useI18n";
import useStore from "@/hooks/useStore";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FcAbout, FcBookmark, FcHome, FcNook, FcPositiveDynamic, FcSettings, FcSms } from "react-icons/fc";

const ImageLogo = ({ size, url, alt }: { size: number; url: string; alt: string }) => (
  <Image src={url} alt={alt} width={size} height={size} />
);

const LeftSideBar = () => {
  const user = useStore((state) => state.session?.user);
  const { route, push, locale } = useRouter();
  const matches = (path: string): boolean => `/${route.split("/")[1]}` === path;

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

  return (
    <Paper variant="outlined" sx={{ position: "relative", width: 1, height: { xs: "100vh", md: "auto" } }}>
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
            <ListItemIcon sx={{ mr: -1, color: matches(path) ? "primary.main" : "text.primary" }}>{icon}</ListItemIcon>
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
        <Button sx={{ display: { xs: "block", md: "none" }, ml: 1 }} variant="outlined" onClick={toggleLang}>
          {locale === "en" ? "French" : "Anglais"}
        </Button>
        <Typography variant="caption" sx={{ color: "text.secondary", px: 3 }}>
          v{"1.34.5"} - First Release
        </Typography>
      </React.Fragment>
    </Paper>
  );
};

export default React.memo(LeftSideBar);
