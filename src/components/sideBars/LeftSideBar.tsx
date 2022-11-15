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

const LeftSideBar = () => {
  const user = useStore((state) => state.session?.user);
  const { route, push } = useRouter();
  const matches = (path: string): boolean => `/${route.split("/")[1]}` === path;

  const main = [
    { path: "/", icon: <HomeSharpIcon />, label: "Main feed" },
    { path: "/articles", icon: <HistoryEduIcon />, label: "Articles" },
    { path: "/posts", icon: <QuestionAnswer />, label: "Posts" },
    { path: "/tags", icon: <TagSharpIcon />, label: "Tags" },
    { path: "/cardano", icon: <BlurOnIcon />, label: "Cardano" },
    { path: "/top-posts", icon: <AutoAwesomeIcon />, label: "Top posts" },
    { path: "/home", icon: <BusinessIcon />, label: "About Us" },
  ];

  const params = [
    { path: "/bookmarks", icon: <BookmarkSharpIcon />, label: "Bookmarks" },
    // { path: "/settings", icon: <SettingsSharpIcon />, label: "Settings" },
    { path: "/profile", icon: <ManageAccounts />, label: "My account" },
  ];

  return (
    <>
      <List>
        {main.map(({ path, icon, label }) => (
          <ListItemButton key={path} selected={matches(path)} onClick={() => push(path)}>
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
    </>
  );
};

export default LeftSideBar;
