import { useI18n } from "@/hooks/useI18n";
import useStore from "@/hooks/useStore";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import BusinessIcon from "@mui/icons-material/Business";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ManageAccounts from "@mui/icons-material/ManageAccountsSharp";
import QuestionAnswer from "@mui/icons-material/QuestionAnswerSharp";
import TagSharpIcon from "@mui/icons-material/TagSharp";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import React from "react";

import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import HistoryEduTwoToneIcon from "@mui/icons-material/HistoryEduTwoTone";
import QuestionAnswerTwoToneIcon from "@mui/icons-material/QuestionAnswerTwoTone";
import TagTwoToneIcon from "@mui/icons-material/TagTwoTone";
import CurrencyBitcoinTwoToneIcon from "@mui/icons-material/CurrencyBitcoinTwoTone";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import ConnectWithoutContactTwoToneIcon from "@mui/icons-material/ConnectWithoutContactTwoTone";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import { Paper } from "@mui/material";
import {
  FcHome,
  FcNook,
  FcSms,
  FcMindMap,
  FcPositiveDynamic,
  FcAddressBook,
  FcBookmark,
  FcSettings,
  FcAbout,
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
      label: locale === "fr" ? "A propos de nous" : "About Us",
    },
  ];

  const params = [
    { path: "/bookmarks", icon: <FcBookmark fontSize={28} />, label: locale === "fr" ? "Favoris" : "Bookmarks" },
    // { path: "/settings", icon: <SettingsSharpIcon />, label: "Settings" },
    { path: "/profile", icon: <FcSettings fontSize={28} />, label: locale === "en" ? "My account" : "Mon compte" },
  ];

  return (
    <Paper variant="outlined" sx={{ position: "relative", width: 1 }}>
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
