import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import { getRequest } from "../../../lib";

function Badges({ userId }: { userId?: string }) {
  const [badges, setBadges] = React.useState<Badge[] | []>([]);

  const fetchData = async () => {
    const userBadges = await getRequest({ endpoint: `/users/${userId}/badges` });
    setBadges(userBadges.data);
  };

  React.useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <TabPanel sx={{ p: 0 }} value={"badges"}>
      <Paper variant="outlined" sx={{ p: 2, minHeight: "200px" }}>
        <Grid container gap={2}>
          {badges?.map((el, i) => (
            <Grid key={el.name}>
              <Tooltip
                arrow
                title={
                  <React.Fragment>
                    <Typography fontWeight={700} textAlign="center" color="inherit">
                      {el.name}
                    </Typography>
                    <Typography color="inherit" textAlign="center">
                      {el.description}
                    </Typography>
                  </React.Fragment>
                }
              >
                <Paper sx={{ p: 2, borderRadius: 50, position: "relative" }} variant="outlined">
                  <Stack sx={{ width: 60, height: 60, position: "relative" }}>
                    <Image
                      src={`/images/badges/${el.icon}.png`}
                      style={{ filter: el.completed ? "none" : "grayscale(100%)" }}
                      alt={el.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </Stack>
                </Paper>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </TabPanel>
  );
}

export default Badges;
