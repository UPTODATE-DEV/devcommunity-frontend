import CampaignIcon from "@mui/icons-material/Campaign";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PaymentsIcon from "@mui/icons-material/Payments";
import SettingsIcon from "@mui/icons-material/Settings";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import QuestionAnswer from "@mui/icons-material/QuestionAnswerSharp";
import TagSharpIcon from "@mui/icons-material/TagSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ManageAccounts from "@mui/icons-material/ManageAccountsSharp";
import BookmarkSharpIcon from "@mui/icons-material/BookmarkSharp";
import Face5SharpIcon from "@mui/icons-material/Face5Sharp";
import StarsSharpIcon from "@mui/icons-material/StarsSharp";
import LiveHelpSharpIcon from "@mui/icons-material/LiveHelpSharp";
import InsertEmoticonSharpIcon from "@mui/icons-material/InsertEmoticonSharp";

const LeftSideBar = () => {
  const main = [
    { path: "/s", icon: <HomeSharpIcon />, label: "Home" },
    { path: "/", icon: <HistoryEduIcon />, label: "Posts" },
    { path: "/questions", icon: <QuestionAnswer />, label: "Questions" },
    { path: "/tags", icon: <TagSharpIcon />, label: "Tags" },
  ];

  const top = [
    { path: "/top-user", icon: <InsertEmoticonSharpIcon />, label: "Top users" },
    { path: "/bookmark", icon: <BookmarkSharpIcon />, label: "My bookmarks" },
  ];

  const params = [
    { path: "/settings", icon: <SettingsSharpIcon />, label: "Settings" },
    { path: "/account", icon: <ManageAccounts />, label: "My account" },
  ];

  return (
    <>
      <List>
        {main.map(({ path, icon, label }) => (
          <ListItemButton key={path} selected={path === "/"} onClick={() => console.log("Click")}>
            <ListItemIcon sx={{ mr: -1, color: path === "/" ? "primary.main" : "text.primary" }}>{icon}</ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                color: path === "/" ? "primary.main" : "text.primary",
                fontWeight: path === "/" ? 700 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        {top.map(({ path, icon, label }) => (
          <ListItemButton key={path} selected={path === "/"} onClick={() => console.log("Click")}>
            <ListItemIcon sx={{ mr: -1, color: path === "/" ? "primary.main" : "text.primary" }}>{icon}</ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                color: path === "/" ? "primary.main" : "text.primary",
                fontWeight: path === "/" ? 700 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        {params.map(({ path, icon, label }) => (
          <ListItemButton key={path} selected={path === "/"} onClick={() => console.log("Click")}>
            <ListItemIcon sx={{ mr: -1, color: path === "/" ? "primary.main" : "text.primary" }}>{icon}</ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                color: path === "/" ? "primary.main" : "text.primary",
                fontWeight: path === "/" ? 700 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default LeftSideBar;
