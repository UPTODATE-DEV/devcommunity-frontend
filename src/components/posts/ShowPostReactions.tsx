import UserAvatar from "@/components/common/UserAvatar";
import { useGoToUserProfile } from "@/hooks";
import { getUserFullName, getUserProfileImageUrl } from "@/lib";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LightbulbSharpIcon from "@mui/icons-material/LightbulbSharp";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

const ShowPostReactions = ({ reactions }: { reactions: ArticleReaction[] }) => {
  const [tab, setTab] = React.useState<ArticleReactionType>("LIKE");

  const tabs: { id: ArticleReactionType; icon: any; label: string }[] = [
    {
      id: "LIKE",
      icon: <ThumbUpSharpIcon color="primary" />,
      label: "Likes",
    },
    {
      id: "LOVE",
      icon: <FavoriteSharpIcon color="error" />,
      label: "Loves",
    },
    {
      id: "USEFUL",
      icon: <LightbulbSharpIcon color="warning" />,
      label: "Use full",
    },
  ];

  const goToProfile = useGoToUserProfile();

  const handleTabChange = (event: React.SyntheticEvent, newValue: ArticleReactionType) => {
    setTab(newValue);
  };

  return (
    <TabContext value={tab}>
      <TabList
        onChange={handleTabChange}
        variant={useMediaQuery("(min-width:600px)") ? "fullWidth" : "scrollable"}
        aria-label="Show reactions"
        sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "action.hover" }}
      >
        {tabs.map((item, i) => (
          <Tab
            icon={item.icon}
            key={item.id}
            iconPosition="start"
            sx={{ width: { xs: "auto", md: 700 } }}
            label={
              <Typography>{`${reactions?.filter((reaction) => reaction.type === item.id).length} ${
                item.label
              }`}</Typography>
            }
            value={item.id}
          />
        ))}
      </TabList>

      {tabs.map((tab) => (
        <TabPanel key={tab.id} sx={{ p: 0, height: 400 }} value={tab.id}>
          <List>
            {reactions
              ?.filter((reaction) => reaction.type === tab.id)
              .map((el, i) => (
                <React.Fragment key={i}>
                  <ListItemButton>
                    <ListItemAvatar>
                      <UserAvatar
                        name={getUserFullName(el.user)}
                        pictureUrl={getUserProfileImageUrl(el.user)}
                        handleClick={() => goToProfile(el.user.email)}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                            {getUserFullName(el.user)}
                          </Typography>
                        </React.Fragment>
                      }
                      primaryTypographyProps={{
                        fontWeight: 700,
                        color: "text.primary",
                      }}
                    />
                  </ListItemButton>
                  {i !== reactions?.filter((reaction) => reaction.type === tab.id).length - 1 && (
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
