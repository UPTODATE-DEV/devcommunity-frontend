import { TabList } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";

const ViewsMonthsChart = dynamic(import("@/components/profile/ViewsMonthsChart"), { ssr: false });
const ViewsDaysChart = dynamic(import("@/components/profile/ViewsDaysChart"), { ssr: false });
const ViewsWeekChart = dynamic(import("@/components/profile/ViewsWeekChart"), { ssr: false });
const ViewsDateChart = dynamic(import("@/components/profile/ViewsDateChart"), { ssr: false });

const Dashboard = () => {
  const [value, setValue] = React.useState("0");
  const { locale } = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList
        sx={{
          "& .MuiTabs-indicator": {
            mb: 0.5,
          },
        }}
        onChange={handleTabChange}
        scrollButtons
        allowScrollButtonsMobile
      >
        <Tab
          value="0"
          label={
            <Typography variant="caption" textTransform="capitalize">
              {locale === "en" ? "This week" : "Cette semaine"}
            </Typography>
          }
        />
        <Tab
          value="1"
          label={
            <Typography variant="caption" textTransform="capitalize">
              {locale === "en" ? "This month" : "Ce mois-ci"}
            </Typography>
          }
        />
        <Tab
          value="2"
          label={
            <Typography variant="caption" textTransform="capitalize">
              {locale === "en" ? "This year" : "Cette année"}
            </Typography>
          }
        />
        <Tab
          value="3"
          label={
            <Typography variant="caption" textTransform="capitalize">
              {locale === "en" ? "By date" : "Par date"}
            </Typography>
          }
        />
      </TabList>
      <TabPanel sx={{ p: 0 }} value={"0"}>
        <ViewsWeekChart />
      </TabPanel>
      <TabPanel sx={{ p: 0 }} value={"1"}>
        <ViewsDaysChart />
      </TabPanel>
      <TabPanel sx={{ p: 0 }} value={"2"}>
        <ViewsMonthsChart />
      </TabPanel>
      <TabPanel sx={{ p: 0 }} value={"3"}>
        <ViewsDateChart />
      </TabPanel>
    </TabContext>
  );
};

export default Dashboard;
