import ClassIcon from "@mui/icons-material/Class";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, Stack, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import React from "react";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import QuestionAnswer from "@mui/icons-material/QuestionAnswerSharp";
import TagSharpIcon from "@mui/icons-material/TagSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import ManageAccounts from "@mui/icons-material/ManageAccountsSharp";
import Divider from "@mui/material/Divider";
import PostCard from "@/components/posts/PostCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const MainContent = () => {
  const [tab, setTab] = React.useState("0");

  const tabs = [
    {
      id: 0,
      label: "Posts",
      icon: <HistoryEduIcon />,
    },
    {
      id: 1,
      label: "Questions",
      icon: <QuestionAnswer />,
    },
    {
      id: 2,
      label: "Tags",
      icon: <TagSharpIcon />,
    },
  ];

  const posts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <TabContext value={tab}>
      <TabList
        onChange={handleTabChange}
        variant="fullWidth"
        aria-label="lab API tabs example"
        sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "action.hover" }}
      >
        {tabs.map((item, i) => (
          <Tab
            icon={item.icon}
            key={item.id}
            iconPosition="start"
            sx={{ minHeight: 50 }}
            label={<Typography>{item.label}</Typography>}
            value={i.toString()}
          />
        ))}
      </TabList>
      {tabs.map((fac, i) => (
        <TabPanel sx={{ p: 0 }} value={i.toString()} key={i}>
          <Stack spacing={5}>
            {posts.map((item) => (
              <React.Fragment key={item.id}>
                <PostCard />
                {posts.length !== item.id && <Divider />}
              </React.Fragment>
            ))}
          </Stack>
          <Stack sx={{ display: "flex", width: 1, my: 6 }} alignItems="center">
            <CircularProgress />
          </Stack>
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default MainContent;
