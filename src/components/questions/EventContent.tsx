import EventIcon from "@mui/icons-material/Event";
import PinDropIcon from "@mui/icons-material/PinDrop";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

import dayjs from "dayjs";
import "dayjs/locale/fr";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useRouter } from "next/router";
dayjs.extend(isSameOrBefore);

const EventContent: React.FC<{ data: Event }> = ({ data }) => {
  const { locale } = useRouter();
  const isExpired = dayjs(new Date(data.date)).isSameOrBefore(dayjs());

  const buttonLabel = () => {
    if (isExpired) {
      return locale == "fr" ? "Expiré" : "Expired";
    }
    return locale === "fr" ? "Je participe" : "I participate";
  };

  return (
    <Paper variant="outlined" spacing={2} sx={{ p: 2 }} component={Stack}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 5 }}
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <PinDropIcon color="secondary" fontSize="small" />
            <Typography> {data?.location} </Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <EventIcon color="secondary" fontSize="small" />
            <Typography> {dayjs(data?.date).format("DD MMM YYYY")} </Typography>
          </Stack>
        </Stack>
        {data?.link && (
          <a href={isExpired ? "#" : data.link} target="_blank" rel="noopener noreferrer">
            <Button variant="contained" disableElevation color={isExpired ? "error" : "primary"}>
              {buttonLabel()}
            </Button>
          </a>
        )}
      </Stack>
    </Paper>
  );
};

export default EventContent;
