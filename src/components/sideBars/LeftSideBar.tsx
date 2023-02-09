import { useI18n } from "@/hooks/useI18n";
import useStore from "@/hooks/useStore";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import React from "react";
import {
  FcAbout,
  FcAddressBook,
  FcBookmark,
  FcHome,
  FcMindMap,
  FcNook,
  FcPositiveDynamic,
  FcSettings,
  FcSms,
} from "react-icons/fc";

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
    { path: "/tags", icon: <FcAddressBook fontSize={28} />, label: "Tags" },
    { path: "/blockchain", icon: <FcMindMap fontSize={28} />, label: "Blockchain" },
    { path: "/top-posts", icon: <FcPositiveDynamic fontSize={28} />, label: "Top posts" },
    {
      path: "/home",
      icon: <FcAbout fontSize={28} />,
      label: locale === "fr" ? "A propos" : "About",
    },
  ];

  const params = [
    { path: "/bookmarks", icon: <FcBookmark fontSize={28} />, label: locale === "fr" ? "Favoris" : "Bookmarks" },
    // { path: "/settings", icon: <SettingsSharpIcon />, label: "Settings" },
    { path: "/profile", icon: <FcSettings fontSize={28} />, label: locale === "en" ? "My account" : "Mon compte" },
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
      <Button sx={{ display: { xs: "block", md: "none" }, ml: 1 }} variant="outlined" onClick={toggleLang}>
        {locale === "en" ? "French" : "Anglais"}
      </Button>
    </Paper>
  );
};

export default React.memo(LeftSideBar);
