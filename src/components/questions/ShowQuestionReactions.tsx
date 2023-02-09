import UserAvatar from "@/components/common/UserAvatar";
import { useGoToUserProfile } from "@/hooks";
import { getUserFullName, getUserProfileImageUrl } from "@/lib";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import React from "react";

const ShowQuestionReactions = ({ reactions }: { reactions?: QuestionsReaction[] }) => {
  const [tab, setTab] = React.useState<QuestionReactionType>("LIKE");
  const { locale } = useRouter();

  const tabs: { id: QuestionReactionType; icon: any; label: string }[] = [
    {
      id: "LIKE",
      label: locale === "en" ? "Endorse" : "Approuver",
      icon: <ThumbUpSharpIcon />,
    },
    {
      id: "DISLIKE",
      label: locale === "en" ? "Disapprove" : "Désapprouver",
      icon: <ThumbDownOffAltIcon />,
    },
  ];

  const goToProfile = useGoToUserProfile();

  const handleTabChange = (event: React.SyntheticEvent, newValue: QuestionReactionType) => {
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
            sx={{ width: { xs: "auto", md: 400 } }}
            label={
              <Typography textTransform="capitalize">{`${
                reactions?.filter((reaction) => reaction.type === item.id).length
              } ${item.label}`}</Typography>
            }
            value={item.id}
          />
        ))}
      </TabList>

      {tabs.map((tab) => (
        <TabPanel key={tab.id} sx={{ p: 0, height: 400 }} value={tab.id}>
          <Stack sx={{ height: 1, overflow: "auto" }}>
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
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
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
          </Stack>
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default ShowQuestionReactions;
