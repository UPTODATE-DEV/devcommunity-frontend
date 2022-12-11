import React from "react";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LightbulbSharpIcon from "@mui/icons-material/LightbulbSharp";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Avatar, Divider, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { FILES_BASE_URL } from "config/url";
import { useRouter } from "next/router";

const ShowPostReactions = ({ reactions }: { reactions: ArticleReaction[] }) => {
  const [tab, setTab] = React.useState<ArticleReactionType>("LIKE");

  const tabs: { id: ArticleReactionType; icon: any }[] = [
    {
      id: "LIKE",
      icon: <ThumbUpSharpIcon color="primary" />,
    },
    {
      id: "LOVE",
      icon: <FavoriteSharpIcon color="error" />,
    },
    {
      id: "USEFUL",
      icon: <LightbulbSharpIcon color="warning" />,
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: ArticleReactionType) => {
    setTab(newValue);
  };

  return (
    <TabContext value={tab}>
      <TabList
        onChange={handleTabChange}
        variant={useMediaQuery("(min-width:600px)") ? "fullWidth" : "scrollable"}
        aria-label="lab API tabs example"
        sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "action.hover" }}
      >
        {tabs.map((item, i) => (
          <Tab
            icon={item.icon}
            key={item.id}
            iconPosition="start"
            sx={{ minHeight: 50 }}
            label={<Typography>{reactions.filter((reaction) => reaction.type === item.id).length}</Typography>}
            value={item.id}
          />
        ))}
      </TabList>

      {tabs.map((tab) => (
        <TabPanel key={tab.id} sx={{ p: 0 }} value={tab.id}>
          <List>
            {reactions
              .filter((reaction) => reaction.type === tab.id)
              .map((el, i) => (
                <React.Fragment key={i}>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ bgcolor: "primary.main", color: "white" }}
                        src={FILES_BASE_URL + el?.user?.profile?.avatar?.url}
                        alt={`${el.user.firstName} ${el.user.lastName}`}
                      >
                        {el.user.firstName.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                            {`${el.user.firstName} ${el.user.lastName}`}
                          </Typography>
                        </React.Fragment>
                      }
                      primaryTypographyProps={{
                        fontWeight: 700,
                        color: "text.primary",
                      }}
                    />
                  </ListItemButton>
                  {i !== reactions.filter((reaction) => reaction.type === tab.id).length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
          </List>
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default ShowPostReactions;
